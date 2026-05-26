const AMIIBO_DATABASE_URL =
  "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/database/amiibo.json";
const AMIIBO_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images";
const STORAGE_KEY = "amiibo-inventory-v1";
const PENDING_STORAGE_KEY = "amiibo-pending-v1";
const LAST_UPDATE_KEY = "amiibo-live-last-update-v1";
const GAME_PROGRESS_STORAGE_KEY = "game-guide-progress-v1";
const INCLUDED_TYPES = new Set(["Figure"]);
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='18' fill='%23111514'/%3E%3Ccircle cx='120' cy='92' r='38' fill='%23313a35'/%3E%3Cpath d='M58 190c14-34 37-51 62-51s48 17 62 51' fill='%23313a35'/%3E%3C/svg%3E";
const GAME_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 560'%3E%3Crect width='420' height='560' rx='20' fill='%23111514'/%3E%3Crect x='46' y='56' width='328' height='448' rx='16' fill='%23181f1b' stroke='%233f8f46' stroke-width='6'/%3E%3Ccircle cx='210' cy='226' r='74' fill='%232f6f38'/%3E%3Cpath d='M144 332h132M160 372h100' stroke='%23d2a85d' stroke-width='18' stroke-linecap='round'/%3E%3C/svg%3E";
const BOTW_MAP_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/0/0a/BoTW_HyruleMap.jpg";
const TOTK_MAP_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Tears_of_the_Kingdom_logo.png/960px-Tears_of_the_Kingdom_logo.png";
const GUIDE_GAMES = [
  {
    id: "breath-of-the-wild",
    title: "The Legend of Zelda: Breath of the Wild",
    subtitle: "Nintendo Switch / Wii U",
    description:
      "Cartes utiles pour compléter Hyrule: noix Korogu et sanctuaires.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/The_Legend_of_Zelda_Breath_of_the_Wild.svg/960px-The_Legend_of_Zelda_Breath_of_the_Wild.svg.png",
    source:
      "Image: logo Wikimedia Commons. Carte de fond: BoTW HyruleMap par PatoAnidae02, CC BY-SA 4.0.",
    primaryUrl: "https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/",
    resources: [
      {
        id: "korok-seeds",
        title: "Noix Korogu",
        count: "900 emplacements",
        label: "Carte de collection",
        description:
          "Carte interactive et guide par région pour repérer les noix Korogu de Breath of the Wild.",
        image: BOTW_MAP_IMAGE,
        primaryUrl: "https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/",
        secondaryUrl: "https://game8.co/games/Zelda-Breath-of-the-Wild/archives/306047",
        primaryLabel: "Carte interactive",
        secondaryLabel: "Guide Game8",
      },
      {
        id: "shrines",
        title: "Sanctuaires et temples",
        count: "120 + 16 DLC",
        label: "Carte d'exploration",
        description:
          "Cartes et listes de sanctuaires pour trouver les temples, les épreuves et les sanctuaires DLC.",
        image: BOTW_MAP_IMAGE,
        primaryUrl: "https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/",
        secondaryUrl: "https://game8.co/games/Zelda-Breath-of-the-Wild/archives/292475",
        primaryLabel: "Carte interactive",
        secondaryLabel: "Liste Game8",
      },
    ],
  },
  {
    id: "tears-of-the-kingdom",
    title: "The Legend of Zelda: Tears of the Kingdom",
    subtitle: "Nintendo Switch",
    description:
      "Cartes utiles pour explorer Hyrule, les Cieux et les Profondeurs: noix Korogu, sanctuaires, Lightroots et tours.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/2/21/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg",
    source:
      "Ressources: Zelda Dungeon Interactive Map, Game8, MapGenie, Fextralife Wiki.",
    primaryUrl: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
    resources: [
      {
        id: "totk-korok-seeds",
        title: "Noix Korogu",
        count: "1000 emplacements",
        label: "Carte de collection",
        description:
          "Carte interactive pour repérer les 1000 noix Korogu dispersées à travers Hyrule et les îles célestes.",
        image: TOTK_MAP_IMAGE,
        primaryUrl: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
        secondaryUrl: "https://mapgenie.io/zelda-tears-of-the-kingdom",
        primaryLabel: "Carte interactive",
        secondaryLabel: "MapGenie",
      },
      {
        id: "totk-shrines",
        title: "Sanctuaires",
        count: "152 sanctuaires",
        label: "Carte d'exploration",
        description:
          "Tous les sanctuaires de la surface et des îles célestes. Complète-les pour obtenir des orbes de lumière.",
        image: TOTK_MAP_IMAGE,
        primaryUrl: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
        secondaryUrl: "https://game8.co/games/Zelda-Tears-of-the-Kingdom/archives/393065",
        primaryLabel: "Carte interactive",
        secondaryLabel: "Guide Game8",
      },
      {
        id: "totk-lightroots",
        title: "Lightroots — Profondeurs",
        count: "120 Lightroots",
        label: "Carte des Profondeurs",
        description:
          "Les Lightroots illuminent les Profondeurs et correspondent aux sanctuaires de la surface. Carte essentielle pour explorer le monde souterrain.",
        image: TOTK_MAP_IMAGE,
        primaryUrl: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
        secondaryUrl: "https://zeldatearsofthekingdom.wiki.fextralife.com/Interactive+Map",
        primaryLabel: "Carte interactive",
        secondaryLabel: "Fextralife Wiki",
      },
      {
        id: "totk-skyview-towers",
        title: "Tours Ascenseur",
        count: "15 tours",
        label: "Carte de navigation",
        description:
          "Les 15 tours Ascenseur déverrouillent la carte de chaque région et propulsent Link dans les cieux.",
        image: TOTK_MAP_IMAGE,
        primaryUrl: "https://www.zeldadungeon.net/tears-of-the-kingdom-interactive-map/",
        secondaryUrl: "https://mapgenie.io/zelda-tears-of-the-kingdom",
        primaryLabel: "Carte interactive",
        secondaryLabel: "MapGenie",
      },
    ],
  },
  {
    id: "super-mario-galaxy",
    title: "Super Mario Galaxy",
    subtitle: "Nintendo Wii",
    description:
      "Guide par dôme et galaxies pour suivre les étoiles, les comètes et les objectifs cachés.",
    source: "Ressources: StrategyWiki.",
    primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Galaxy/Walkthrough",
    resources: [
      {
        id: "galaxy-walkthrough",
        title: "Soluce complète",
        count: "Dômes et galaxies",
        label: "Guide principal",
        description:
          "Progression par dôme avec les galaxies principales, boss, étoiles cachées et objectifs spéciaux.",
        primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Galaxy/Walkthrough",
        secondaryUrl: "https://strategywiki.org/wiki/Super_Mario_Galaxy",
        primaryLabel: "Soluce StrategyWiki",
        secondaryLabel: "Page du jeu",
      },
    ],
  },
  {
    id: "super-mario-galaxy-2",
    title: "Super Mario Galaxy 2",
    subtitle: "Nintendo Wii",
    description:
      "Guide par mondes pour les étoiles, les galaxies bonus et les défis plus avancés.",
    source: "Ressources: StrategyWiki.",
    primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Galaxy_2/Walkthrough",
    resources: [
      {
        id: "galaxy-2-walkthrough",
        title: "Soluce complète",
        count: "Mondes 1 à S",
        label: "Guide principal",
        description:
          "Progression par monde avec les galaxies, boss, étoiles et niveaux spéciaux.",
        primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Galaxy_2/Walkthrough",
        secondaryUrl: "https://strategywiki.org/wiki/Super_Mario_Galaxy_2/Tips_and_tricks",
        primaryLabel: "Soluce StrategyWiki",
        secondaryLabel: "Trucs et astuces",
      },
    ],
  },
  {
    id: "super-mario-odyssey",
    title: "Super Mario Odyssey",
    subtitle: "Nintendo Switch",
    description:
      "Ressources par royaume pour la progression, les lunes de puissance et les défis optionnels.",
    source: "Ressources: StrategyWiki.",
    primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Odyssey",
    resources: [
      {
        id: "odyssey-walkthrough",
        title: "Royaumes et lunes",
        count: "Guide par royaume",
        label: "Guide principal",
        description:
          "Table des royaumes, progression principale, lunes de puissance et contenu de fin de jeu.",
        primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Odyssey",
        secondaryUrl: "https://strategywiki.org/wiki/Super_Mario_Odyssey/Outfits",
        primaryLabel: "Guide StrategyWiki",
        secondaryLabel: "Tenues",
      },
    ],
  },
  {
    id: "ocarina-of-time",
    title: "The Legend of Zelda: Ocarina of Time",
    subtitle: "Nintendo 64 / 3DS",
    description:
      "Soluce 100% pour les donjons, morceaux de cœur, Skulltulas d'or et quêtes secondaires.",
    source: "Ressources: Zelda Dungeon.",
    primaryUrl: "https://www.zeldadungeon.net/Zelda05-ocarina-of-time-walkthrough.php/",
    resources: [
      {
        id: "oot-walkthrough",
        title: "Soluce 100%",
        count: "Donjons et quêtes",
        label: "Guide Zelda",
        description:
          "Guide complet couvrant l'aventure, les boss, les objets, les cœurs et les Skulltulas.",
        primaryUrl: "https://www.zeldadungeon.net/Zelda05-ocarina-of-time-walkthrough.php/",
        secondaryUrl: "https://zeldawiki.wiki/wiki/Dungeons_in_Ocarina_of_Time",
        primaryLabel: "Zelda Dungeon",
        secondaryLabel: "Donjons",
      },
    ],
  },
  {
    id: "the-legend-of-zelda",
    title: "The Legend of Zelda",
    subtitle: "NES",
    description:
      "Guide pour la première quête, la seconde quête, les donjons et les secrets de l'overworld.",
    source: "Ressources: StrategyWiki.",
    primaryUrl: "https://strategywiki.org/wiki/The_Legend_of_Zelda/Walkthrough",
    resources: [
      {
        id: "zelda-nes-walkthrough",
        title: "Soluce des quêtes",
        count: "1re et 2e quête",
        label: "Guide rétro",
        description:
          "Cheminement suggéré, donjons, objets importants, secrets et préparation avant les niveaux.",
        primaryUrl: "https://strategywiki.org/wiki/The_Legend_of_Zelda/Walkthrough",
        secondaryUrl: "https://strategywiki.org/wiki/The_Legend_of_Zelda",
        primaryLabel: "Soluce StrategyWiki",
        secondaryLabel: "Page du jeu",
      },
    ],
  },
  {
    id: "majoras-mask",
    title: "The Legend of Zelda: Majora's Mask",
    subtitle: "Nintendo 64 / 3DS",
    description:
      "Soluce 100% pour les cycles de trois jours, masques, quêtes, donjons et cœurs.",
    source: "Ressources: Zelda Dungeon.",
    primaryUrl: "https://www.zeldadungeon.net/majoras-mask-walkthrough/",
    resources: [
      {
        id: "majoras-mask-walkthrough",
        title: "Soluce 100%",
        count: "Masques et quêtes",
        label: "Guide Zelda",
        description:
          "Guide complet couvrant les masques, le Bombers' Notebook, les donjons, boss et objets.",
        primaryUrl: "https://www.zeldadungeon.net/majoras-mask-walkthrough/",
        secondaryUrl: "https://strategywiki.org/wiki/The_Legend_of_Zelda:_Majora%27s_Mask",
        primaryLabel: "Zelda Dungeon",
        secondaryLabel: "StrategyWiki",
      },
    ],
  },
  {
    id: "super-mario-64",
    title: "Super Mario 64",
    subtitle: "Nintendo 64",
    description:
      "Ressources pour les étoiles, les niveaux du château, les secrets et la progression.",
    source: "Ressources: StrategyWiki.",
    primaryUrl: "https://strategywiki.org/wiki/Super_Mario_64/Walkthrough",
    resources: [
      {
        id: "mario-64-walkthrough",
        title: "Soluce complète",
        count: "120 étoiles",
        label: "Guide principal",
        description:
          "Progression par étage du château avec les mondes, étoiles, Bowser et secrets.",
        primaryUrl: "https://strategywiki.org/wiki/Super_Mario_64/Walkthrough",
        secondaryUrl: "https://strategywiki.org/wiki/Super_Mario_64",
        primaryLabel: "Soluce StrategyWiki",
        secondaryLabel: "Page du jeu",
      },
    ],
  },
  {
    id: "super-mario-sunshine",
    title: "Super Mario Sunshine",
    subtitle: "Nintendo GameCube",
    description:
      "Guide pour les Shine Sprites, les épisodes d'Isle Delfino, les pièces bleues et les secrets.",
    source: "Ressources: StrategyWiki.",
    primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Sunshine/Walkthrough",
    resources: [
      {
        id: "sunshine-walkthrough",
        title: "Soluce complète",
        count: "Shine Sprites",
        label: "Guide principal",
        description:
          "Progression par région et épisodes, avec objectifs principaux, secrets et collecte.",
        primaryUrl: "https://strategywiki.org/wiki/Super_Mario_Sunshine/Walkthrough",
        secondaryUrl: "https://strategywiki.org/wiki/Super_Mario_Sunshine",
        primaryLabel: "Soluce StrategyWiki",
        secondaryLabel: "Page du jeu",
      },
    ],
  },
];
const ACTIVE_GUIDE_GAME_IDS = new Set(["breath-of-the-wild", "tears-of-the-kingdom"]);
const ACTIVE_GUIDE_GAMES = GUIDE_GAMES.filter((game) => ACTIVE_GUIDE_GAME_IDS.has(game.id));

