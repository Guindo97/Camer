# 🎤 Guide Complet : Ajouter de Vrais Fichiers Audio Tikar

## 🎯 **Objectif**

Remplacer les sons de démonstration par de **vraies prononciations Tikar** enregistrées par des locuteurs natifs.

## 📁 **Structure des Dossiers**

```
public/
└── media/
    └── audio/
        └── pronunciation/
            ├── salutations/
            │   ├── mben.mp3      (Bonjour, salut)
            │   ├── nde.mp3       (Bonsoir)
            │   ├── nkum.mp3      (Au revoir)
            │   ├── mba.mp3       (Bonne nuit)
            │   ├── ntum.mp3      (Bonne journée)
            │   └── nkeng.mp3     (Comment allez-vous ?)
            ├── politesse/
            │   ├── nde.mp3       (Merci)
            │   ├── mba.mp3       (S'il vous plaît)
            │   ├── nkeng.mp3     (Excusez-moi)
            │   ├── ntum.mp3      (Pardon)
            │   └── nkum.mp3      (Désolé)
            ├── nature/
            │   ├── mba.mp3       (Eau)
            │   ├── ntum.mp3      (Terre)
            │   ├── nkum.mp3      (Arbre)
            │   └── nkeng.mp3     (Feu)
            └── relations/
                ├── nkum.mp3      (Famille)
                ├── ntum.mp3      (Ami)
                ├── mba.mp3        (Enfant)
                └── nkeng.mp3     (Père)
```

## 🎙️ **Étapes d'Enregistrement**

### **1. Préparation**

#### **Matériel Nécessaire :**
- **Microphone** de qualité (même celui du téléphone)
- **Logiciel** : Audacity (gratuit) ou GarageBand
- **Environnement** calme et sans écho

#### **Paramètres d'Enregistrement :**
- **Format** : MP3
- **Qualité** : 128 kbps minimum
- **Fréquence** : 44.1 kHz
- **Durée** : 2-3 secondes par mot
- **Volume** : Normalisé, pas trop fort

### **2. Enregistrement**

#### **Pour chaque mot :**
1. **Prononcez** le mot Tikar clairement
2. **Laissez** 1-2 secondes de silence avant et après
3. **Répétez** 2-3 fois pour avoir le meilleur enregistrement
4. **Écoutez** le résultat avant de finaliser

#### **Conseils de Prononciation :**
- **Parlez lentement** et distinctement
- **Articulez** bien chaque son
- **Utilisez** l'intonation naturelle
- **Évitez** les bruits de fond

### **3. Post-Traitement**

#### **Avec Audacity (Gratuit) :**
1. **Ouvrez** le fichier audio
2. **Normalisez** le volume (Effet → Normaliser)
3. **Supprimez** les silences en début/fin
4. **Exportez** en MP3 (Fichier → Exporter)

#### **Avec GarageBand (Mac) :**
1. **Importez** l'enregistrement
2. **Ajustez** le volume
3. **Exportez** en MP3

### **4. Nommage et Placement**

#### **Nommage des Fichiers :**
- **Format** : `mot.mp3` (en minuscules)
- **Exemples** :
  - `mben.mp3` pour "Mbèn"
  - `nde.mp3` pour "Nde"
  - `nkum.mp3` pour "Nkum"

#### **Placement dans les Dossiers :**
- **Salutations** → `public/media/audio/pronunciation/salutations/`
- **Politesse** → `public/media/audio/pronunciation/politesse/`
- **Nature** → `public/media/audio/pronunciation/nature/`
- **Relations** → `public/media/audio/pronunciation/relations/`

## 🔧 **Création des Dossiers**

### **Sur Windows :**
```cmd
mkdir public\media\audio\pronunciation\salutations
mkdir public\media\audio\pronunciation\politesse
mkdir public\media\audio\pronunciation\nature
mkdir public\media\audio\pronunciation\relations
```

### **Sur Mac/Linux :**
```bash
mkdir -p public/media/audio/pronunciation/salutations
mkdir -p public/media/audio/pronunciation/politesse
mkdir -p public/media/audio/pronunciation/nature
mkdir -p public/media/audio/pronunciation/relations
```

## 📝 **Liste des Fichiers à Créer**

### **Salutations (6 fichiers) :**
- `mben.mp3` - "Mbèn" (Bonjour, salut)
- `nde.mp3` - "Nde" (Bonsoir)
- `nkum.mp3` - "Nkum" (Au revoir)
- `mba.mp3` - "Mba" (Bonne nuit)
- `ntum.mp3` - "Ntum" (Bonne journée)
- `nkeng.mp3` - "Nkeng" (Comment allez-vous ?)

### **Politesse (5 fichiers) :**
- `nde.mp3` - "Nde" (Merci)
- `mba.mp3` - "Mba" (S'il vous plaît)
- `nkeng.mp3` - "Nkeng" (Excusez-moi)
- `ntum.mp3` - "Ntum" (Pardon)
- `nkum.mp3` - "Nkum" (Désolé)

### **Nature (4 fichiers) :**
- `mba.mp3` - "Mba" (Eau)
- `ntum.mp3` - "Ntum" (Terre)
- `nkum.mp3` - "Nkum" (Arbre)
- `nkeng.mp3` - "Nkeng" (Feu)

### **Relations (4 fichiers) :**
- `nkum.mp3` - "Nkum" (Famille)
- `ntum.mp3` - "Ntum" (Ami)
- `mba.mp3` - "Mba" (Enfant)
- `nkeng.mp3` - "Nkeng" (Père)

## 🎯 **Test et Validation**

### **1. Vérification des Fichiers :**
1. **Rechargez** la page du site
2. **Allez** dans "Langue et culture" → "Prononciation audio"
3. **Vérifiez** que les boutons verts 🎤 apparaissent
4. **Testez** la lecture de chaque mot

### **2. Dépannage :**
- **Fichier non trouvé** : Vérifiez le nom et l'emplacement
- **Son déformé** : Vérifiez la qualité d'enregistrement
- **Volume trop faible/fort** : Normalisez le fichier
- **Bruit de fond** : Réenregistrez dans un endroit plus calme

## 🚀 **Améliorations Futures**

### **Phase 1 : Fichiers de Base**
- Enregistrer les 19 mots essentiels
- Tester la qualité audio
- Valider la prononciation

### **Phase 2 : Expansion**
- Ajouter plus de mots Tikar
- Enregistrer des phrases complètes
- Créer des variations de prononciation

### **Phase 3 : Avancé**
- Intégrer des enregistrements de différents locuteurs
- Ajouter des variations régionales
- Créer des exercices de prononciation

## 📱 **Outils Recommandés**

### **Gratuits :**
- **Audacity** (Windows/Mac/Linux)
- **GarageBand** (Mac)
- **OBS Studio** (avec vidéo)

### **Payants :**
- **Adobe Audition**
- **Logic Pro** (Mac)
- **Pro Tools**

### **Services en Ligne :**
- **Google Text-to-Speech**
- **Amazon Polly**
- **Microsoft Azure Speech**

## 🎉 **Résultat Final**

Une fois tous les fichiers ajoutés, vous aurez :
- ✅ **Vraies prononciations** Tikar
- ✅ **Qualité audio** professionnelle
- ✅ **Expérience utilisateur** authentique
- ✅ **Apprentissage** efficace de la langue

---

**🎤 Commencez par enregistrer quelques mots de base, puis enrichissez progressivement votre bibliothèque audio !**

**💡 Conseil :** Demandez l'aide de locuteurs natifs Tikar pour les meilleures prononciations !
