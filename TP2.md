#Lead Tech TP2
##I. Convention de coding
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
