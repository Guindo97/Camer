// Gestionnaire des PDFs Tikar
export class PDFManager {
  constructor() {
    this.basePath = '/media/pdf/'
    this.pdfFiles = {
      // Manuels de langue
      'manuel-debutant': {
        title: 'Manuel de langue Tikar - Niveau Débutant',
        description: 'Guide complet pour apprendre les bases de la langue Tikar avec exercices pratiques.',
        fileName: 'manuel-tikar-debutant.pdf',
        size: '2.5 MB',
        pages: '45 pages',
        category: 'Manuels',
        downloadUrl: '/media/pdf/manuels/manuel-tikar-debutant.pdf',
        previewUrl: '/media/pdf/previews/manuel-tikar-debutant-preview.pdf'
      },
      'dictionnaire': {
        title: 'Dictionnaire Tikar-Français',
        description: 'Dictionnaire complet basé sur les travaux du Dr Carol Thorne-Stanley.',
        fileName: 'dictionnaire-tikar-francais.pdf',
        size: '3.2 MB',
        pages: '120 pages',
        category: 'Dictionnaires',
        downloadUrl: '/media/pdf/dictionnaires/dictionnaire-tikar-francais.pdf',
        previewUrl: '/media/pdf/previews/dictionnaire-tikar-francais-preview.pdf'
      },
      'exercices-prononciation': {
        title: 'Exercices de prononciation',
        description: 'Cahier d\'exercices avec guide audio pour maîtriser la prononciation.',
        fileName: 'exercices-prononciation-tikar.pdf',
        size: '1.8 MB',
        pages: '30 pages',
        category: 'Exercices',
        downloadUrl: '/media/pdf/exercices/exercices-prononciation-tikar.pdf',
        previewUrl: '/media/pdf/previews/exercices-prononciation-tikar-preview.pdf'
      },
      'culture-traditions': {
        title: 'Culture et traditions Tikar',
        description: 'Guide culturel pour comprendre le contexte de la langue Tikar.',
        fileName: 'culture-traditions-tikar.pdf',
        size: '4.1 MB',
        pages: '85 pages',
        category: 'Culture',
        downloadUrl: '/media/pdf/culture/culture-traditions-tikar.pdf',
        previewUrl: '/media/pdf/previews/culture-traditions-tikar-preview.pdf'
      },
      'grammaire-avancee': {
        title: 'Grammaire Tikar Avancée',
        description: 'Manuel de grammaire pour les niveaux intermédiaire et avancé.',
        fileName: 'grammaire-tikar-avancee.pdf',
        size: '3.8 MB',
        pages: '95 pages',
        category: 'Grammaire',
        downloadUrl: '/media/pdf/grammaire/grammaire-tikar-avancee.pdf',
        previewUrl: '/media/pdf/previews/grammaire-tikar-avancee-preview.pdf'
      },
      'histoires-tikar': {
        title: 'Histoires et contes Tikar',
        description: 'Collection de contes traditionnels en langue Tikar avec traductions.',
        fileName: 'histoires-contes-tikar.pdf',
        size: '2.9 MB',
        pages: '65 pages',
        category: 'Littérature',
        downloadUrl: '/media/pdf/litterature/histoires-contes-tikar.pdf',
        previewUrl: '/media/pdf/previews/histoires-contes-tikar-preview.pdf'
      }
    }
  }

  // Vérifier si un PDF existe
  async checkPDFExists(pdfId) {
    const pdf = this.pdfFiles[pdfId]
    if (!pdf) return false

    try {
      const response = await fetch(pdf.downloadUrl, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      console.log(`PDF non trouvé: ${pdf.fileName}`)
      return false
    }
  }

  // Obtenir les informations d'un PDF
  getPDFInfo(pdfId) {
    return this.pdfFiles[pdfId] || null
  }

  // Obtenir tous les PDFs disponibles
  async getAvailablePDFs() {
    const available = {}
    
    for (const [pdfId, pdf] of Object.entries(this.pdfFiles)) {
      const exists = await this.checkPDFExists(pdfId)
      if (exists) {
        available[pdfId] = pdf
      }
    }
    
    return available
  }

  // Obtenir les PDFs manquants
  async getMissingPDFs() {
    const missing = []
    
    for (const [pdfId, pdf] of Object.entries(this.pdfFiles)) {
      const exists = await this.checkPDFExists(pdfId)
      if (!exists) {
        missing.push({
          id: pdfId,
          ...pdf
        })
      }
    }
    
    return missing
  }

  // Obtenir les PDFs par catégorie
  getPDFsByCategory(category) {
    return Object.entries(this.pdfFiles)
      .filter(([_, pdf]) => pdf.category === category)
      .map(([id, pdf]) => ({ id, ...pdf }))
  }

  // Obtenir toutes les catégories
  getCategories() {
    const categories = new Set()
    Object.values(this.pdfFiles).forEach(pdf => {
      categories.add(pdf.category)
    })
    return Array.from(categories)
  }

  // Créer un PDF de démonstration
  async createDemoPDF(pdfId) {
    const pdf = this.pdfFiles[pdfId]
    if (!pdf) return null

    // Créer un PDF simple avec jsPDF (nécessite l'installation de jspdf)
    try {
      // Pour l'instant, retourner une URL de démonstration
      return {
        downloadUrl: `#demo-${pdfId}`,
        previewUrl: `#preview-${pdfId}`,
        isDemo: true
      }
    } catch (error) {
      console.error('Erreur lors de la création du PDF de démonstration:', error)
      return null
    }
  }

  // Obtenir les instructions pour créer un PDF
  getInstructionsForPDF(pdfId) {
    const pdf = this.pdfFiles[pdfId]
    if (!pdf) return null

    return {
      id: pdfId,
      fileName: pdf.fileName,
      category: pdf.category,
      instructions: [
        `1. Créez un document PDF pour "${pdf.title}"`,
        `2. Sauvegardez le fichier en "${pdf.fileName}"`,
        `3. Placez le fichier dans le dossier "${pdf.category.toLowerCase()}/"`,
        `4. Créez une prévisualisation si nécessaire`,
        `5. Rechargez la page pour tester`
      ],
      folderStructure: {
        download: pdf.downloadUrl,
        preview: pdf.previewUrl
      }
    }
  }
}

// Instance globale
export const pdfManager = new PDFManager()