let audioContext;

const state = {
  activeView: "amiibo",
  amiibo: [],
  owned: new Set(),
  pending: [],
  gameProgress: {},
  selectedGameId: null,
  filters: {
    query: "",
    type: "",
    series: "",
    status: "all",
    sort: "name",
  },
};

const els = {
  navTabs: document.querySelectorAll("[data-view]"),
  viewPanels: document.querySelectorAll("[data-view-panel]"),
  headerActions: document.querySelector(".header-actions"),
  syncStatus: document.querySelector("#syncStatus"),
  refreshDataButton: document.querySelector("#refreshDataButton"),
  lastUpdateLabel: document.querySelector("#lastUpdateLabel"),
  ownedCount: document.querySelector("#ownedCount"),
  missingCount: document.querySelector("#missingCount"),
  totalCount: document.querySelector("#totalCount"),
  progressCount: document.querySelector("#progressCount"),
  pendingMetricCount: document.querySelector("#pendingMetricCount"),
  searchInput: document.querySelector("#searchInput"),
  typeFilter: document.querySelector("#typeFilter"),
  seriesFilter: document.querySelector("#seriesFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  statusButtons: document.querySelectorAll("[data-status]"),
  exportButton: document.querySelector("#exportButton"),
  pendingForm: document.querySelector("#pendingForm"),
  pendingInput: document.querySelector("#pendingInput"),
  pendingList: document.querySelector("#pendingList"),
  pendingCount: document.querySelector("#pendingCount"),
  pendingEmpty: document.querySelector("#pendingEmpty"),
  resultTitle: document.querySelector("#resultTitle"),
  resultCount: document.querySelector("#resultCount"),
  grid: document.querySelector("#amiiboGrid"),
  emptyState: document.querySelector("#emptyState"),
  template: document.querySelector("#amiiboCardTemplate"),
  gameCount: document.querySelector("#gameCount"),
  guideSourceCount: document.querySelector("#guideSourceCount"),
  gameLibraryCount: document.querySelector("#gameLibraryCount"),
  gameGrid: document.querySelector("#gameGrid"),
  gameEmptyState: document.querySelector("#gameEmptyState"),
  gameDetail: document.querySelector("#gameDetail"),
  backToGamesButton: document.querySelector("#backToGamesButton"),
  selectedGamePrimaryLink: document.querySelector("#selectedGamePrimaryLink"),
  selectedGameImage: document.querySelector("#selectedGameImage"),
  selectedGameTitle: document.querySelector("#selectedGameTitle"),
  selectedGameTipCount: document.querySelector("#selectedGameTipCount"),
  selectedGameDescription: document.querySelector("#selectedGameDescription"),
  selectedGameSource: document.querySelector("#selectedGameSource"),
  selectedGameNotes: document.querySelector("#selectedGameNotes"),
  notesSaveState: document.querySelector("#notesSaveState"),
  resourceGrid: document.querySelector("#resourceGrid"),
};

function getId(item) {
  return `${item.head}-${item.tail}`;
}

function imageUrl(head, tail) {
  return `${AMIIBO_IMAGE_BASE_URL}/icon_${head}-${tail}.png`;
}

function findMappedValue(map, key) {
  if (!map || !key) return "";
  return map[key] || map[key.toLowerCase()] || map[key.toUpperCase()] || "";
}

function normalizeAmiiboItem(item, source = {}, rawId = "") {
  const cleanId = String(rawId || "")
    .replace(/^0x/i, "")
    .padStart(16, "0")
    .slice(-16)
    .toLowerCase();

  const head = item.head || cleanId.slice(0, 8);
  const tail = item.tail || cleanId.slice(8, 16);
  const gameSeriesKey = `0x${head.slice(0, 3)}`;
  const characterKey = `0x${head.slice(0, 4)}`;
  const typeKey = `0x${head.slice(6, 8)}`;
  const amiiboSeriesKey = `0x${tail.slice(4, 6)}`;

  return {
    amiiboSeries: item.amiiboSeries || findMappedValue(source.amiibo_series, amiiboSeriesKey),
    character: item.character || findMappedValue(source.characters, characterKey),
    gameSeries: item.gameSeries || findMappedValue(source.game_series, gameSeriesKey),
    head,
    image: item.image || imageUrl(head, tail),
    name: item.name,
    release: item.release || {},
    sourceUrl: AMIIBO_DATABASE_URL,
    tail,
    type: item.type || findMappedValue(source.types, typeKey),
  };
}

function normalizeAmiiboSource(source) {
  if (source?.amiibos && typeof source.amiibos === "object" && !Array.isArray(source.amiibos)) {
    return Object.entries(source.amiibos)
      .map(([id, item]) => normalizeAmiiboItem(item, source, id))
      .filter((item) => item.head && item.tail && item.name);
  }

  const rawItems = Array.isArray(source)
    ? source
    : Array.isArray(source?.amiibo)
      ? source.amiibo
      : Array.isArray(source?.amiibos)
        ? source.amiibos
        : [];

  return rawItems
    .filter((item) => item && item.head && item.tail && item.name)
    .map((item) => normalizeAmiiboItem(item));
}

function getInventoryItems(items) {
  return items
    .filter((item) => INCLUDED_TYPES.has(item.type))
    .sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Le stockage local garde seulement ta collection cochee.
  }
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function makeSlug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function uniqueId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatGameCount(count) {
  return `${count.toLocaleString("fr-CA")} jeu${count > 1 ? "x" : ""}`;
}

function formatTipCount(count) {
  return `${count.toLocaleString("fr-CA")} astuce${count > 1 ? "s" : ""}`;
}

function normalizeTipItem(item) {
  const title = cleanText(item?.title);
  const content = String(item?.content || "").trim();
  if (!title && !content) return null;

  return {
    id: String(item?.id || uniqueId("tip")),
    title: title || "Astuce",
    content,
    createdAt: item?.createdAt || new Date().toISOString(),
  };
}

function normalizeGameItem(item) {
  const title = cleanText(item?.title);
  if (!title) return null;

  const id = String(item?.id || makeSlug(title) || uniqueId("game"));
  const tips = Array.isArray(item?.tips)
    ? item.tips.map(normalizeTipItem).filter(Boolean)
    : [];

  return {
    id,
    title,
    image: cleanText(item?.image),
    createdAt: item?.createdAt || new Date().toISOString(),
    tips,
  };
}

function loadGameTips() {
  try {
    const saved = JSON.parse(readStorage(GAME_TIPS_STORAGE_KEY) || "[]");
    state.gameTips = Array.isArray(saved)
      ? saved.map(normalizeGameItem).filter(Boolean)
      : [];
  } catch {
    state.gameTips = [];
  }
}

function saveGameTips() {
  writeStorage(GAME_TIPS_STORAGE_KEY, JSON.stringify(state.gameTips));
}

function getSelectedGame() {
  return state.gameTips.find((game) => game.id === state.selectedGameId) || null;
}

function setActiveView(view) {
  state.activeView = view;

  els.navTabs.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });

  els.viewPanels.forEach((panel) => {
    const isActive = panel.dataset.viewPanel === view;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  if (els.headerActions) {
    els.headerActions.hidden = view !== "amiibo";
  }
}

function renderGameCard(game) {
  const card = document.createElement("article");
  card.className = "game-card";
  card.classList.toggle("is-selected", game.id === state.selectedGameId);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "game-open";
  button.dataset.gameId = game.id;
  button.setAttribute("aria-label", `Ouvrir les trucs et astuces de ${game.title}`);

  const cover = document.createElement("div");
  cover.className = "game-cover";

  const image = document.createElement("img");
  image.src = game.image || GAME_PLACEHOLDER_IMAGE;
  image.alt = game.title;
  image.loading = "lazy";
  image.onerror = () => {
    image.onerror = null;
    image.src = GAME_PLACEHOLDER_IMAGE;
  };

  const meta = document.createElement("div");
  meta.className = "game-card-meta";

  const title = document.createElement("h3");
  title.textContent = game.title;

  const count = document.createElement("p");
  count.textContent = formatTipCount(game.tips.length);

  cover.append(image);
  meta.append(title, count);
  button.append(cover, meta);
  card.append(button);

  return card;
}

function renderTipItem(tip) {
  const item = document.createElement("li");
  item.className = "tip-item";

  const content = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = tip.title;

  const note = document.createElement("p");
  note.textContent = tip.content;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary-button tip-remove-button";
  button.dataset.tipId = tip.id;
  button.textContent = "Retirer";
  button.setAttribute("aria-label", `Retirer l'astuce ${tip.title}`);

  content.append(title, note);
  item.append(content, button);

  return item;
}

function renderSelectedGame() {
  const game = getSelectedGame();
  if (!game) {
    els.gameDetail.hidden = true;
    return;
  }

  els.gameDetail.hidden = false;
  els.selectedGameImage.src = game.image || GAME_PLACEHOLDER_IMAGE;
  els.selectedGameImage.alt = game.title;
  els.selectedGameImage.onerror = () => {
    els.selectedGameImage.onerror = null;
    els.selectedGameImage.src = GAME_PLACEHOLDER_IMAGE;
  };
  els.selectedGameTitle.textContent = game.title;
  els.selectedGameTipCount.textContent = formatTipCount(game.tips.length);
  els.tipEmptyState.hidden = game.tips.length > 0;
  els.tipList.replaceChildren(...game.tips.map(renderTipItem));
}

function renderGameLibrary() {
  state.gameTips.sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity: "base" }));

  els.gameCount.textContent = formatGameCount(state.gameTips.length);
  els.gameLibraryCount.textContent = `${state.gameTips.length.toLocaleString("fr-CA")} résultat${state.gameTips.length > 1 ? "s" : ""}`;
  els.gameGrid.replaceChildren(...state.gameTips.map(renderGameCard));
  els.gameEmptyState.hidden = state.gameTips.length > 0;
  renderSelectedGame();
}

