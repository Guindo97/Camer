# 🎥 Guide d'Ajout de Médias - Association Culturelle Tikar

## 📁 **Structure des Dossiers**

Créez ces dossiers dans votre projet :

```
public/
├── media/
│   ├── videos/
│   │   ├── lessons/
│   │   │   ├── introduction-tikar.mp4
│   │   │   ├── prononciation-sons.mp4
│   │   │   └── conversation-base.mp4
│   │   └── events/
│   │       ├── festival-danse-2024.mp4
│   │       └── cours-langue.mp4
│   ├── audio/
│   │   ├── pronunciation/
│   │   │   ├── salutations.mp3
│   │   │   ├── politesse.mp3
│   │   │   ├── famille.mp3
│   │   │   └── nature.mp3
│   │   └── music/
│   │       ├── chants-traditionnels.mp3
│   │       └── instruments.mp3
│   └── images/
│       ├── photos/
│       │   ├── peuple-tikar/
│       │   ├── bankim/
│       │   └── events/
│       └── thumbnails/
```

## 🎬 **Vidéos de Leçons**

### **Formats Recommandés :**
- **Format** : MP4 (H.264)
- **Résolution** : 1280x720 (HD) ou 1920x1080 (Full HD)
- **Durée** : 10-30 minutes par leçon
- **Taille** : < 100MB par vidéo

### **Contenu des Leçons :**

#### **1. Introduction à la langue Tikar**
- Présentation de la langue
- Histoire et contexte culturel
- Alphabet et sons de base
- **Durée recommandée** : 15-20 minutes

#### **2. Prononciation des sons Tikar**
- Sons spécifiques de la langue
- Exercices de prononciation
- Comparaisons avec le français
- **Durée recommandée** : 20-25 minutes

#### **3. Conversation de base**
- Salutations et politesse
- Expressions courantes
- Dialogues simples
- **Durée recommandée** : 25-30 minutes

### **Comment Ajouter vos Vidéos :**

1. **Placez vos fichiers** dans `public/media/videos/lessons/`
2. **Modifiez** `src/components/VideoLesson.jsx` :

```javascript
const exampleVideos = {
  'Introduction à la langue Tikar': '/media/videos/lessons/introduction-tikar.mp4',
  'Prononciation des sons Tikar': '/media/videos/lessons/prononciation-sons.mp4',
  'Conversation de base': '/media/videos/lessons/conversation-base.mp4'
}
```

## 🔊 **Fichiers Audio**

### **Formats Recommandés :**
- **Format** : MP3 ou WAV
- **Qualité** : 44.1kHz, 16-bit minimum
- **Durée** : 2-5 secondes par mot
- **Taille** : < 1MB par fichier

### **Contenu Audio :**

#### **Prononciations par Catégorie :**

1. **Salutations** (`salutations.mp3`)
   - "Mbèn" (Bonjour)
   - "Nde" (Bonsoir)
   - "Nkum" (Au revoir)

2. **Politesse** (`politesse.mp3`)
   - "Nde" (Merci)
   - "Mba" (S'il vous plaît)
   - "Nkeng" (Excusez-moi)

3. **Famille** (`famille.mp3`)
   - "Nkum" (Famille)
   - "Ntum" (Ami)
   - "Mba" (Enfant)

4. **Nature** (`nature.mp3`)
   - "Mba" (Eau)
   - "Ntum" (Terre)
   - "Nkum" (Arbre)

### **Comment Ajouter vos Audios :**

1. **Placez vos fichiers** dans `public/media/audio/pronunciation/`
2. **Modifiez** `src/components/AudioPlayer.jsx` :

```javascript
const exampleAudios = {
  'Salutations': '/media/audio/pronunciation/salutations.mp3',
  'Politesse': '/media/audio/pronunciation/politesse.mp3',
  'Famille': '/media/audio/pronunciation/famille.mp3',
  'Nature': '/media/audio/pronunciation/nature.mp3'
}
```

## 📸 **Images et Photos**

### **Photos du Peuple Tikar :**
- **Résolution** : 1920x1080 minimum
- **Format** : JPG ou PNG
- **Contenu** : Portraits, cérémonies, vie quotidienne

### **Photos d'Événements :**
- **Festivals** : Danses, musiques, cérémonies
- **Cours** : Séances d'apprentissage
- **Rencontres** : Rassemblements communautaires

### **Comment Ajouter vos Images :**

1. **Placez vos fichiers** dans `public/media/images/`
2. **Modifiez** `src/sections/Galerie.jsx` :

```javascript
const events = [
  { 
    title: 'Festival de danse traditionnelle', 
    image: '/media/images/events/festival-danse.jpg',
    // ...
  }
]
```

## 🛠️ **Outils Recommandés**

### **Pour les Vidéos :**
- **Enregistrement** : OBS Studio (gratuit)
- **Montage** : DaVinci Resolve (gratuit) ou Adobe Premiere
- **Compression** : HandBrake (gratuit)

### **Pour l'Audio :**
- **Enregistrement** : Audacity (gratuit)
- **Montage** : Audacity ou Adobe Audition
- **Conversion** : FFmpeg

### **Pour les Images :**
- **Retouche** : GIMP (gratuit) ou Photoshop
- **Compression** : TinyPNG ou ImageOptim

## 📱 **Optimisation Mobile**

### **Vidéos :**
- **Format** : MP4 avec H.264
- **Résolution** : 720p pour mobile
- **Bitrate** : 1-2 Mbps

### **Audio :**
- **Format** : MP3, 128 kbps
- **Durée** : < 10 secondes par fichier

### **Images :**
- **Format** : WebP (moderne) ou JPG
- **Taille** : < 500KB par image
- **Responsive** : Plusieurs tailles (mobile, tablette, desktop)

## 🚀 **Déploiement**

### **Hébergement des Médias :**

#### **Option 1 : Serveur Local**
- Placez les fichiers dans `public/media/`
- URLs : `/media/videos/...`

#### **Option 2 : CDN (Recommandé)**
- **Cloudinary** : Gestion d'images et vidéos
- **AWS S3** : Stockage scalable
- **YouTube** : Pour les vidéos longues

#### **Option 3 : Services Spécialisés**
- **Vimeo** : Pour les vidéos éducatives
- **SoundCloud** : Pour les fichiers audio
- **Imgur** : Pour les images

## 📋 **Checklist de Validation**

### **Vidéos :**
- [ ] Format MP4 compatible
- [ ] Résolution HD (720p+)
- [ ] Durée appropriée (10-30 min)
- [ ] Son clair et audible
- [ ] Sous-titres si nécessaire

### **Audio :**
- [ ] Format MP3 ou WAV
- [ ] Prononciation claire
- [ ] Durée courte (2-5 sec)
- [ ] Volume normalisé
- [ ] Qualité 44.1kHz

### **Images :**
- [ ] Résolution suffisante
- [ ] Format optimisé (JPG/WebP)
- [ ] Taille de fichier < 500KB
- [ ] Couleurs et contraste corrects
- [ ] Droits d'utilisation vérifiés

## 🎯 **Prochaines Étapes**

1. **Enregistrez** vos leçons vidéo Tikar
2. **Créez** les fichiers audio de prononciation
3. **Collectez** les photos d'événements
4. **Organisez** les fichiers dans la structure recommandée
5. **Testez** la lecture sur différents appareils
6. **Optimisez** pour le web (compression, formats)

---

**💡 Conseil :** Commencez par quelques vidéos et audios de base, puis enrichissez progressivement votre bibliothèque multimédia !
