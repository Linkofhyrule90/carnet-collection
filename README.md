# Carnet de collection retro

Application personnelle pour suivre une collection de figurines amiibo et consulter des guides/cartes de jeux video.

## Utilisation

Ouvrir `index.html` dans un navigateur moderne.

L'onglet `Amiibo` charge la liste en direct depuis la base publique AmiiboAPI maintenue sur GitHub:

`https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/database/amiibo.json`

Le bouton `Actualiser Amiibo` relit cette source en ligne. Il n'y a plus de fichier local utilise comme base principale pour les amiibo.

L'onglet `Trucs & astuces` affiche des ressources en ligne configurees dans l'application. Pour commencer, il contient une fiche pour `The Legend of Zelda: Breath of the Wild` avec des cartes pour les noix Korogu et les sanctuaires.

## Fonctionnement

- La liste des figurines vient du web a chaque chargement de l'application.
- Les images sont chargees depuis le depot public AmiiboAPI.
- L'application filtre seulement les entrees de type `Figure`.
- Ta collection cochee est sauvegardee dans le navigateur avec `localStorage`.
- Les guides de jeux ne sont pas saisis manuellement: ils sont definis comme ressources web dans `app.js`.
- Les notes personnelles et les statuts de progression des jeux sont sauvegardes dans le navigateur avec `localStorage`.
- La date affichee correspond a la derniere fois ou ton navigateur a reussi a relire la source en ligne.
- Si la source en ligne n'est pas joignable, l'application affiche une erreur au lieu d'utiliser une vieille base cachee.

## Fonctionnalites

- inventaire de figurines amiibo;
- recherche par nom, personnage, serie ou type;
- filtres par type, serie amiibo et statut;
- tri par nom, serie, serie de jeu ou date de sortie nord-americaine;
- sauvegarde locale des figurines possedees;
- liste manuelle de figurines en attente quand l'API n'est pas encore a jour;
- export CSV de l'inventaire;
- barre de menus tout en haut avec un onglet `Amiibo` et un onglet `Trucs & astuces`;
- bibliotheque de jeux avec cartes de jeux;
- coches `Complete` et `100%` sur les cartes de jeux;
- notes personnelles par jeu;
- fiche Breath of the Wild avec liens vers des cartes en ligne des noix Korogu et des sanctuaires.

## Donnees sauvegardees

L'application n'utilise pas de vraie base de donnees serveur pour l'instant. Elle garde tes donnees dans le navigateur:

- `amiibo-inventory-v1`: amiibo coches comme possedes;
- `amiibo-pending-v1`: figurines amiibo en attente;
- `amiibo-live-last-update-v1`: derniere mise a jour reussie de la source AmiiboAPI;
- `game-guide-progress-v1`: progression et notes personnelles des jeux dans `Trucs & astuces`.

Important: ces donnees restent dans le navigateur et sur l'appareil utilise. Les ressources de guides, elles, viennent du web; seules tes notes et tes coches sont stockees localement.

## Trucs et astuces

La section `Trucs & astuces` n'utilise plus de formulaire manuel. Elle affiche des fiches de jeux et des cartes provenant de sources publiques:

- Zelda Dungeon Interactive Map pour la carte interactive de Breath of the Wild;
- Game8 pour les pages detaillees des noix Korogu et des sanctuaires;
- Wikimedia Commons pour l'image de carte et le logo utilises dans l'interface.

Il n'existe pas, a ma connaissance, d'API publique simple qui donne directement toutes les astuces, soluces et cartes de ces jeux avec images, filtres et donnees pretes a integrer dans une application statique. Pour l'instant, l'application pointe donc vers des ressources web en ligne fiables plutot que de copier une base locale.

## Packs

La source AmiiboAPI liste surtout les amiibo individuels. Les packs commerciaux, comme les 2-pack ou 3-pack, ne sont pas disponibles de facon fiable dans cette API.

PriceCharting contient des pages de packs, mais ce site ne fournit pas une API publique gratuite simple a appeler directement depuis une application statique. Pour respecter l'objectif d'une base vraiment en ligne et mise a jour par bouton, les packs ne sont pas integres comme base locale pour l'instant.

Une prochaine etape possible serait d'ajouter un petit serveur ou une source en ligne dediee aux packs. A ce moment-la, le bouton `Actualiser la base` pourrait charger les figurines depuis AmiiboAPI et les packs depuis cette deuxieme source.

## Prix

Les prix de marche ont ete retires de cette version pour revenir a un inventaire propre et fiable. Ils pourront etre ajoutes plus tard si on trouve une source en ligne stable, accessible automatiquement, et compatible avec ton objectif de mise a jour simple.

## Figurines en attente

La section `Figurines en attente` sert a noter les amiibo annonces ou connus qui ne sont pas encore dans la source AmiiboAPI. Ces noms sont sauvegardes dans ton navigateur, comme ta collection cochee, et ils sont inclus dans l'export CSV avec le statut `en attente`.
