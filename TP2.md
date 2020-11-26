# Lead Tech TP2
## I. Convention de coding

Améliorations des conventions de code :
*   Si le contexte est suffisamment précis le nom des fichiers doivent rester simple.

    exemple : 
    - ❌ src/network/user/NtwUserAddress.php
    - ✅ src/network/user/Address.php
*   Limiter au maximum les annotations sur un projet Symfony. Car les annotations sont peu lisibles dans les éditeurs de code vu qu'elles sont considérées comme des commentaires. Il est possible de passer par des fichiers ```.yml``` dans certain cas. 
*   Ne pas mettre des valeurs numériques sans passer par des constantes
    
    exemple :
    ```
    // ❌
    if (result > 100) { ... }
    
    // ✅
    const MAX_RESULT = 100;
    if (result > MAX_RESULT) { ... }
    ```
*   Ne pas faire de suppositions mais des affirmations.
    ```
    // ❌ On suppose que l'utilisateur ne sera pas null
    if ($user !== null) {
        $user->logout();
    }
    
    // ✅ On est sûr que c'est un utilisateur
    if ($user instanceof User) {
        $user->logout();
    }
    ```
    
*   Annoter les fonctions avec la ou les valeur(s) attendues et ce qui est renvoyé afin de pouvoir générer une documentation.

## II. Choix d'infrastructure
### a) Schéma d'infrastructure
![Infrastructure](https://res.cloudinary.com/dcqc12ai5/image/upload/v1606400355/infra.png)

Coût de l'infrastructure sur AWS : 1200 € / mois
### b) Améliorations

* Pour l'instant les projets _pilote_ et _account_ sont dans une seule et même machine à l'avenir ils auront besoin d'une machine dédiée pour des soucis de scalabilité.
* Passer d'une infrastructure monolithique à une infrastructure micro-service. Cela permettra d'isoler les différents processus et de tout passer en API. (🚧 en cours)
* Utiliser un framework front (ex: VueJs) car en APIsant nos services on pourra remplacer le site front vieillissant et les différents outils clients par une infrastructure front plus moderne qui consommera les APIs.
* Se débarrasser de FMP (File Maker Pro) créer un outil pour le remplacer.
* Créer un environnement spécifique pour les intégrateurs et graphistes avec un workflow simplifié avec la possibilité de :
    * mettre en production pour tester leur UI/UX auprès d'utilisateur.
    * générer une librairie de composants afin de créer un design system.

### c) Service

* 4 développeurs dont un lead développeur (environ 2.000 € et 3.000 € pour le lead dev)
* 1 scrum master (2.000 €)
* 1 administrateur réseau (2.000 €)

### NoSQL
On pourrait avoir besoin d'une base de donnée NoSQL pour stocker les images sous forme de blob.
