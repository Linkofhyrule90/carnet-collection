param(
  [switch]$All
)

$ErrorActionPreference = "Continue"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$MarketFile = Join-Path $Root "data\market-values.js"
$OutputFile = Join-Path $Root "data\pack-images.js"
$TempFile = Join-Path $Root "data\.pricecharting-pack-image.tmp.html"

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

function Normalize-MarketText {
  param([string]$Value)

  $Text = $Value.ToLowerInvariant()
  $Text = $Text -replace "&", " and "
  $Text = $Text -replace "['’]", ""
  $Text = $Text -replace "\bamiibo\b", " "
  $Text = $Text -replace "\bsuper smash bros\.?\b", "smash"
  $Text = $Text -replace "\bsuper mario bros\.?\b", "super mario"
  $Text = $Text -replace "[^a-z0-9]+", " "
  $Text = $Text -replace "\b(series|figure|figures|outfit)\b", " "
  $Text = $Text -replace "\s+", " "
  return $Text.Trim()
}

$KnownPackTitles = @(
  "Splatoon Deep Cut Set: Shiver, Frye, & Big Man",
  "Cat Mario and Cat Peach Double Pack",
  "Bowser Supercharged Combo Pack",
  "Donkey Kong Supercharged Combo Pack",
  "Zelda Breath of the Wild Champions Set",
  "Metroid Dread 2 Amiibo Pack",
  "Isabelle & Digby 2 Pack",
  "Retro 3 Pack",
  "Mii 3 Pack",
  "Animal Crossing 3 Pack",
  "Toon Link & Zelda 2 Pack",
  "Fire Emblem 2 Pack",
  "Splatoon 3 Pack",
  "Callie and Marie 2 Pack",
  "Metroid 2 Pack",
  "Mario Odyssey Wedding 3 Pack",
  "Steve & Alex 2-Pack",
  "Pyra & Mythra 2-Pack",
  "Pearl & Marina 2 Pack",
  "Splatoon 3 Pack [Alt Colors]",
  "Splatoon 3 Pack [Octoling]",
  "Noah and Mio",
  "Shovel Knight Treasure Trove 3 Pack",
  "Pearl And Marina Side Order 2-Pack",
  "Callie And Marie Alterna 2-Pack",
  "Super Smash Bros Series [3-Pack]"
) | ForEach-Object { Normalize-MarketText $_ }

function Test-PackTitle {
  param([string]$Title)

  $Key = Normalize-MarketText $Title
  return $KnownPackTitles -contains $Key `
    -or $Key -match "\b[234]\s*pack\b" `
    -or $Key -match "\b(double|combo)\s+pack\b" `
    -or $Key -match "\bset\b"
}

function Save-PackImages {
  param($MarketData, $Rows)

  $Payload = [ordered]@{
    source = "PriceCharting product main images"
    sourceUrl = $MarketData.sourceUrl
    fetchedAt = (Get-Date).ToString("o")
    note = "Main image URLs for inventory pack cards. Images remain hosted by PriceCharting/Google Cloud."
    items = $Rows
  }

  $Json = $Payload | ConvertTo-Json -Depth 8
  Set-Content -Path $OutputFile -Value "window.AMIIBO_PACK_IMAGES = $Json;" -Encoding UTF8
}

$MarketData = Read-JsAssignmentJson -Path $MarketFile -VariableName "AMIIBO_MARKET_VALUES"
$PackRows = @($MarketData.items | Where-Object { Test-PackTitle $_.title })
$ImageRows = @()

foreach ($Pack in $PackRows) {
  Write-Host "Image pack: $($Pack.title)"
  $ImageUrl = $null
  $Status = "ok"

  try {
    & curl.exe -L -s --connect-timeout 15 --max-time 45 -o $TempFile $Pack.url

    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $TempFile)) {
      $Status = "fetch_failed"
    } else {
      $Html = Get-Content -Raw -Encoding UTF8 $TempFile
      $CoverMatch = [regex]::Match(
        $Html,
        "<div class=`"cover`">.*?<img\s+src=['`"](?<url>[^'`"]+)['`"]",
        [Text.RegularExpressions.RegexOptions]::Singleline -bor [Text.RegularExpressions.RegexOptions]::IgnoreCase
      )

      if ($CoverMatch.Success) {
        $ImageUrl = [System.Net.WebUtility]::HtmlDecode($CoverMatch.Groups["url"].Value)
      } else {
        $ImageMatch = [regex]::Match(
          $Html,
          "https://storage\.googleapis\.com/images\.pricecharting\.com/[^'`"\s>]+/240\.jpg",
          [Text.RegularExpressions.RegexOptions]::IgnoreCase
        )

        if ($ImageMatch.Success) {
          $ImageUrl = [System.Net.WebUtility]::HtmlDecode($ImageMatch.Value)
        } else {
          $Status = "no_image"
        }
      }
    }
  } catch {
    $Status = "parse_failed"
  } finally {
    if (Test-Path $TempFile) {
      Remove-Item -LiteralPath $TempFile -Force
    }
  }

  $ImageRows += [ordered]@{
    id = [string]$Pack.id
    title = [string]$Pack.title
    productUrl = [string]$Pack.url
    image = $ImageUrl
    status = $Status
  }

  Save-PackImages -MarketData $MarketData -Rows $ImageRows
}

Save-PackImages -MarketData $MarketData -Rows $ImageRows
Write-Host "Images de packs enregistrees: $($ImageRows.Count)/$($PackRows.Count)."
