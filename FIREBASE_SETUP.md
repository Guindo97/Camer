# Configuration Firebase pour le Dictionnaire Tikar

## Étapes de configuration

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet (ex: "association-tikar-dictionary")
4. Activez Google Analytics (optionnel)

### 2. Activer Firestore Database

1. Dans votre projet Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Mode test" pour commencer
4. Sélectionnez une région (ex: europe-west1)

### 3. Obtenir les clés de configuration

1. Allez dans "Paramètres du projet" (icône d'engrenage)
2. Faites défiler vers le bas jusqu'à "Vos applications"
3. Cliquez sur l'icône Web (</>) pour ajouter une application web
4. Nommez votre application (ex: "tikar-dictionary")
5. Copiez les clés de configuration

### 4. Mettre à jour la configuration

Remplacez les valeurs dans `src/firebase/config.js` :

```javascript
const firebaseConfig = {
  apiKey: "votre-vraie-api-key",
  authDomain: "votre-projet-id.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet-id.appspot.com",
  messagingSenderId: "votre-sender-id",
  appId: "votre-app-id"
}
```

### 5. Règles de sécurité Firestore

Dans l'onglet "Règles" de Firestore, remplacez les règles par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture et l'écriture pour tous (à modifier en production)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 6. Collections Firestore

Le dictionnaire utilisera deux collections :

- `tikar_dictionary` : Contient tous les mots du dictionnaire
- `word_of_day` : Contient les mots du jour avec leurs dates

### 7. Structure des données

#### Collection `tikar_dictionary` :
```json
{
  "tikar": "Mbèn",
  "french": "Bonjour, salut",
  "pronunciation": "mben",
  "category": "Salutations",
  "example": "Mbèn, comment allez-vous ?",
  "difficulty": "Débutant",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "isActive": true
}
```

#### Collection `word_of_day` :
```json
{
  "wordId": "id-du-mot",
  "word": { /* objet du mot complet */ },
  "date": "2024-01-01",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Fonctionnalités du dictionnaire

### ✅ Fonctionnalités implémentées :

1. **Mot du jour automatique** : Rotation quotidienne des mots
2. **Recherche en temps réel** : Par mot Tikar ou français
3. **Filtrage par catégorie** : Salutations, Nature, Culture, etc.
4. **Ajout de nouveaux mots** : Interface d'administration
5. **Initialisation automatique** : Mots de base pré-chargés
6. **Interface responsive** : Compatible mobile et desktop

### 🎯 Utilisation :

1. **Première utilisation** : Cliquez sur "Initialiser le dictionnaire" pour charger les mots de base
2. **Ajouter des mots** : Utilisez le formulaire "Ajouter un mot"
3. **Rechercher** : Tapez dans la barre de recherche
4. **Filtrer** : Utilisez le menu déroulant des catégories

### 🔧 Personnalisation :

- Modifiez les catégories dans `src/components/Dictionary.jsx`
- Ajoutez des niveaux de difficulté
- Personnalisez les mots d'initialisation dans `src/services/dictionaryService.js`

## Sécurité en production

Pour un déploiement en production, modifiez les règles Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lecture publique, écriture authentifiée
    match /tikar_dictionary/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /word_of_day/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Support

Pour toute question sur la configuration Firebase, consultez la [documentation officielle](https://firebase.google.com/docs).