function selectGame(id, shouldScroll = true) {
  state.selectedGameId = id;
  renderGameLibrary();

  if (shouldScroll && getSelectedGame()) {
    els.gameDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function clearSelectedGame() {
  state.selectedGameId = null;
  renderGameLibrary();
}

function addGame(titleValue, imageValue) {
  const title = cleanText(titleValue);
  const image = cleanText(imageValue);
  if (!title) return false;

  const titleKey = normalize(title);
  if (state.gameTips.some((game) => normalize(game.title) === titleKey)) {
    els.gameTitleInput.setCustomValidity("Ce jeu est déjà dans ta bibliothèque.");
    els.gameTitleInput.reportValidity();
    window.setTimeout(() => els.gameTitleInput.setCustomValidity(""), 1600);
    return false;
  }

  const baseId = makeSlug(title) || "game";
  let id = baseId;
  let index = 2;
  while (state.gameTips.some((game) => game.id === id)) {
    id = `${baseId}-${index}`;
    index += 1;
  }

  state.gameTips.push({
    id,
    title,
    image,
    createdAt: new Date().toISOString(),
    tips: [],
  });

  saveGameTips();
  selectGame(id, false);
  return true;
}

function removeSelectedGame() {
  const game = getSelectedGame();
  if (!game) return;

  const shouldDelete = window.confirm(`Supprimer "${game.title}" et toutes ses astuces?`);
  if (!shouldDelete) return;

  state.gameTips = state.gameTips.filter((item) => item.id !== game.id);
  state.selectedGameId = null;
  saveGameTips();
  renderGameLibrary();
}

function addTip(titleValue, contentValue) {
  const game = getSelectedGame();
  if (!game) return;

  const title = cleanText(titleValue);
  const content = String(contentValue || "").trim();
  if (!title || !content) return;

  game.tips.push({
    id: uniqueId("tip"),
    title,
    content,
    createdAt: new Date().toISOString(),
  });

  saveGameTips();
  renderGameLibrary();
}

function removeTip(id) {
  const game = getSelectedGame();
  if (!game) return;

  game.tips = game.tips.filter((tip) => tip.id !== id);
  saveGameTips();
  renderGameLibrary();
}

function formatGuideCount(count) {
  return `${count.toLocaleString("fr-CA")} ressource${count > 1 ? "s" : ""}`;
}

function getSelectedGame() {
  return ACTIVE_GUIDE_GAMES.find((game) => game.id === state.selectedGameId) || null;
}

function normalizeGameProgress(value = {}) {
  return {
    completed: Boolean(value.completed),
    completed100: Boolean(value.completed100),
    notes: String(value.notes || ""),
  };
}

function loadGameProgress() {
  try {
    const saved = JSON.parse(readStorage(GAME_PROGRESS_STORAGE_KEY) || "{}");
    state.gameProgress = saved && typeof saved === "object" && !Array.isArray(saved)
      ? Object.fromEntries(
          Object.entries(saved).map(([id, value]) => [id, normalizeGameProgress(value)])
        )
      : {};
  } catch {
    state.gameProgress = {};
  }
}

function saveGameProgress() {
  writeStorage(GAME_PROGRESS_STORAGE_KEY, JSON.stringify(state.gameProgress));
}

function getGameProgress(gameId) {
  return normalizeGameProgress(state.gameProgress[gameId]);
}

function setGameProgress(gameId, patch, shouldRender = true) {
  state.gameProgress[gameId] = {
    ...getGameProgress(gameId),
    ...patch,
  };
  saveGameProgress();

  if (shouldRender) {
    renderGameLibrary();
  }
}

function updateGameCompletion(gameId, field, checked) {
  const patch = { [field]: checked };
  if (field === "completed100" && checked) patch.completed = true;
  if (field === "completed" && !checked) patch.completed100 = false;
  setGameProgress(gameId, patch);
}

function renderGameStatusToggle(game, field, label, checked) {
  const wrapper = document.createElement("label");
  wrapper.className = "game-status-toggle";
  wrapper.classList.toggle("is-checked", checked);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.dataset.gameId = game.id;
  input.dataset.progressField = field;
  input.setAttribute("aria-label", `${label} - ${game.title}`);

  const text = document.createElement("span");
  text.textContent = label;

  wrapper.append(input, text);
  return wrapper;
}

function renderGameCard(game) {
  const card = document.createElement("article");
  card.className = "game-card";
  card.classList.toggle("is-selected", game.id === state.selectedGameId);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "game-open";
  button.dataset.gameId = game.id;
  button.setAttribute("aria-label", `Ouvrir les cartes de ${game.title}`);

  const cover = document.createElement("div");
  cover.className = "game-cover";

  const image = document.createElement("img");
  image.src = game.image || GAME_PLACEHOLDER_IMAGE;
  image.alt = game.title;
  image.loading = "lazy";
  image.onerror = () => {
    image.onerror = null;
    image.src = GAME_PLACEHOLDER_IMAGE;
  };

  const meta = document.createElement("div");
  meta.className = "game-card-meta";

  const title = document.createElement("h3");
  title.textContent = game.title;

  const count = document.createElement("p");
  count.textContent = `${game.subtitle} · ${formatGuideCount(game.resources.length)}`;

  cover.append(image);
  meta.append(title, count);
  const progress = getGameProgress(game.id);
  const statusControls = document.createElement("div");
  statusControls.className = "game-card-status";
  statusControls.append(
    renderGameStatusToggle(game, "completed", "Complété", progress.completed),
    renderGameStatusToggle(game, "completed100", "Complété à 100%", progress.completed100)
  );

  button.append(cover);
  card.append(button, statusControls, meta);

  return card;
}

function renderResourceCard(resource) {
  const card = document.createElement("article");
  card.className = "resource-card";

  const preview = document.createElement("a");
  preview.className = "resource-preview";
  preview.href = resource.primaryUrl;
  preview.target = "_blank";
  preview.rel = "noopener";

  const image = document.createElement("img");
  image.src = resource.image || GAME_PLACEHOLDER_IMAGE;
  image.alt = resource.title;
  image.loading = "lazy";
  image.onerror = () => {
    image.onerror = null;
    image.src = GAME_PLACEHOLDER_IMAGE;
  };

  const badge = document.createElement("span");
  badge.className = "resource-badge";
  badge.textContent = resource.label;

  const body = document.createElement("div");
  body.className = "resource-body";

  const title = document.createElement("h3");
  title.textContent = resource.title;

  const count = document.createElement("strong");
  count.textContent = resource.count;

  const description = document.createElement("p");
  description.textContent = resource.description;

  const actions = document.createElement("div");
  actions.className = "resource-actions";

  const primaryLink = document.createElement("a");
  primaryLink.className = "market-link";
  primaryLink.href = resource.primaryUrl;
  primaryLink.target = "_blank";
  primaryLink.rel = "noopener";
  primaryLink.textContent = resource.primaryLabel;

  const secondaryLink = document.createElement("a");
  secondaryLink.className = "market-link";
  secondaryLink.href = resource.secondaryUrl;
  secondaryLink.target = "_blank";
  secondaryLink.rel = "noopener";
  secondaryLink.textContent = resource.secondaryLabel;

  preview.append(image, badge);
  actions.append(primaryLink, secondaryLink);
  body.append(title, count, description, actions);
  card.append(preview, body);

  return card;
}

function renderSelectedGame() {
  const game = getSelectedGame();
  if (!game) {
    els.gameDetail.hidden = true;
    return;
  }

  els.gameDetail.hidden = false;
  els.selectedGameImage.src = game.image || GAME_PLACEHOLDER_IMAGE;
  els.selectedGameImage.alt = game.title;
  els.selectedGameImage.onerror = () => {
    els.selectedGameImage.onerror = null;
    els.selectedGameImage.src = GAME_PLACEHOLDER_IMAGE;
  };
  els.selectedGameTitle.textContent = game.title;
  els.selectedGameTipCount.textContent = formatGuideCount(game.resources.length);
  els.selectedGameDescription.textContent = game.description;
  els.selectedGameSource.textContent = game.source;
  els.selectedGamePrimaryLink.href = game.primaryUrl;
  const progress = getGameProgress(game.id);
  els.selectedGameNotes.value = progress.notes;
  els.notesSaveState.textContent = progress.notes
    ? "Notes sauvegardées automatiquement."
    : "Aucune note personnelle pour ce jeu.";
  els.resourceGrid.replaceChildren(...game.resources.map(renderResourceCard));
}

function renderGameLibrary() {
  const games = [...ACTIVE_GUIDE_GAMES].sort((a, b) =>
    a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
  );
  const totalResources = games.reduce((total, game) => total + game.resources.length, 0);

  els.gameCount.textContent = formatGameCount(games.length);
  els.guideSourceCount.textContent = `${formatGuideCount(totalResources)} disponibles depuis des sources publiques en ligne.`;
  els.gameLibraryCount.textContent = `${games.length.toLocaleString("fr-CA")} résultat${games.length > 1 ? "s" : ""}`;
  els.gameGrid.replaceChildren(...games.map(renderGameCard));
  els.gameEmptyState.hidden = games.length > 0;
  renderSelectedGame();
}

function loadOwned() {
  try {
    const saved = JSON.parse(readStorage(STORAGE_KEY) || "[]");
    state.owned = new Set(Array.isArray(saved) ? saved : []);
  } catch {
    state.owned = new Set();
  }
}

function saveOwned() {
  writeStorage(STORAGE_KEY, JSON.stringify([...state.owned]));
}

function loadPending() {
  try {
    const saved = JSON.parse(readStorage(PENDING_STORAGE_KEY) || "[]");
    state.pending = Array.isArray(saved)
      ? saved.filter((item) => item?.id && item?.name)
      : [];
  } catch {
    state.pending = [];
  }
}

function savePending() {
  writeStorage(PENDING_STORAGE_KEY, JSON.stringify(state.pending));
}

function playOwnedChime() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return;

  audioContext ||= new AudioContextConstructor();
  const now = audioContext.currentTime;
  const melody = [
    { frequency: 392, start: 0, duration: 0.08 },
    { frequency: 493.88, start: 0.07, duration: 0.08 },
    { frequency: 587.33, start: 0.14, duration: 0.09 },
    { frequency: 783.99, start: 0.22, duration: 0.1 },
    { frequency: 987.77, start: 0.31, duration: 0.13 },
    { frequency: 1174.66, start: 0.43, duration: 0.3 },
  ];

  const sparkle = [
    { frequency: 1567.98, start: 0.25, duration: 0.06 },
    { frequency: 1760, start: 0.34, duration: 0.06 },
    { frequency: 2093, start: 0.48, duration: 0.18 },
  ];

  melody.forEach((note) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + note.start;
    const end = start + note.duration;

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(note.frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.075, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(end + 0.03);
  });

  sparkle.forEach((note) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + note.start;
    const end = start + note.duration;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(note.frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(end + 0.03);
  });
}

function pendingId(name) {
  return normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function addPendingItem(name) {
  const cleanName = name.trim().replace(/\s+/g, " ");
  if (!cleanName) return;

  const id = pendingId(cleanName);
  if (!id) return;

  const alreadyExists = state.pending.some((item) => item.id === id);
  if (alreadyExists) {
    setStatus("Cette figurine est déjà dans la liste en attente.", "warning");
    return;
  }

  state.pending = [
    ...state.pending,
    {
      id,
      name: cleanName,
      createdAt: new Date().toISOString(),
    },
  ].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
  savePending();
  renderPending();
}

function removePendingItem(id) {
  state.pending = state.pending.filter((item) => item.id !== id);
  savePending();
  renderPending();
}

function setStatus(message, tone = "neutral") {
  els.syncStatus.textContent = message;
  els.syncStatus.dataset.tone = tone;
}

function formatUpdateDate(value) {
  if (!value) return "jamais";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getLastUpdateDate() {
  return readStorage(LAST_UPDATE_KEY);
}

function setLastUpdateDate(value) {
  writeStorage(LAST_UPDATE_KEY, value);
  updateLastUpdateLabel();
}

function updateLastUpdateLabel() {
  const date = getLastUpdateDate();
  els.lastUpdateLabel.textContent = `Dernière mise à jour en ligne: ${formatUpdateDate(date)}`;
  els.lastUpdateLabel.title = "Source: AmiiboAPI sur GitHub";
}

async function loadOnlineInventory() {
  const response = await fetch(`${AMIIBO_DATABASE_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const payload = await response.json();
  const items = getInventoryItems(normalizeAmiiboSource(payload));
  if (!items.length) throw new Error("Aucune figurine reçue");

  return items;
}

async function refreshDatabase() {
  els.refreshDataButton.disabled = true;
  els.refreshDataButton.textContent = "Actualisation...";
  setStatus("Lecture de la liste publique AmiiboAPI...");

  try {
    state.amiibo = await loadOnlineInventory();
    setLastUpdateDate(new Date().toISOString());
    populateFilters();
    render();
    setStatus(
      `Liste en ligne chargée: ${state.amiibo.length.toLocaleString("fr-CA")} figurines.`,
      "success"
    );
  } catch {
    state.amiibo = [];
    populateFilters();
    render();
    setStatus(
      "Impossible de joindre la source en ligne. Vérifie ta connexion, puis réessaie.",
      "error"
    );
  } finally {
    els.refreshDataButton.disabled = false;
    els.refreshDataButton.textContent = "Actualiser Amiibo";
  }
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    if (state.filters.sort === "release") {
      const dateA = a.release?.na || "9999-99-99";
      const dateB = b.release?.na || "9999-99-99";
      return dateA.localeCompare(dateB) || a.name.localeCompare(b.name, "fr");
    }

    const field = state.filters.sort;
    return String(a[field] || "").localeCompare(String(b[field] || ""), "fr", {
      sensitivity: "base",
    }) || a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
  });
}

function getFilteredItems() {
  const query = normalize(state.filters.query);

  const filtered = state.amiibo.filter((item) => {
    const id = getId(item);
    const owned = state.owned.has(id);

    if (state.filters.type && item.type !== state.filters.type) return false;
    if (state.filters.series && item.amiiboSeries !== state.filters.series) return false;
    if (state.filters.status === "owned" && !owned) return false;
    if (state.filters.status === "missing" && owned) return false;

    if (!query) return true;

    const searchable = normalize(
      [item.name, item.character, item.amiiboSeries, item.gameSeries, item.type].join(" ")
    );

    return searchable.includes(query);
  });

  return sortItems(filtered);
}

function populateFilters() {
  const types = [...new Set(state.amiibo.map((item) => item.type).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "fr")
  );
  const series = [...new Set(state.amiibo.map((item) => item.amiiboSeries).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b, "fr")
  );

  els.typeFilter.replaceChildren(new Option("Tous les types", ""));
  types.forEach((type) => els.typeFilter.append(new Option(type, type)));

  els.seriesFilter.replaceChildren(new Option("Toutes les séries", ""));
  series.forEach((name) => els.seriesFilter.append(new Option(name, name)));
}

function updateSummary() {
  const total = state.amiibo.length;
  const owned = state.amiibo.filter((item) => state.owned.has(getId(item))).length;
  const missing = Math.max(total - owned, 0);
  const progress = total ? Math.round((owned / total) * 100) : 0;

  els.ownedCount.textContent = owned.toLocaleString("fr-CA");
  els.missingCount.textContent = missing.toLocaleString("fr-CA");
  els.totalCount.textContent = total.toLocaleString("fr-CA");
  els.progressCount.textContent = `${progress}%`;
  els.pendingMetricCount.textContent = state.pending.length.toLocaleString("fr-CA");
}

function renderPending() {
  els.pendingMetricCount.textContent = state.pending.length.toLocaleString("fr-CA");
  els.pendingCount.textContent = `${state.pending.length.toLocaleString("fr-CA")} entrée${state.pending.length > 1 ? "s" : ""}`;
  els.pendingEmpty.hidden = state.pending.length > 0;

  els.pendingList.replaceChildren(...state.pending.map((item) => {
    const listItem = document.createElement("li");
    listItem.className = "pending-item";

    const name = document.createElement("span");
    name.textContent = item.name;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.pendingId = item.id;
    button.textContent = "Retirer";
    button.setAttribute("aria-label", `Retirer ${item.name} de la liste en attente`);

    listItem.append(name, button);
    return listItem;
  }));
}

function renderCard(item) {
  const fragment = els.template.content.cloneNode(true);
  const card = fragment.querySelector(".amiibo-card");
  const image = fragment.querySelector("img");
  const checkbox = fragment.querySelector("input");
  const id = getId(item);
  const owned = state.owned.has(id);

  card.classList.toggle("is-owned", owned);
  card.dataset.id = id;
  image.src = item.image;
  image.onerror = () => {
    image.onerror = null;
    image.src = PLACEHOLDER_IMAGE;
  };
  image.alt = item.name;

  fragment.querySelector(".series").textContent = item.amiiboSeries || "Série inconnue";
  fragment.querySelector("h3").textContent = item.name || "Amiibo sans nom";
  fragment.querySelector(".character").textContent = item.character || "Personnage inconnu";
  fragment.querySelector(".type").textContent = item.type || "Non précisé";
  fragment.querySelector(".game-series").textContent = item.gameSeries || "Non précisé";
  fragment.querySelector(".release").textContent = item.release?.na || "Inconnue";
  fragment.querySelector(".source-summary").textContent = "AmiiboAPI";

  checkbox.checked = owned;
  checkbox.dataset.id = id;
  checkbox.setAttribute("aria-label", `Marquer ${item.name} comme possédé`);

  return fragment;
}

function render() {
  const items = getFilteredItems();

  els.grid.replaceChildren(...items.map(renderCard));
  els.emptyState.hidden = items.length > 0;
  els.resultTitle.textContent = state.filters.status === "owned"
    ? "Figurines possédées"
    : state.filters.status === "missing"
      ? "Figurines manquantes"
      : "Inventaire";
  els.resultCount.textContent = `${items.length.toLocaleString("fr-CA")} résultat${items.length > 1 ? "s" : ""}`;

  updateSummary();
}

function exportCsv() {
  const rows = [
    [
      "id",
      "possede",
      "nom",
      "personnage",
      "type",
      "serie_amiibo",
      "serie_jeu",
      "sortie_na",
      "image",
      "source",
    ],
    ...sortItems(state.amiibo).map((item) => [
      getId(item),
      state.owned.has(getId(item)) ? "oui" : "non",
      item.name || "",
      item.character || "",
      item.type || "",
      item.amiiboSeries || "",
      item.gameSeries || "",
      item.release?.na || "",
      item.image || "",
      item.sourceUrl || AMIIBO_DATABASE_URL,
    ]),
    ...state.pending.map((item) => [
      `pending-${item.id}`,
      "en attente",
      item.name,
      "",
      "En attente",
      "",
      "",
      "",
      "",
      "Saisie manuelle",
    ]),
  ];

  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "inventaire-amiibo.csv";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function bindEvents() {
  els.navTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveView(button.dataset.view);
    });
  });

  els.searchInput.addEventListener("input", (event) => {
    state.filters.query = event.target.value;
    render();
  });

  els.typeFilter.addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    render();
  });

  els.seriesFilter.addEventListener("change", (event) => {
    state.filters.series = event.target.value;
    render();
  });

  els.sortSelect.addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    render();
  });

  els.statusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.status = button.dataset.status;
      els.statusButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });

  els.grid.addEventListener("change", (event) => {
    if (event.target.type !== "checkbox") return;

    const id = event.target.dataset.id;
    if (event.target.checked) {
      state.owned.add(id);
      playOwnedChime();
    } else {
      state.owned.delete(id);
    }

    saveOwned();
    render();
  });

  els.pendingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addPendingItem(els.pendingInput.value);
    els.pendingInput.value = "";
    els.pendingInput.focus();
  });

  els.pendingList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-pending-id]");
    if (!button) return;
    removePendingItem(button.dataset.pendingId);
  });

  els.gameGrid.addEventListener("change", (event) => {
    const field = event.target.dataset.progressField;
    const gameId = event.target.dataset.gameId;
    if (!field || !gameId) return;
    updateGameCompletion(gameId, field, event.target.checked);
  });

  els.gameGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".game-open[data-game-id]");
    if (!button) return;
    selectGame(button.dataset.gameId);
  });

  els.backToGamesButton.addEventListener("click", clearSelectedGame);

  els.selectedGameNotes.addEventListener("input", (event) => {
    const game = getSelectedGame();
    if (!game) return;
    setGameProgress(game.id, { notes: event.target.value }, false);
    els.notesSaveState.textContent = "Notes sauvegardées automatiquement.";
  });

  els.refreshDataButton.addEventListener("click", refreshDatabase);
  els.exportButton.addEventListener("click", exportCsv);
}

loadOwned();
loadPending();
loadGameProgress();
updateLastUpdateLabel();
bindEvents();
renderPending();
renderGameLibrary();
setActiveView("amiibo");
refreshDatabase();
