import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Vérifier si Firebase est configuré avec de vraies clés
const isFirebaseConfigured = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "votre-api-key",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "votre-projet.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "votre-projet-id",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "votre-projet.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "votre-app-id"
  }
  
  // Vérifier si les clés sont des valeurs par défaut
  return !(
    config.apiKey === "votre-api-key" ||
    config.projectId === "votre-projet-id" ||
    config.appId === "votre-app-id"
  )
}

// Configuration Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "votre-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "votre-projet.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "votre-projet-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "votre-projet.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "votre-app-id"
}

// Variables d'export
export let app = null
export let db = null
export const isFirebaseEnabled = isFirebaseConfigured()

// Initialiser Firebase seulement si configuré
if (isFirebaseEnabled) {
  try {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    console.log('✅ Firebase initialisé avec succès')
  } catch (error) {
    console.warn('⚠️ Erreur lors de l\'initialisation Firebase:', error)
    app = null
    db = null
  }
} else {
  console.log('ℹ️ Firebase non configuré - Mode hors ligne activé')
}

export default app
