import React, { useState, useEffect } from 'react'
import { pdfManager } from '../utils/pdfManager'

export default function PDFDownload({ title, description, downloadUrl, size, pages, pdfId }) {
  const [hasPDF, setHasPDF] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [pdfInfo, setPdfInfo] = useState(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    if (pdfId) {
      checkPDF()
    }
  }, [pdfId])

  const checkPDF = async () => {
    setIsChecking(true)
    try {
      const exists = await pdfManager.checkPDFExists(pdfId)
      if (exists) {
        const info = pdfManager.getPDFInfo(pdfId)
        setPdfInfo(info)
        setHasPDF(true)
      } else {
        setHasPDF(false)
        setIsDemo(true)
      }
    } catch (error) {
      console.log('Erreur lors de la vérification PDF:', error)
      setHasPDF(false)
      setIsDemo(true)
    } finally {
      setIsChecking(false)
    }
  }

  const handleDownload = () => {
    if (hasPDF && pdfInfo) {
      window.open(pdfInfo.downloadUrl, '_blank')
    } else if (isDemo) {
      // Créer un PDF de démonstration
      createDemoPDF()
    } else {
      window.open(downloadUrl || '#', '_blank')
    }
  }

  const handlePreview = () => {
    if (hasPDF && pdfInfo) {
      window.open(pdfInfo.previewUrl, '_blank')
    } else {
      window.open(downloadUrl || '#', '_blank')
    }
  }

  const createDemoPDF = async () => {
    if (!pdfId) return
    
    try {
      const demo = await pdfManager.createDemoPDF(pdfId)
      if (demo) {
        alert(`PDF de démonstration créé pour "${title}". Pour un vrai PDF, ajoutez le fichier dans le dossier approprié.`)
      }
    } catch (error) {
      console.error('Erreur lors de la création du PDF de démonstration:', error)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isChecking ? 'bg-gray-400' : 
            hasPDF ? 'bg-green-600' : 
            isDemo ? 'bg-yellow-600' : 
            'bg-red-600'
          }`}>
            <span className="text-white text-2xl">
              {isChecking ? '⏳' : hasPDF ? '✅' : isDemo ? '⚠️' : '📄'}
            </span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            {size && <span>📏 {size}</span>}
            {pages && <span>📖 {pages} pages</span>}
            <span>📚 Manuel Tikar</span>
            {isChecking && <span className="text-blue-600">🔍 Vérification...</span>}
            {hasPDF && <span className="text-green-600">✅ Disponible</span>}
            {isDemo && <span className="text-yellow-600">⚠️ Démonstration</span>}
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleDownload}
              disabled={isChecking}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                isChecking ? 'bg-gray-400 text-gray-200 cursor-not-allowed' :
                hasPDF ? 'bg-green-600 text-white hover:bg-green-700' :
                isDemo ? 'bg-yellow-600 text-white hover:bg-yellow-700' :
                'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isChecking ? '⏳ Vérification...' : 
               hasPDF ? '📥 Télécharger PDF' : 
               isDemo ? '🎯 Créer PDF Démo' : 
               '📥 Télécharger PDF'}
            </button>
            <button 
              onClick={handlePreview}
              disabled={isChecking || !hasPDF}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                isChecking || !hasPDF ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              👁️ Prévisualiser
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
