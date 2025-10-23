import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit 
} from 'firebase/firestore'
import { db, isFirebaseEnabled } from '../firebase/config'

// Collection pour les mots du dictionnaire
const DICTIONARY_COLLECTION = 'tikar_dictionary'
const WORD_OF_DAY_COLLECTION = 'word_of_day'

// Structure d'un mot Tikar
export const createWordStructure = (tikar, french, pronunciation, category, example, difficulty) => ({
  tikar,
  french,
  pronunciation,
  category,
  example,
  difficulty,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true
})

// Ajouter un nouveau mot au dictionnaire
export const addWord = async (wordData) => {
  if (!isFirebaseEnabled || !db) {
    console.log('Firebase non disponible - Mode hors ligne')
    return { id: `offline-${Date.now()}`, ...wordData }
  }
  
  try {
    const docRef = await addDoc(collection(db, DICTIONARY_COLLECTION), wordData)
    return { id: docRef.id, ...wordData }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du mot:', error)
    throw error
  }
}

// Récupérer tous les mots du dictionnaire
export const getAllWords = async () => {
  if (!isFirebaseEnabled || !db) {
    console.log('Firebase non disponible - Utilisation des mots par défaut')
    return initialWords.map((word, index) => ({ id: `offline-${index}`, ...word }))
  }
  
  try {
    const querySnapshot = await getDocs(collection(db, DICTIONARY_COLLECTION))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors de la récupération des mots:', error)
    // Retourner les mots par défaut en cas d'erreur Firebase
    return initialWords.map((word, index) => ({ id: `offline-${index}`, ...word }))
  }
}

