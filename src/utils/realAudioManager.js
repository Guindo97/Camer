// Gestionnaire des vrais fichiers audio Tikar
export class RealAudioManager {
  constructor() {
    this.basePath = '/media/audio/pronunciation/'
    this.audioFiles = {
      // Salutations
      'Mbèn': 'salutations/mben.mp3',
      'Nde': 'salutations/nde.mp3',
      'Nkum': 'salutations/nkum.mp3',
      'Mba': 'salutations/mba.mp3',
      'Ntum': 'salutations/ntum.mp3',
      'Nkeng': 'salutations/nkeng.mp3',
      
      // Politesse
      'Nde': 'politesse/nde.mp3',
      'Mba': 'politesse/mba.mp3',
      'Nkeng': 'politesse/nkeng.mp3',
      'Ntum': 'politesse/ntum.mp3',
      'Nkum': 'politesse/nkum.mp3',
      
      // Nature
      'Mba': 'nature/mba.mp3',
      'Ntum': 'nature/ntum.mp3',
      'Nkum': 'nature/nkum.mp3',
      'Nkeng': 'nature/nkeng.mp3',
      
      // Relations familiales
      'Nkum': 'relations/nkum.mp3',
      'Ntum': 'relations/ntum.mp3',
      'Mba': 'relations/mba.mp3',
      'Nkeng': 'relations/nkeng.mp3'
    }
  }

  // Vérifier si un fichier audio existe
  async checkAudioExists(word) {
    const audioPath = this.audioFiles[word]
    if (!audioPath) return false

    try {
      const response = await fetch(this.basePath + audioPath, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      console.log(`Fichier audio non trouvé pour "${word}":`, audioPath)
      return false
    }
  }

  // Obtenir l'URL du fichier audio
  getAudioUrl(word) {
    const audioPath = this.audioFiles[word]
    if (!audioPath) return null
    return this.basePath + audioPath
  }

  // Obtenir tous les fichiers audio disponibles
  async getAvailableAudios() {
    const available = {}
    
    for (const [word, path] of Object.entries(this.audioFiles)) {
      const exists = await this.checkAudioExists(word)
      if (exists) {
        available[word] = this.basePath + path
      }
    }
    
    return available
  }

  // Obtenir les fichiers audio manquants
  async getMissingAudios() {
    const missing = []
    
    for (const [word, path] of Object.entries(this.audioFiles)) {
      const exists = await this.checkAudioExists(word)
      if (!exists) {
        missing.push({
          word,
          path: this.basePath + path,
          category: this.getCategoryFromPath(path)
        })
      }
    }
    
    return missing
  }

  // Obtenir la catégorie à partir du chemin
  getCategoryFromPath(path) {
    if (path.includes('salutations/')) return 'Salutations'
    if (path.includes('politesse/')) return 'Politesse'
    if (path.includes('nature/')) return 'Nature'
    if (path.includes('relations/')) return 'Relations'
    return 'Autre'
  }

  // Obtenir les instructions pour ajouter un fichier audio
  getInstructionsForWord(word) {
    const audioPath = this.audioFiles[word]
    if (!audioPath) return null

    return {
      word,
      fileName: audioPath.split('/').pop(),
      fullPath: this.basePath + audioPath,
      category: this.getCategoryFromPath(audioPath),
      instructions: [
        `1. Enregistrez la prononciation de "${word}"`,
        `2. Sauvegardez le fichier audio en MP3`,
        `3. Renommez le fichier en "${audioPath.split('/').pop()}"`,
        `4. Placez le fichier dans le dossier "${audioPath.split('/')[0]}/"`,
        `5. Rechargez la page pour tester`
      ]
    }
  }

  // Obtenir la liste des fichiers à créer
  getFilesToCreate() {
    const files = []
    
    // Salutations
    files.push({ word: 'Mbèn', fileName: 'mben.mp3', category: 'Salutations' })
    files.push({ word: 'Nde', fileName: 'nde.mp3', category: 'Salutations' })
    files.push({ word: 'Nkum', fileName: 'nkum.mp3', category: 'Salutations' })
    files.push({ word: 'Mba', fileName: 'mba.mp3', category: 'Salutations' })
    files.push({ word: 'Ntum', fileName: 'ntum.mp3', category: 'Salutations' })
    files.push({ word: 'Nkeng', fileName: 'nkeng.mp3', category: 'Salutations' })
    
    // Politesse
    files.push({ word: 'Nde', fileName: 'nde.mp3', category: 'Politesse' })
    files.push({ word: 'Mba', fileName: 'mba.mp3', category: 'Politesse' })
    files.push({ word: 'Nkeng', fileName: 'nkeng.mp3', category: 'Politesse' })
    files.push({ word: 'Ntum', fileName: 'ntum.mp3', category: 'Politesse' })
    files.push({ word: 'Nkum', fileName: 'nkum.mp3', category: 'Politesse' })
    
    // Nature
    files.push({ word: 'Mba', fileName: 'mba.mp3', category: 'Nature' })
    files.push({ word: 'Ntum', fileName: 'ntum.mp3', category: 'Nature' })
    files.push({ word: 'Nkum', fileName: 'nkum.mp3', category: 'Nature' })
    files.push({ word: 'Nkeng', fileName: 'nkeng.mp3', category: 'Nature' })
    
    // Relations
    files.push({ word: 'Nkum', fileName: 'nkum.mp3', category: 'Relations' })
    files.push({ word: 'Ntum', fileName: 'ntum.mp3', category: 'Relations' })
    files.push({ word: 'Mba', fileName: 'mba.mp3', category: 'Relations' })
    files.push({ word: 'Nkeng', fileName: 'nkeng.mp3', category: 'Relations' })
    
    return files
  }
}

// Instance globale
export const realAudioManager = new RealAudioManager()
