param(
  [int]$BatchSize = 60,
  [switch]$All,
  [switch]$RetryNoChart
)

$ErrorActionPreference = "Continue"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$MarketFile = Join-Path $Root "data\market-values.js"
$OutputFile = Join-Path $Root "data\market-history-highs.js"

function Read-JsAssignmentJson {
  param(
    [string]$Path,
    [string]$VariableName
  )

  $Text = Get-Content -Raw -Encoding UTF8 $Path
  $Pattern = "^\s*window\.$([regex]::Escape($VariableName))\s*=\s*"
  $Json = [regex]::Replace($Text, $Pattern, "")
  $Json = [regex]::Replace($Json, ";\s*$", "")
  return $Json | ConvertFrom-Json
}

function Get-SeriesHigh {
  param($Series)

  if ($null -eq $Series) {
    return $null
  }

  $BestCents = $null
  $BestDate = $null

  foreach ($Point in $Series) {
    if ($null -eq $Point -or $Point.Count -lt 2) {
      continue
    }

    $Timestamp = [int64]$Point[0]
    $Cents = [double]$Point[1]

    if ($Cents -le 0) {
      continue
    }

    if ($null -eq $BestCents -or $Cents -gt $BestCents) {
      $BestCents = $Cents
      $BestDate = [DateTimeOffset]::FromUnixTimeMilliseconds($Timestamp).UtcDateTime.ToString("yyyy-MM-dd")
    }
  }

  if ($null -eq $BestCents) {
    return $null
  }

  return [ordered]@{
    usd = [math]::Round($BestCents / 100, 2)
    date = $BestDate
  }
}

function Save-History {
  param(
    $MarketData,
    $HistoryMap
  )

  $OrderedItems = @()

  foreach ($Item in $MarketData.items) {
    if ($HistoryMap.ContainsKey([string]$Item.id)) {
      $OrderedItems += $HistoryMap[[string]$Item.id]
    }
  }

  $Payload = [ordered]@{
    source = "PriceCharting product chart data"
    sourceUrl = $MarketData.sourceUrl
    fetchedAt = (Get-Date).ToString("o")
    currency = "USD"
    note = "Highest loose and new values extracted from public PriceCharting chart data. Amounts are USD before app conversion to CAD."
    items = $OrderedItems
  }

  $Json = $Payload | ConvertTo-Json -Depth 12
  $Content = "window.AMIIBO_MARKET_HISTORY_HIGHS = $Json;"
  Set-Content -Path $OutputFile -Value $Content -Encoding UTF8
}

$MarketData = Read-JsAssignmentJson -Path $MarketFile -VariableName "AMIIBO_MARKET_VALUES"
$HistoryMap = @{}

if (Test-Path $OutputFile) {
  try {
    $Existing = Read-JsAssignmentJson -Path $OutputFile -VariableName "AMIIBO_MARKET_HISTORY_HIGHS"
    foreach ($Item in $Existing.items) {
      $HistoryMap[[string]$Item.id] = $Item
    }
  } catch {
    Write-Host "Impossible de lire l'historique existant, regeneration depuis le debut."
  }
}

$Missing = @()
foreach ($Item in $MarketData.items) {
  $Key = [string]$Item.id
  $ShouldRetry = $false

  if ($RetryNoChart -and $HistoryMap.ContainsKey($Key)) {
    $Existing = $HistoryMap[$Key]
    $ShouldRetry = [string]$Existing.status -eq "no_chart"
  }

  if (-not $HistoryMap.ContainsKey($Key) -or $ShouldRetry) {
    $Missing += $Item
  }
}

if (-not $All -and $Missing.Count -gt $BatchSize) {
  $Missing = $Missing | Select-Object -First $BatchSize
}

$Processed = 0
foreach ($Item in $Missing) {
  $Processed += 1
  Write-Host "[$Processed/$($Missing.Count)] $($Item.title)"

  $Record = [ordered]@{
    id = [string]$Item.id
    title = [string]$Item.title
    url = [string]$Item.url
    loose = $null
    new = $null
    fetchedAt = (Get-Date).ToString("o")
    status = "ok"
  }

  try {
    $TempFile = Join-Path $Root "data\.pricecharting-page.tmp.html"
    & curl.exe -L -s --connect-timeout 15 --max-time 45 -o $TempFile $Item.url

    if (Test-Path $TempFile) {
      $Html = Get-Content -Raw -Encoding UTF8 $TempFile
      Remove-Item -LiteralPath $TempFile -Force
    } else {
      $Html = ""
    }

    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($Html)) {
      $Record.status = "fetch_failed"
    } else {
      $Match = [regex]::Match($Html, "VGPC\.chart_data\s*=\s*(\{.*?\});", [Text.RegularExpressions.RegexOptions]::Singleline)

      if (-not $Match.Success) {
        $Record.status = "no_chart"
      } else {
        $Chart = $Match.Groups[1].Value | ConvertFrom-Json
        $Record.loose = Get-SeriesHigh -Series $Chart.used
        $Record.new = Get-SeriesHigh -Series $Chart.new
      }
    }
  } catch {
    $Record.status = "parse_failed"
  }

  $HistoryMap[[string]$Item.id] = $Record
  Save-History -MarketData $MarketData -HistoryMap $HistoryMap
}

Save-History -MarketData $MarketData -HistoryMap $HistoryMap
Write-Host "Historique enregistre: $($HistoryMap.Count)/$($MarketData.items.Count) produits."