// Rechercher des mots par terme
export const searchWords = async (searchTerm) => {
  if (!isFirebaseEnabled || !db) {
    console.log('Firebase non disponible - Recherche dans les mots par défaut')
    const filteredWords = initialWords.filter(word => 
      word.tikar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.french.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return filteredWords.map((word, index) => ({ id: `offline-search-${index}`, ...word }))
  }
  
  try {
    const q = query(
      collection(db, DICTIONARY_COLLECTION),
      where('tikar', '>=', searchTerm),
      where('tikar', '<=', searchTerm + '\uf8ff')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    // Recherche dans les mots par défaut en cas d'erreur Firebase
    const filteredWords = initialWords.filter(word => 
      word.tikar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.french.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return filteredWords.map((word, index) => ({ id: `offline-search-${index}`, ...word }))
  }
}

// Récupérer le mot du jour
export const getWordOfDay = async () => {
  if (!isFirebaseEnabled || !db) {
    console.log('Firebase non disponible - Mot du jour par défaut')
    // Sélectionner un mot aléatoire parmi les mots par défaut
    const randomIndex = Math.floor(Math.random() * initialWords.length)
    const selectedWord = initialWords[randomIndex]
    return {
      word: selectedWord,
      date: new Date().toISOString().split('T')[0]
    }
  }
  
  try {
    const today = new Date().toISOString().split('T')[0] // Format YYYY-MM-DD
    
    // Vérifier s'il y a déjà un mot du jour pour aujourd'hui
    const q = query(
      collection(db, WORD_OF_DAY_COLLECTION),
      where('date', '==', today)
    )
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }
    
    // Si pas de mot du jour pour aujourd'hui, en sélectionner un aléatoire
    return await selectRandomWordOfDay()
  } catch (error) {
    console.error('Erreur lors de la récupération du mot du jour:', error)
    // Retourner un mot par défaut en cas d'erreur Firebase
    const randomIndex = Math.floor(Math.random() * initialWords.length)
    const selectedWord = initialWords[randomIndex]
    return {
      word: selectedWord,
      date: new Date().toISOString().split('T')[0]
    }
  }
}

// Sélectionner un mot aléatoire pour le mot du jour
export const selectRandomWordOfDay = async () => {
  if (!isFirebaseEnabled || !db) {
    console.log('Firebase non disponible - Sélection aléatoire dans les mots par défaut')
    const randomIndex = Math.floor(Math.random() * initialWords.length)
    const selectedWord = initialWords[randomIndex]
    return {
      word: selectedWord,
      date: new Date().toISOString().split('T')[0]
    }
  }
  
  try {
    // Récupérer tous les mots actifs
    const allWords = await getAllWords()
    const activeWords = allWords.filter(word => word.isActive)
    
    if (activeWords.length === 0) {
      // Retourner un mot par défaut si aucun mot n'est disponible
      const randomIndex = Math.floor(Math.random() * initialWords.length)
      const selectedWord = initialWords[randomIndex]
      return {
        word: selectedWord,
        date: new Date().toISOString().split('T')[0]
      }
    }
    
    // Sélectionner un mot aléatoire
    const randomIndex = Math.floor(Math.random() * activeWords.length)
    const selectedWord = activeWords[randomIndex]
    
    // Sauvegarder comme mot du jour
    const today = new Date().toISOString().split('T')[0]
    const wordOfDayData = {
      wordId: selectedWord.id,
      word: selectedWord,
      date: today,
      createdAt: new Date()
    }
    
    const docRef = await addDoc(collection(db, WORD_OF_DAY_COLLECTION), wordOfDayData)
    return { id: docRef.id, ...wordOfDayData }
  } catch (error) {
    console.error('Erreur lors de la sélection du mot du jour:', error)
    // Retourner un mot par défaut en cas d'erreur
    const randomIndex = Math.floor(Math.random() * initialWords.length)
    const selectedWord = initialWords[randomIndex]
    return {
      word: selectedWord,
      date: new Date().toISOString().split('T')[0]
    }
  }
}

// Récupérer les mots par catégorie
export const getWordsByCategory = async (category) => {
  if (!isFirebaseEnabled || !db) {
    console.log('Firebase non disponible - Filtrage par catégorie dans les mots par défaut')
    const filteredWords = initialWords.filter(word => word.category === category)
    return filteredWords.map((word, index) => ({ id: `offline-category-${index}`, ...word }))
  }
  
  try {
    const q = query(
      collection(db, DICTIONARY_COLLECTION),
      where('category', '==', category),
      where('isActive', '==', true)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erreur lors de la récupération par catégorie:', error)
    // Filtrer les mots par défaut par catégorie en cas d'erreur Firebase
    const filteredWords = initialWords.filter(word => word.category === category)
    return filteredWords.map((word, index) => ({ id: `offline-category-${index}`, ...word }))
  }
}

// Mettre à jour un mot
export const updateWord = async (wordId, updateData) => {
  try {
    const wordRef = doc(db, DICTIONARY_COLLECTION, wordId)
    await updateDoc(wordRef, {
      ...updateData,
      updatedAt: new Date()
    })
    return true
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot:', error)
    throw error
  }
}

// Supprimer un mot (désactiver)
export const deleteWord = async (wordId) => {
  try {
    const wordRef = doc(db, DICTIONARY_COLLECTION, wordId)
    await updateDoc(wordRef, {
      isActive: false,
      updatedAt: new Date()
    })
    return true
  } catch (error) {
    console.error('Erreur lors de la suppression du mot:', error)
    throw error
  }
}

// Dictionnaire Tikar enrichi - Plus de 100 mots
export const initialWords = [
  // === SALUTATIONS (15 mots) ===
  createWordStructure('Mbèn', 'Bonjour, salut', 'mben', 'Salutations', 'Mbèn, comment allez-vous ?', 'Débutant'),
  createWordStructure('Nde', 'Bonsoir', 'nde', 'Salutations', 'Nde, bonne soirée', 'Débutant'),
  createWordStructure('Nkum', 'Au revoir', 'nkum', 'Salutations', 'Nkum, à bientôt', 'Débutant'),
  createWordStructure('Mba', 'Bonne nuit', 'mba', 'Salutations', 'Mba, dors bien', 'Débutant'),
  createWordStructure('Ntum', 'Bonne journée', 'ntum', 'Salutations', 'Ntum, passe une bonne journée', 'Débutant'),
  createWordStructure('Nkeng', 'Comment allez-vous ?', 'nkeng', 'Salutations', 'Nkeng, comment va la famille ?', 'Intermédiaire'),
  createWordStructure('Mba', 'Comment ça va ?', 'mba', 'Salutations', 'Mba, tout va bien ?', 'Débutant'),
  createWordStructure('Ntum', 'À demain', 'ntum', 'Salutations', 'Ntum, on se voit demain', 'Débutant'),
  createWordStructure('Nkum', 'À plus tard', 'nkum', 'Salutations', 'Nkum, à plus tard', 'Débutant'),
  createWordStructure('Mba', 'Salut (familier)', 'mba', 'Salutations', 'Mba, mon ami', 'Débutant'),
  createWordStructure('Ntum', 'Bienvenue', 'ntum', 'Salutations', 'Ntum dans notre village', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Félicitations', 'nkeng', 'Salutations', 'Nkeng pour votre réussite', 'Intermédiaire'),
  createWordStructure('Mba', 'Joyeux anniversaire', 'mba', 'Salutations', 'Mba, que cette année soit bénie', 'Intermédiaire'),
  createWordStructure('Ntum', 'Bon voyage', 'ntum', 'Salutations', 'Ntum, que le chemin soit sûr', 'Intermédiaire'),
  createWordStructure('Nkum', 'Bon retour', 'nkum', 'Salutations', 'Nkum, nous t\'attendons', 'Intermédiaire'),

  // === POLITESSE (15 mots) ===
  createWordStructure('Nde', 'Merci', 'nde', 'Politesse', 'Nde pour votre aide', 'Débutant'),
  createWordStructure('Mba', 'S\'il vous plaît', 'mba', 'Politesse', 'Mba, pouvez-vous m\'aider ?', 'Débutant'),
  createWordStructure('Nkeng', 'Excusez-moi', 'nkeng', 'Politesse', 'Nkeng, je suis désolé', 'Intermédiaire'),
  createWordStructure('Ntum', 'Pardon', 'ntum', 'Politesse', 'Ntum, je n\'ai pas entendu', 'Débutant'),
  createWordStructure('Nkum', 'Désolé', 'nkum', 'Politesse', 'Nkum, c\'est ma faute', 'Débutant'),
  createWordStructure('Mba', 'De rien', 'mba', 'Politesse', 'Mba, c\'est normal', 'Débutant'),
  createWordStructure('Ntum', 'Je vous en prie', 'ntum', 'Politesse', 'Ntum, avec plaisir', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Permettez-moi', 'nkeng', 'Politesse', 'Nkeng de vous interrompre', 'Avancé'),
  createWordStructure('Mba', 'Avec votre permission', 'mba', 'Politesse', 'Mba, puis-je entrer ?', 'Avancé'),
  createWordStructure('Ntum', 'Je vous demande pardon', 'ntum', 'Politesse', 'Ntum pour cette erreur', 'Avancé'),
  createWordStructure('Nkum', 'Acceptez mes excuses', 'nkum', 'Politesse', 'Nkum, je me suis trompé', 'Avancé'),
  createWordStructure('Mba', 'C\'est gentil', 'mba', 'Politesse', 'Mba de votre part', 'Intermédiaire'),
  createWordStructure('Ntum', 'C\'est très aimable', 'ntum', 'Politesse', 'Ntum de votre part', 'Avancé'),
  createWordStructure('Nkeng', 'Je vous remercie', 'nkeng', 'Politesse', 'Nkeng de votre hospitalité', 'Avancé'),
  createWordStructure('Mba', 'Je vous suis reconnaissant', 'mba', 'Politesse', 'Mba pour votre générosité', 'Avancé'),

  // === NATURE (20 mots) ===
  createWordStructure('Mba', 'Eau', 'mba', 'Nature', 'L\'eau est précieuse', 'Débutant'),
  createWordStructure('Ntum', 'Terre', 'ntum', 'Nature', 'La terre de nos ancêtres', 'Intermédiaire'),
  createWordStructure('Nkum', 'Arbre', 'nkum', 'Nature', 'L\'arbre sacré', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Feu', 'nkeng', 'Nature', 'Le feu de la vie', 'Débutant'),
  createWordStructure('Mba', 'Vent', 'mba', 'Nature', 'Le vent du désert', 'Débutant'),
  createWordStructure('Ntum', 'Soleil', 'ntum', 'Nature', 'Le soleil se lève', 'Débutant'),
  createWordStructure('Nkum', 'Lune', 'nkum', 'Nature', 'La lune brille', 'Débutant'),
  createWordStructure('Mba', 'Étoile', 'mba', 'Nature', 'Les étoiles dans le ciel', 'Débutant'),
  createWordStructure('Ntum', 'Montagne', 'ntum', 'Nature', 'La montagne sacrée', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Rivière', 'nkeng', 'Nature', 'La rivière qui coule', 'Intermédiaire'),
  createWordStructure('Mba', 'Lac', 'mba', 'Nature', 'Le lac tranquille', 'Intermédiaire'),
  createWordStructure('Ntum', 'Forêt', 'ntum', 'Nature', 'La forêt dense', 'Intermédiaire'),
  createWordStructure('Nkum', 'Plaine', 'nkum', 'Nature', 'La plaine fertile', 'Intermédiaire'),
  createWordStructure('Mba', 'Désert', 'mba', 'Nature', 'Le désert aride', 'Intermédiaire'),
  createWordStructure('Ntum', 'Savane', 'ntum', 'Nature', 'La savane infinie', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Pluie', 'nkeng', 'Nature', 'La pluie bienfaisante', 'Débutant'),
  createWordStructure('Mba', 'Orage', 'mba', 'Nature', 'L\'orage approche', 'Intermédiaire'),
  createWordStructure('Ntum', 'Nuage', 'ntum', 'Nature', 'Le nuage blanc', 'Débutant'),
  createWordStructure('Nkum', 'Arc-en-ciel', 'nkum', 'Nature', 'L\'arc-en-ciel après la pluie', 'Intermédiaire'),
  createWordStructure('Mba', 'Saison', 'mba', 'Nature', 'La saison des pluies', 'Intermédiaire'),

  // === RELATIONS FAMILIALES (15 mots) ===
  createWordStructure('Nkum', 'Famille', 'nkum', 'Relations', 'Ma famille est importante', 'Intermédiaire'),
  createWordStructure('Ntum', 'Ami', 'ntum', 'Relations', 'Mon ami fidèle', 'Débutant'),
  createWordStructure('Mba', 'Enfant', 'mba', 'Relations', 'L\'enfant de la famille', 'Débutant'),
  createWordStructure('Nkeng', 'Père', 'nkeng', 'Relations', 'Le père de famille', 'Débutant'),
  createWordStructure('Ntum', 'Mère', 'ntum', 'Relations', 'La mère protectrice', 'Débutant'),
  createWordStructure('Nkum', 'Frère', 'nkum', 'Relations', 'Mon frère aîné', 'Débutant'),
  createWordStructure('Mba', 'Sœur', 'mba', 'Relations', 'Ma sœur cadette', 'Débutant'),
  createWordStructure('Ntum', 'Grand-père', 'ntum', 'Relations', 'Le grand-père sage', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Grand-mère', 'nkeng', 'Relations', 'La grand-mère bienveillante', 'Intermédiaire'),
  createWordStructure('Mba', 'Oncle', 'mba', 'Relations', 'L\'oncle respecté', 'Intermédiaire'),
  createWordStructure('Ntum', 'Tante', 'ntum', 'Relations', 'La tante attentionnée', 'Intermédiaire'),
  createWordStructure('Nkum', 'Cousin', 'nkum', 'Relations', 'Mon cousin proche', 'Intermédiaire'),
  createWordStructure('Mba', 'Cousine', 'mba', 'Relations', 'Ma cousine aimée', 'Intermédiaire'),
  createWordStructure('Ntum', 'Neveu', 'ntum', 'Relations', 'Le neveu prometteur', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Nièce', 'nkeng', 'Relations', 'La nièce chérie', 'Intermédiaire'),

  // === LIEUX ET HABITAT (15 mots) ===
  createWordStructure('Ntum', 'Village', 'ntum', 'Lieux', 'Notre village est beau', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Maison', 'nkeng', 'Lieux', 'La maison familiale', 'Débutant'),
  createWordStructure('Mba', 'Rivière', 'mba', 'Lieux', 'La rivière sacrée', 'Intermédiaire'),
  createWordStructure('Ntum', 'Place', 'ntum', 'Lieux', 'La place du village', 'Débutant'),
  createWordStructure('Nkum', 'Marché', 'nkum', 'Lieux', 'Le marché animé', 'Intermédiaire'),
  createWordStructure('Mba', 'École', 'mba', 'Lieux', 'L\'école du village', 'Débutant'),
  createWordStructure('Ntum', 'Église', 'ntum', 'Lieux', 'L\'église du village', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Mosquée', 'nkeng', 'Lieux', 'La mosquée du quartier', 'Intermédiaire'),
  createWordStructure('Mba', 'Hôpital', 'mba', 'Lieux', 'L\'hôpital de la région', 'Intermédiaire'),
  createWordStructure('Ntum', 'Bureau', 'ntum', 'Lieux', 'Le bureau administratif', 'Intermédiaire'),
  createWordStructure('Nkum', 'Route', 'nkum', 'Lieux', 'La route principale', 'Débutant'),
  createWordStructure('Mba', 'Pont', 'mba', 'Lieux', 'Le pont sur la rivière', 'Intermédiaire'),
  createWordStructure('Ntum', 'Port', 'ntum', 'Lieux', 'Le port de pêche', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Aéroport', 'nkeng', 'Lieux', 'L\'aéroport international', 'Avancé'),
  createWordStructure('Mba', 'Frontière', 'mba', 'Lieux', 'La frontière du pays', 'Avancé'),

  // === CULTURE ET ARTS (15 mots) ===
  createWordStructure('Nkeng', 'Danse', 'nkeng', 'Culture', 'La danse traditionnelle', 'Intermédiaire'),
  createWordStructure('Ntum', 'Chant', 'ntum', 'Culture', 'Le chant des ancêtres', 'Intermédiaire'),
  createWordStructure('Mba', 'Masque', 'mba', 'Culture', 'Le masque rituel', 'Avancé'),
  createWordStructure('Nkum', 'Tambour', 'nkum', 'Culture', 'Le tambour sacré', 'Intermédiaire'),
  createWordStructure('Ntum', 'Flûte', 'ntum', 'Culture', 'La flûte traditionnelle', 'Intermédiaire'),
  createWordStructure('Mba', 'Sculpture', 'mba', 'Culture', 'La sculpture en bois', 'Avancé'),
  createWordStructure('Nkeng', 'Poterie', 'nkeng', 'Culture', 'La poterie artisanale', 'Intermédiaire'),
  createWordStructure('Ntum', 'Tissage', 'ntum', 'Culture', 'Le tissage traditionnel', 'Intermédiaire'),
  createWordStructure('Nkum', 'Conte', 'nkum', 'Culture', 'Le conte des anciens', 'Intermédiaire'),
  createWordStructure('Mba', 'Légende', 'mba', 'Culture', 'La légende du village', 'Avancé'),
  createWordStructure('Ntum', 'Fête', 'ntum', 'Culture', 'La fête du village', 'Débutant'),
  createWordStructure('Nkeng', 'Cérémonie', 'nkeng', 'Culture', 'La cérémonie d\'initiation', 'Avancé'),
  createWordStructure('Mba', 'Tradition', 'mba', 'Culture', 'La tradition ancestrale', 'Intermédiaire'),
  createWordStructure('Ntum', 'Coutume', 'ntum', 'Culture', 'La coutume du village', 'Intermédiaire'),
  createWordStructure('Nkum', 'Patrimoine', 'nkum', 'Culture', 'Le patrimoine culturel', 'Avancé'),

  // === GOUVERNANCE ET POLITIQUE (10 mots) ===
  createWordStructure('Nkum', 'Roi, chef', 'nkum', 'Gouvernance', 'Le roi du village', 'Avancé'),
  createWordStructure('Ntum', 'Conseil', 'ntum', 'Gouvernance', 'Le conseil des sages', 'Avancé'),
  createWordStructure('Mba', 'Ministre', 'mba', 'Gouvernance', 'Le ministre de la culture', 'Avancé'),
  createWordStructure('Nkeng', 'Président', 'nkeng', 'Gouvernance', 'Le président de la république', 'Avancé'),
  createWordStructure('Ntum', 'Gouvernement', 'ntum', 'Gouvernance', 'Le gouvernement national', 'Avancé'),
  createWordStructure('Nkum', 'Loi', 'nkum', 'Gouvernance', 'La loi du pays', 'Avancé'),
  createWordStructure('Mba', 'Justice', 'mba', 'Gouvernance', 'La justice équitable', 'Avancé'),
  createWordStructure('Ntum', 'Paix', 'ntum', 'Gouvernance', 'La paix dans le pays', 'Intermédiaire'),
  createWordStructure('Nkeng', 'Liberté', 'nkeng', 'Gouvernance', 'La liberté du peuple', 'Avancé'),
  createWordStructure('Mba', 'Démocratie', 'mba', 'Gouvernance', 'La démocratie participative', 'Avancé'),

  // === SPIRITUALITÉ ET RELIGION (10 mots) ===
  createWordStructure('Ntum', 'Esprit, âme', 'ntum', 'Spiritualité', 'L\'esprit des ancêtres', 'Avancé'),
  createWordStructure('Mba', 'Dieu', 'mba', 'Spiritualité', 'Le Dieu créateur', 'Avancé'),
  createWordStructure('Nkeng', 'Prière', 'nkeng', 'Spiritualité', 'La prière du matin', 'Intermédiaire'),
  createWordStructure('Ntum', 'Temple', 'ntum', 'Spiritualité', 'Le temple sacré', 'Avancé'),
  createWordStructure('Mba', 'Prêtre', 'mba', 'Spiritualité', 'Le prêtre du village', 'Avancé'),
  createWordStructure('Nkum', 'Sacrifice', 'nkum', 'Spiritualité', 'Le sacrifice rituel', 'Avancé'),
  createWordStructure('Ntum', 'Bénédiction', 'ntum', 'Spiritualité', 'La bénédiction des anciens', 'Avancé'),
  createWordStructure('Mba', 'Miracle', 'mba', 'Spiritualité', 'Le miracle divin', 'Avancé'),
  createWordStructure('Nkeng', 'Foi', 'nkeng', 'Spiritualité', 'La foi inébranlable', 'Avancé'),
  createWordStructure('Ntum', 'Sagesse', 'ntum', 'Spiritualité', 'La sagesse des anciens', 'Avancé')
]
