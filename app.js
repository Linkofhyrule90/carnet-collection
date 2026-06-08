const AMIIBO_DATABASE_URL =
  "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/database/amiibo.json";
const AMIIBO_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images";
const STORAGE_KEY = "amiibo-inventory-v1";
const NOTES_STORAGE_KEY = "amiibo-notes-v1";
const LAST_UPDATE_KEY = "amiibo-live-last-update-v1";
const GAME_PROGRESS_STORAGE_KEY = "game-guide-progress-v1";
const INCLUDED_TYPES = new Set(["Figure", "Pack"]);
const USD_CAD_RATE = 1.3924; // Banque du Canada, 5 juin 2026
const SUPPLEMENT_UPDATED = "7 juin 2026";

// Figurines annoncées par Nintendo absentes d'AmiiboAPI — mise à jour: 2026-06-04
// Source: https://www.nintendo.com/amiibo/line-up/
const NINTENDO_SUPPLEMENT = [
  // Street Fighter 6 — 2025-06-05
  { head: "f0000001", tail: "00000001", name: "Kimberly",                       character: "Kimberly",           amiiboSeries: "Street Fighter 6",        gameSeries: "Street Fighter",        release: { na: "2025-06-05", jp: "2025-06-05", eu: "2025-06-05", au: "2025-06-05" }, image: "assets/supplement/kimberly.png" },
  { head: "f0000002", tail: "00000001", name: "Luke",                            character: "Luke",                amiiboSeries: "Street Fighter 6",        gameSeries: "Street Fighter",        release: { na: "2025-06-05", jp: "2025-06-05", eu: "2025-06-05", au: "2025-06-05" }, image: "assets/supplement/luke.png" },
  { head: "f0000003", tail: "00000001", name: "Jamie",                           character: "Jamie",               amiiboSeries: "Street Fighter 6",        gameSeries: "Street Fighter",        release: { na: "2025-06-05", jp: "2025-06-05", eu: "2025-06-05", au: "2025-06-05" }, image: "assets/supplement/jamie.png" },
  // Donkey Kong Bananza — 2025-07-17
  { head: "f0000004", tail: "00000001", name: "Donkey Kong & Pauline",           character: "Donkey Kong",         amiiboSeries: "Donkey Kong Bananza",     gameSeries: "Donkey Kong",           release: { na: "2025-07-17", jp: "2025-07-17", eu: "2025-07-17", au: "2025-07-17" }, image: "assets/supplement/dk-pauline.png" },
  // Kirby Air Riders vague 1 — 2025-11-20
  { head: "f0000005", tail: "00000001", name: "Kirby & Warp Star",               character: "Kirby",               amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: { na: "2025-11-20", jp: "2025-11-20", eu: "2025-11-20", au: "2025-11-20" }, image: "assets/supplement/kirby-warp-star.png" },
  { head: "f0000006", tail: "00000001", name: "Bandana Waddle Dee & Winged Star",character: "Bandana Waddle Dee",  amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: { na: "2025-11-20", jp: "2025-11-20", eu: "2025-11-20", au: "2025-11-20" }, image: "assets/supplement/bandana-waddle-dee.png" },
  // Kirby Air Riders vague 2 — 2026-03-05
  { head: "f0000007", tail: "00000001", name: "Meta Knight & Shadow Star",       character: "Meta Knight",         amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: { na: "2026-03-05", jp: "2026-03-05", eu: "2026-03-05", au: "2026-03-05" }, image: "assets/supplement/meta-knight-shadow.png" },
  // Super Mario Bros. Wonder — 2026-03-26
  { head: "f0000008", tail: "00000001", name: "Elephant Mario",                  character: "Mario",               amiiboSeries: "Super Mario Bros. Wonder",gameSeries: "Super Mario Bros.",     release: { na: "2026-03-26", jp: "2026-03-26", eu: "2026-03-26", au: "2026-03-26" }, image: "assets/supplement/elephant-mario.png" },
  { head: "f0000009", tail: "00000001", name: "Captain Toad & Talking Flower",   character: "Captain Toad",        amiiboSeries: "Super Mario Bros. Wonder",gameSeries: "Super Mario Bros.",     release: { na: "2026-03-26", jp: "2026-03-26", eu: "2026-03-26", au: "2026-03-26" }, image: "assets/supplement/captain-toad.png" },
  { head: "f000000a", tail: "00000001", name: "Poplin & Prince Florian",         character: "Prince Florian",      amiiboSeries: "Super Mario Bros. Wonder",gameSeries: "Super Mario Bros.",     release: { na: "2026-03-26", jp: "2026-03-26", eu: "2026-03-26", au: "2026-03-26" }, image: "assets/supplement/poplin-florian.png" },
  // Super Mario Galaxy — 2026-04-02
  { head: "f000000b", tail: "00000001", name: "Mario and Luma",                  character: "Mario",               amiiboSeries: "Super Mario Galaxy",      gameSeries: "Super Mario Galaxy",    release: { na: "2026-04-02", jp: "2026-04-02", eu: "2026-04-02", au: "2026-04-02" }, image: "assets/supplement/mario-luma.png" },
  { head: "f000000c", tail: "00000001", name: "Rosalina and Lumas",              character: "Rosalina",            amiiboSeries: "Super Mario Galaxy",      gameSeries: "Super Mario Galaxy",    release: { na: "2026-04-02", jp: "2026-04-02", eu: "2026-04-02", au: "2026-04-02" }, image: "assets/supplement/rosalina-lumas.png" },
  // Kirby Air Riders vague 3 — 2026-07-02
  { head: "f000000d", tail: "00000001", name: "King Dedede & Tank Star",         character: "King Dedede",         amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: { na: "2026-07-02", jp: "2026-07-02", eu: "2026-07-02", au: "2026-07-02" }, image: "assets/supplement/king-dedede-tank.png" },
  // Splatoon Raiders — 2026-07-23
  { head: "f000000e", tail: "00000001", name: "Big Man",                         character: "Big Man",             amiiboSeries: "Splatoon Raiders",        gameSeries: "Splatoon",              release: { na: "2026-07-23", jp: "2026-07-23", eu: "2026-07-23", au: "2026-07-23" }, image: "assets/supplement/big-man-raiders.png" },
  { head: "f000000f", tail: "00000001", name: "Frye",                            character: "Frye",                amiiboSeries: "Splatoon Raiders",        gameSeries: "Splatoon",              release: { na: "2026-07-23", jp: "2026-07-23", eu: "2026-07-23", au: "2026-07-23" }, image: "assets/supplement/frye-raiders.png" },
  { head: "f0000010", tail: "00000001", name: "Shiver",                          character: "Shiver",              amiiboSeries: "Splatoon Raiders",        gameSeries: "Splatoon",              release: { na: "2026-07-23", jp: "2026-07-23", eu: "2026-07-23", au: "2026-07-23" }, image: "assets/supplement/shiver-raiders.png" },
  // The Legend of Zelda: Tears of the Kingdom — 2026-09-17
  { head: "f0000011", tail: "00000001", name: "Mineru's Construct",              character: "Mineru",              amiiboSeries: "The Legend of Zelda",     gameSeries: "The Legend of Zelda",   release: { na: "2026-09-17", jp: "2026-09-17", eu: "2026-09-17", au: "2026-09-17" }, image: "assets/supplement/mineru.png" },
  // Kirby Air Riders — date à confirmer
  { head: "f0000012", tail: "00000001", name: "Chef Kawasaki & Hop Star",        character: "Chef Kawasaki",       amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: {}, image: "assets/supplement/chef-kawasaki.png" },
  { head: "f0000013", tail: "00000001", name: "Sword Kirby & Dragoon",           character: "Kirby",               amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: {}, image: "assets/supplement/sword-kirby.png" },
  { head: "f0000014", tail: "00000001", name: "Noir Dedede & Hydra",             character: "King Dedede",         amiiboSeries: "Kirby Air Riders",        gameSeries: "Kirby",                 release: {}, image: "assets/supplement/noir-dedede.png" },
  // Packs / Ensembles figure — source: PriceCharting
  { head: "f0010001", tail: "00000002", name: "Splatoon Deep Cut Set: Shiver, Frye & Big Man", character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2023-11-17" }, includes: ["Shiver", "Frye", "Big Man"], image: "assets/supplement/splatoon-deep-cut-set.png" },
  { head: "f0010002", tail: "00000002", name: "Cat Mario & Cat Peach Double Pack",              character: "", amiiboSeries: "Super Mario",                          gameSeries: "Super Mario Bros.",     type: "Pack", release: { na: "2021-02-12" }, includes: ["Cat Mario", "Cat Peach"], image: "assets/supplement/cat-mario-cat-peach.png" },
  { head: "f0010003", tail: "00000002", name: "Zelda Breath of the Wild Champions Set",         character: "", amiiboSeries: "The Legend of Zelda: Breath of the Wild", gameSeries: "The Legend of Zelda", type: "Pack", release: { na: "2017-11-10" }, includes: ["Daruk", "Urbosa", "Revali", "Mipha"], image: "assets/supplement/botw-champions-set.png" },
  { head: "f0010004", tail: "00000002", name: "Metroid Dread 2 Amiibo Pack",                    character: "", amiiboSeries: "Metroid",                               gameSeries: "Metroid",               type: "Pack", release: { na: "2021-10-08" }, includes: ["Samus", "E.M.M.I."], image: "assets/supplement/metroid-dread-2-pack.png" },
  { head: "f0010005", tail: "00000002", name: "Retro 3 Pack",                                   character: "", amiiboSeries: "Super Smash Bros.",                     gameSeries: "Super Smash Bros.",     type: "Pack", release: { na: "2015-09-25" }, includes: ["R.O.B.", "Mr. Game & Watch", "Duck Hunt"], image: "assets/supplement/retro-3-pack.png" },
  { head: "f0010006", tail: "00000002", name: "Mii 3 Pack",                                     character: "", amiiboSeries: "Super Smash Bros.",                     gameSeries: "Super Smash Bros.",     type: "Pack", release: { na: "2015-11-01" }, includes: ["Mii Swordfighter", "Mii Brawler", "Mii Gunner"], image: "assets/supplement/mii-fighter-3-pack.png" },
  { head: "f0010007", tail: "00000002", name: "Animal Crossing 3 Pack",                         character: "", amiiboSeries: "Animal Crossing",                       gameSeries: "Animal Crossing",       type: "Pack", release: { na: "2015-11-13" }, includes: ["Tom Nook", "K.K.", "Isabelle (Winter Outfit)"], image: "assets/supplement/animal-crossing-3-pack.png" },
  { head: "f0010008", tail: "00000002", name: "Splatoon 3 Pack",                                character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2015-05-29" }, includes: ["Inkling Boy", "Inkling Girl", "Inkling Squid"], image: "assets/supplement/splatoon-inkling-3-pack.png" },
  { head: "f0010009", tail: "00000002", name: "Splatoon 3 Pack [Alt Colors]",                   character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2016-07-08" }, includes: ["Inkling Boy", "Inkling Girl", "Inkling Squid"], image: "assets/supplement/splatoon-inkling-3-pack-alt.png" },
  { head: "f001000a", tail: "00000002", name: "Splatoon 3 Pack [Octoling]",                     character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2018-12-07" }, includes: ["Octoling Boy", "Octoling Girl", "Octoling Octopus"], image: "assets/supplement/splatoon-octoling-3-pack.png" },
  { head: "f001000b", tail: "00000002", name: "Callie and Marie 2 Pack",                        character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2017-07-21" }, includes: ["Callie", "Marie"], image: "assets/supplement/callie-marie-2-pack.png" },
  { head: "f001000c", tail: "00000002", name: "Fire Emblem 2 Pack",                             character: "", amiiboSeries: "Fire Emblem",                           gameSeries: "Fire Emblem",           type: "Pack", release: { na: "2017-05-19" }, includes: ["Alm", "Celica"], image: "assets/supplement/fire-emblem-alm-celica.png" },
  { head: "f001000d", tail: "00000002", name: "Toon Link & Zelda 2 Pack",                       character: "", amiiboSeries: "30th Anniversary",                      gameSeries: "The Legend of Zelda",   type: "Pack", release: { na: "2016-12-02" }, includes: ["Toon Link (The Wind Waker)", "Zelda (The Wind Waker)"], image: "assets/supplement/toon-link-zelda-windwaker.png" },
  { head: "f001000e", tail: "00000002", name: "Isabelle & Digby 2 Pack",                        character: "", amiiboSeries: "Animal Crossing",                       gameSeries: "Animal Crossing",       type: "Pack", release: { na: "2020-11-20" }, includes: ["Isabelle (Winter Outfit)", "Digby"], image: "assets/supplement/isabelle-digby-2-pack.png" },
  { head: "f001000f", tail: "00000002", name: "Mario Odyssey Wedding 3 Pack",                   character: "", amiiboSeries: "Super Mario Odyssey",                   gameSeries: "Super Mario Bros.",     type: "Pack", release: { na: "2017-10-27" }, includes: ["Mario (Wedding Outfit)", "Peach (Wedding Outfit)", "Bowser (Wedding Outfit)"], image: "assets/supplement/mario-odyssey-wedding-3pack.png" },
  { head: "f0010010", tail: "00000002", name: "Steve & Alex 2-Pack",                            character: "", amiiboSeries: "Super Smash Bros.",                     gameSeries: "Minecraft",             type: "Pack", release: { na: "2022-09-09" }, includes: ["Steve", "Alex"], image: "assets/supplement/steve-alex-2-pack.png" },
  { head: "f0010011", tail: "00000002", name: "Pyra & Mythra 2-Pack",                           character: "", amiiboSeries: "Super Smash Bros.",                     gameSeries: "Xenoblade Chronicles",  type: "Pack", release: { na: "2023-07-21" }, includes: ["Pyra", "Mythra"], image: "assets/supplement/pyra-mythra-2-pack.png" },
  { head: "f0010012", tail: "00000002", name: "Metroid 2 Pack",                                 character: "", amiiboSeries: "Metroid",                               gameSeries: "Metroid",               type: "Pack", release: { na: "2017-09-15" }, includes: ["Samus Aran", "Metroid"], image: "assets/supplement/metroid-samus-2-pack.png" },
  { head: "f0010013", tail: "00000002", name: "Pearl & Marina 2 Pack",                          character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2018-07-13" }, includes: ["Pearl", "Marina"], image: "assets/supplement/pearl-marina-2-pack.png" },
  { head: "f0010014", tail: "00000002", name: "Pearl And Marina Side Order 2-Pack",             character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2024-09-05" }, includes: ["Pearl (Side Order)", "Marina (Side Order)"], image: "assets/supplement/pearl-marina-side-order.png" },
  { head: "f0010015", tail: "00000002", name: "Callie And Marie Alterna 2-Pack",                character: "", amiiboSeries: "Splatoon",                              gameSeries: "Splatoon",              type: "Pack", release: { na: "2024-09-05" }, includes: ["Callie (Alterna)", "Marie (Alterna)"], image: "assets/supplement/callie-marie-alterna.png" },
  { head: "f0010016", tail: "00000002", name: "Shovel Knight Treasure Trove 3 Pack",            character: "", amiiboSeries: "Shovel Knight",                         gameSeries: "Shovel Knight",         type: "Pack", release: { na: "2019-12-31" }, includes: ["Specter Knight", "Plague Knight", "King Knight"], image: "assets/supplement/shovel-knight-3-pack.png" },
  { head: "f0010017", tail: "00000002", name: "Yarn Yoshi - Pink",                              character: "", amiiboSeries: "Yoshi's Woolly World",                  gameSeries: "Yoshi",                 type: "Pack", release: { na: "2015-10-16" }, image: "assets/supplement/yarn-yoshi-pink.png" },
  { head: "f0010018", tail: "00000002", name: "Yarn Yoshi - Blue",                              character: "", amiiboSeries: "Yoshi's Woolly World",                  gameSeries: "Yoshi",                 type: "Pack", release: { na: "2015-10-16" }, image: "assets/supplement/yarn-yoshi-blue.png" },
  { head: "f0010019", tail: "00000002", name: "Yarn Yoshi - Green",                             character: "", amiiboSeries: "Yoshi's Woolly World",                  gameSeries: "Yoshi",                 type: "Pack", release: { na: "2015-10-16" }, image: "assets/supplement/yarn-yoshi-green.png" },
  { head: "f001001a", tail: "00000002", name: "Yarn Yoshi - Mega",                              character: "", amiiboSeries: "Yoshi's Woolly World",                  gameSeries: "Yoshi",                 type: "Pack", release: { na: "2015-11-15" }, image: "assets/supplement/yarn-yoshi-mega.png" },
];
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='18' fill='%23111514'/%3E%3Ccircle cx='120' cy='92' r='38' fill='%23313a35'/%3E%3Cpath d='M58 190c14-34 37-51 62-51s48 17 62 51' fill='%23313a35'/%3E%3C/svg%3E";
const GAME_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 560'%3E%3Crect width='420' height='560' rx='20' fill='%23111514'/%3E%3Crect x='46' y='56' width='328' height='448' rx='16' fill='%23181f1b' stroke='%233f8f46' stroke-width='6'/%3E%3Ccircle cx='210' cy='226' r='74' fill='%232f6f38'/%3E%3Cpath d='M144 332h132M160 372h100' stroke='%23d2a85d' stroke-width='18' stroke-linecap='round'/%3E%3C/svg%3E";
const BOTW_MAP_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/0/0a/BoTW_HyruleMap.jpg";
const TOTK_MAP_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/The_Legend_of_Zelda_Tears_of_the_Kingdom.svg/960px-The_Legend_of_Zelda_Tears_of_the_Kingdom.svg.png";
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/The_Legend_of_Zelda_Tears_of_the_Kingdom.svg/960px-The_Legend_of_Zelda_Tears_of_the_Kingdom.svg.png",
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
  viewMode: "list",
  amiibo: [],
  owned: new Set(),
  notes: {},
  gameProgress: {},
  selectedGameId: null,
  filters: {
    query: "",
    type: "",
    series: "",
    status: "all",
    sort: "name",
    hideCovered: true,
  },
};

const els = {
  navTabs: document.querySelectorAll("[data-view]"),
  viewPanels: document.querySelectorAll("[data-view-panel]"),
  headerActions: document.querySelector(".header-actions"),
  syncStatus: document.querySelector("#syncStatus"),
  lastUpdateLabel: document.querySelector("#lastUpdateLabel"),
  ownedCount: document.querySelector("#ownedCount"),
  missingCount: document.querySelector("#missingCount"),
  totalCount: document.querySelector("#totalCount"),
  progressCount: document.querySelector("#progressCount"),
  searchInput: document.querySelector("#searchInput"),
  typeFilter: document.querySelector("#typeFilter"),
  seriesFilter: document.querySelector("#seriesFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  statusButtons: document.querySelectorAll("[data-status]"),
  exportButton: document.querySelector("#exportButton"),
  resultTitle: document.querySelector("#resultTitle"),
  resultCount: document.querySelector("#resultCount"),
  grid: document.querySelector("#amiiboGrid"),
  amiiboList: document.querySelector("#amiiboList"),
  viewModeButtons: document.querySelectorAll("[data-view-mode]"),
  hideCoveredToggle: document.querySelector("#hideCoveredToggle"),
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

// ── Boîte d'emballage Nintendo CDN ────────────────────────────────────────
const CDN_BOX_BASE = "https://assets.nintendo.com/image/upload/f_jpg,q_auto,w_500/amiibo";

const CDN_SERIES_CONFIG = {
  "Super Mario Bros.":    { f: "Super%20Mario",               s: "super-mario" },
  "Super Smash Bros.":    { f: "Super%20Smash%20Bros.",        s: "super-smash-bros" },
  "Splatoon":             { f: "Splatoon",                     s: "splatoon" },
  "Animal Crossing":      { f: "Animal%20Crossing",            s: "animal-crossing" },
  "Kirby":                { f: "Kirby",                        s: "kirby" },
  "Metroid":              { f: "Metroid",                      s: "metroid" },
  "Fire Emblem":          { f: "Fire%20Emblem",                s: "fire-emblem" },
  "Shovel Knight":        { f: "Shovel%20Knight",              s: "shovel-knight" },
  "Xenoblade Chronicles": { f: "Xenoblade%20Chronicles%203",   s: "xenoblade-chronicles" },
  "Super Mario Odyssey":  { f: "Super%20Mario%20Odyssey",      s: "super-mario-odyssey" },
  "Monster Hunter":       { f: "Monster%20Hunter%20Rise",      s: "monster-hunter" },
  "Yoshi's Woolly World": { f: "Yoshi%27s%20Woolly%20World",   s: "yoshis-woolly-world" },
  "Pikmin":               { f: "Pikmin",                       s: "pikmin" },
  "Mega Man":             { f: "Mega%20Man",                   s: "mega-man" },
  "Dark Souls":           { f: "Dark%20Souls",                 s: "dark-souls" },
  "Diablo":               { f: "Diablo",                       s: "diablo-3" },
  "Chibi-Robo!":          { f: "Chibi-Robo",                   s: "chibi-robo" },
  "Street Fighter 6":     { f: "Street%20Fighter%206",         s: "street-fighter-6" },
};

function toBoxSlug(str) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getBoxImageUrl(name, amiiboSeries) {
  if (!name || !amiiboSeries) return null;
  const ns = toBoxSlug(name);

  // Cas spécial : Wolf Link (pas de suffixe de série dans l'URL CDN)
  if (ns === "wolf-link")
    return `${CDN_BOX_BASE}/The%20Legend%20of%20Zelda/Breath%20of%20the%20Wild/wolf-link-amiibo-box`;

  // The Legend of Zelda — sous-dossier selon le jeu
  if (amiiboSeries.startsWith("The Legend of Zelda")) {
    let folder = "The%20Legend%20of%20Zelda";
    if (amiiboSeries.includes("Breath of the Wild"))   folder += "/Breath%20of%20the%20Wild";
    else if (amiiboSeries.includes("Tears of the Kingdom")) folder += "/Tears%20of%20the%20Kingdom";
    else if (amiiboSeries.includes("Link's Awakening")) folder += "/Link%27s%20Awakening";
    return `${CDN_BOX_BASE}/${folder}/${ns}-amiibo-the-legend-of-zelda-series-box`;
  }

  // 30e anniversaire — dossier varie selon le personnage (Mario vs Zelda)
  if (amiiboSeries === "30th Anniversary") {
    if (/link|zelda|toon/i.test(name))
      return `${CDN_BOX_BASE}/The%20Legend%20of%20Zelda/${ns}-amiibo-30th-anniversary-series-box`;
    return `${CDN_BOX_BASE}/Super%20Mario%20Bros.%2030th%20Anniversary/30th-anniversary-${ns}-amiibo-30th-anniversary-series-box`;
  }

  // Séries standard
  const cfg = CDN_SERIES_CONFIG[amiiboSeries];
  if (!cfg) return null;
  return `${CDN_BOX_BASE}/${cfg.f}/${ns}-amiibo-${cfg.s}-series-box`;
}
// ─────────────────────────────────────────────────────────────────────────

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

function loadNotes() {
  try {
    const saved = JSON.parse(readStorage(NOTES_STORAGE_KEY) || "{}");
    state.notes = typeof saved === "object" && saved !== null ? saved : {};
  } catch {
    state.notes = {};
  }
}

function saveNotes() {
  writeStorage(NOTES_STORAGE_KEY, JSON.stringify(state.notes));
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
  const apiDate = getLastUpdateDate();
  const supplementEl = document.querySelector("#supplementDate");
  if (supplementEl) supplementEl.textContent = SUPPLEMENT_UPDATED;
  els.lastUpdateLabel.textContent = apiDate
    ? `Chargé le ${formatUpdateDate(apiDate)}`
    : "";
}

async function loadOnlineInventory() {
  const response = await fetch(`${AMIIBO_DATABASE_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const payload = await response.json();
  const items = getInventoryItems(normalizeAmiiboSource(payload))
    .map((i) => ({ ...i, boxImage: getBoxImageUrl(i.name, i.amiiboSeries) || undefined }));
  if (!items.length) throw new Error("Aucune figurine reçue");

  // Fusionner le supplément Nintendo — on n'ajoute que ce qui est absent de l'API
  // Clé: nom+série pour éviter de filtrer des figurines homonymes dans des séries différentes
  // (ex. "Samus" existe dans Super Smash Bros. ET Metroid Prime 4: Beyond)
  const apiKeys = new Set(items.map((i) => `${normalize(i.name)}|${normalize(i.amiiboSeries)}`));
  const supplementItems = NINTENDO_SUPPLEMENT
    .filter((i) => !apiKeys.has(`${normalize(i.name)}|${normalize(i.amiiboSeries)}`))
    .map((i) => ({
      ...i,
      type: i.type || "Figure",
      image: i.image || PLACEHOLDER_IMAGE,
      boxImage: i.boxImage || getBoxImageUrl(i.name, i.amiiboSeries) || undefined,
      sourceUrl: "https://www.nintendo.com/amiibo/line-up/",
    }));

  return [...items, ...supplementItems];
}

async function refreshDatabase() {
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

function buildCoveredSet() {
  // Retourne un Set de clés "nom|série" pour les figurines couvertes par un pack possédé.
  // On utilise nom+série (pas seulement le nom) pour éviter de masquer des figurines
  // homonymes d'une autre série (ex. "Samus" SSB ≠ "Samus" Metroid Dread).
  const covered = new Set();
  if (!state.filters.hideCovered) return covered;
  for (const pack of state.amiibo) {
    if (pack.type !== "Pack" || !state.owned.has(getId(pack)) || !Array.isArray(pack.includes)) continue;
    const packSeries = normalize(pack.amiiboSeries);
    for (const name of pack.includes) {
      const normName = normalize(name);
      // Préférer une figurine dont la série correspond à celle du pack
      const figure =
        state.amiibo.find((a) => a.type !== "Pack" && normalize(a.name) === normName && normalize(a.amiiboSeries) === packSeries) ||
        state.amiibo.find((a) => a.type !== "Pack" && normalize(a.name) === normName);
      if (figure) covered.add(`${normalize(figure.name)}|${normalize(figure.amiiboSeries)}`);
    }
  }
  return covered;
}

function getFilteredItems() {
  const query = normalize(state.filters.query);
  const covered = buildCoveredSet();

  const filtered = state.amiibo.filter((item) => {
    const id = getId(item);
    const owned = state.owned.has(id);

    if (state.filters.type && item.type !== state.filters.type) return false;
    if (state.filters.series && item.amiiboSeries !== state.filters.series) return false;
    const ownedViaPack = covered.has(`${normalize(item.name)}|${normalize(item.amiiboSeries)}`);
    // Masquer complètement les figurines couvertes par un pack (non possédées directement)
    if (state.filters.hideCovered && ownedViaPack && !owned) return false;
    const effectivelyOwned = owned || ownedViaPack;
    if (state.filters.status === "owned" && !effectivelyOwned) return false;
    if (state.filters.status === "missing" && effectivelyOwned) return false;

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
  const covered = buildCoveredSet();
  const owned = state.amiibo.filter((item) =>
    state.owned.has(getId(item)) || covered.has(`${normalize(item.name)}|${normalize(item.amiiboSeries)}`)
  ).length;
  const missing = Math.max(total - owned, 0);
  const progress = total ? Math.round((owned / total) * 100) : 0;

  els.ownedCount.textContent = owned.toLocaleString("fr-CA");
  els.missingCount.textContent = missing.toLocaleString("fr-CA");
  els.totalCount.textContent = total.toLocaleString("fr-CA");
  els.progressCount.textContent = `${progress}%`;
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

  if (item.boxImage) {
    const wrap = fragment.querySelector(".image-wrap");
    const btn = document.createElement("button");
    btn.className = "box-toggle";
    btn.title = "Voir l'emballage";
    btn.setAttribute("aria-label", "Basculer entre figurine et emballage");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const showingBox = btn.classList.toggle("is-box");
      wrap.classList.toggle("is-box-view", showingBox);
      if (showingBox) {
        image.src = item.boxImage;
        image.onerror = () => { image.onerror = null; image.src = item.image; btn.remove(); wrap.classList.remove("is-box-view"); };
        btn.title = "Voir la figurine";
      } else {
        image.src = item.image;
        image.onerror = () => { image.onerror = null; image.src = PLACEHOLDER_IMAGE; };
        btn.title = "Voir l'emballage";
      }
    });
    wrap.appendChild(btn);
  }

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

let _priceMap = null;
function getPriceMap() {
  if (_priceMap) return _priceMap;
  if (!window.AMIIBO_MARKET_VALUES) return (_priceMap = new Map());
  _priceMap = new Map();
  for (const item of window.AMIIBO_MARKET_VALUES.items) {
    const price = item.loose != null ? item.loose : item.new;
    if (price == null) continue;
    const key = normalize(item.title);
    if (!_priceMap.has(key)) _priceMap.set(key, price);
  }
  return _priceMap;
}

function lookupPrice(item) {
  const map = getPriceMap();
  const name = normalize(item.name);
  if (map.has(name)) return map.get(name);
  // Essai sans ponctuation spéciale: "Pyra & Mythra 2-Pack" → "pyra mythra 2 pack"
  const cleaned = name.replace(/[&()\[\]-]/g, " ").replace(/\s+/g, " ").trim();
  if (map.has(cleaned)) return map.get(cleaned);
  return null;
}

function formatPriceCAD(usdPrice) {
  if (usdPrice == null) return null;
  return `~${Math.round(usdPrice * USD_CAD_RATE)} $CA`;
}

function renderListRow(item) {
  const row = document.createElement("div");
  const id = getId(item);
  const owned = state.owned.has(id);

  row.className = "list-row";
  row.classList.toggle("is-owned", owned);

  const label = document.createElement("label");
  label.className = "list-owned-toggle";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = owned;
  checkbox.dataset.id = id;
  checkbox.setAttribute("aria-label", `Marquer ${item.name} comme possédé`);
  label.append(checkbox);

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.className = "list-row-img";
  img.width = 44;
  img.height = 44;
  img.loading = "lazy";
  img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER_IMAGE; };

  const imgWrap = document.createElement("div");
  imgWrap.className = "list-img-wrap";
  imgWrap.appendChild(img);
  if (item.boxImage) {
    const btn = document.createElement("button");
    btn.className = "box-toggle";
    btn.title = "Voir l'emballage";
    btn.setAttribute("aria-label", "Basculer entre figurine et emballage");
    btn.addEventListener("click", () => {
      const showingBox = btn.classList.toggle("is-box");
      imgWrap.classList.toggle("is-box-view", showingBox);
      if (showingBox) {
        img.src = item.boxImage;
        img.onerror = () => { img.onerror = null; img.src = item.image; btn.remove(); imgWrap.classList.remove("is-box-view"); };
        btn.title = "Voir la figurine";
      } else {
        img.src = item.image;
        img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER_IMAGE; };
        btn.title = "Voir l'emballage";
      }
    });
    imgWrap.appendChild(btn);
  }

  const info = document.createElement("div");
  info.className = "list-row-info";
  const name = document.createElement("span");
  name.className = "list-row-name";
  name.textContent = item.name || "Amiibo sans nom";
  const series = document.createElement("span");
  series.className = "list-row-series";
  series.textContent = item.amiiboSeries || "";
  const noteId = getId(item);
  const noteInput = document.createElement("input");
  noteInput.type = "text";
  noteInput.className = "list-row-note";
  noteInput.placeholder = "Note personnelle...";
  noteInput.value = state.notes[noteId] || "";
  noteInput.dataset.noteId = noteId;
  info.append(name, series, noteInput);

  const date = document.createElement("span");
  date.className = "list-row-date";
  date.textContent = item.release?.na || "—";

  row.append(label, imgWrap, info, date);
  return row;
}

function render() {
  const items = getFilteredItems();
  const useList = state.viewMode === "list";

  els.grid.hidden = useList;
  els.amiiboList.hidden = !useList;

  if (useList) {
    els.amiiboList.replaceChildren(...items.map(renderListRow));
  } else {
    els.grid.replaceChildren(...items.map(renderCard));
  }

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

  els.viewModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.viewMode = button.dataset.viewMode;
      els.viewModeButtons.forEach((b) => b.classList.toggle("is-active", b === button));
      render();
    });
  });

  els.amiiboList.addEventListener("change", (event) => {
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

  els.amiiboList.addEventListener("input", (event) => {
    const input = event.target.closest(".list-row-note");
    if (!input) return;
    const id = input.dataset.noteId;
    if (!id) return;
    if (input.value.trim()) {
      state.notes[id] = input.value;
    } else {
      delete state.notes[id];
    }
    saveNotes();
  });

  els.exportButton.addEventListener("click", exportCsv);

  if (els.hideCoveredToggle) {
    els.hideCoveredToggle.addEventListener("change", () => {
      state.filters.hideCovered = els.hideCoveredToggle.checked;
      render();
    });
  }
}

loadOwned();
loadNotes();
loadGameProgress();
updateLastUpdateLabel();
bindEvents();
renderGameLibrary();
setActiveView("amiibo");
refreshDatabase();
