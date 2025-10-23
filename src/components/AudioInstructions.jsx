import React, { useState, useEffect } from 'react'
import { realAudioManager } from '../utils/realAudioManager'

export default function AudioInstructions() {
  const [missingAudios, setMissingAudios] = useState([])
  const [availableAudios, setAvailableAudios] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAudioStatus()
  }, [])

  const loadAudioStatus = async () => {
    setIsLoading(true)
    try {
      const [missing, available] = await Promise.all([
        realAudioManager.getMissingAudios(),
        realAudioManager.getAvailableAudios()
      ])
      setMissingAudios(missing)
      setAvailableAudios(available)
    } catch (error) {
      console.error('Erreur lors du chargement du statut audio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getInstructionsForWord = (word) => {
    return realAudioManager.getInstructionsForWord(word)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des instructions audio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">
        🎤 Instructions pour Ajouter de Vrais Fichiers Audio
      </h3>

      {/* Statut des fichiers audio */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-100 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">✅ Fichiers Audio Disponibles</h4>
          <p className="text-sm text-green-700">
            {Object.keys(availableAudios).length} fichier(s) trouvé(s)
          </p>
          {Object.keys(availableAudios).length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-green-600">Mots disponibles :</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.keys(availableAudios).map(word => (
                  <span key={word} className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-100 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Fichiers Audio Manquants</h4>
          <p className="text-sm text-yellow-700">
            {missingAudios.length} fichier(s) à ajouter
          </p>
          {missingAudios.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-yellow-600">Mots manquants :</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {missingAudios.slice(0, 5).map(item => (
                  <span key={item.word} className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">
                    {item.word}
                  </span>
                ))}
                {missingAudios.length > 5 && (
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">
                    +{missingAudios.length - 5} autres
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions détaillées */}
      <div className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-4">📋 Étapes pour Ajouter des Fichiers Audio</h4>
          <ol className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              <div>
                <strong>Enregistrez la prononciation</strong> de chaque mot Tikar avec un microphone
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              <div>
                <strong>Sauvegardez en MP3</strong> avec une qualité de 128 kbps minimum
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <div>
                <strong>Renommez les fichiers</strong> selon le format requis (voir ci-dessous)
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
              <div>
                <strong>Placez dans les dossiers</strong> appropriés selon la catégorie
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
              <div>
                <strong>Rechargez la page</strong> pour tester les nouveaux fichiers
              </div>
            </li>
          </ol>
        </div>

        {/* Structure des dossiers */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">📁 Structure des Dossiers</h4>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
            <div>public/</div>
            <div>└── media/</div>
            <div>    └── audio/</div>
            <div>        └── pronunciation/</div>
            <div>            ├── salutations/</div>
            <div>            │   ├── mben.mp3</div>
            <div>            │   ├── nde.mp3</div>
            <div>            │   └── nkum.mp3</div>
            <div>            ├── politesse/</div>
            <div>            │   ├── nde.mp3</div>
            <div>            │   └── mba.mp3</div>
            <div>            ├── nature/</div>
            <div>            │   ├── mba.mp3</div>
            <div>            │   └── ntum.mp3</div>
            <div>            └── relations/</div>
            <div>                ├── nkum.mp3</div>
            <div>                └── ntum.mp3</div>
          </div>
        </div>

        {/* Liste des fichiers à créer */}
        <div className="bg-amber-50 rounded-lg p-6">
          <h4 className="font-semibold text-amber-800 mb-4">📝 Fichiers Audio à Créer</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {realAudioManager.getFilesToCreate().map((file, index) => (
              <div key={index} className="bg-white rounded p-3 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-800">{file.word}</span>
                    <span className="text-gray-500 ml-2">({file.category})</span>
                  </div>
                  <span className="text-sm text-gray-500">{file.fileName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conseils d'enregistrement */}
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-4">🎙️ Conseils d'Enregistrement</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <h5 className="font-semibold mb-2">Qualité Audio :</h5>
              <ul className="space-y-1">
                <li>• Format : MP3</li>
                <li>• Qualité : 128 kbps minimum</li>
                <li>• Durée : 2-3 secondes par mot</li>
                <li>• Volume : Normalisé</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Environnement :</h5>
              <ul className="space-y-1">
                <li>• Endroit calme</li>
                <li>• Microphone de qualité</li>
                <li>• Parlez lentement et clairement</li>
                <li>• Testez avant de finaliser</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={loadAudioStatus}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          🔄 Actualiser le Statut
        </button>
      </div>
    </div>
  )
}
