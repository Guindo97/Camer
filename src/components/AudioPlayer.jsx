import React, { useState, useRef, useEffect } from 'react'
import { demoAudioGenerator } from '../utils/demoAudioGenerator'
import { realAudioManager } from '../utils/realAudioManager'

export default function AudioPlayer({ title, audioUrl, pronunciation, word }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasAudio, setHasAudio] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState(null)
  const [hasRealAudio, setHasRealAudio] = useState(false)
  const [realAudioUrl, setRealAudioUrl] = useState(null)
  const [isCheckingAudio, setIsCheckingAudio] = useState(false)
  const audioRef = useRef(null)

  // URLs pour les fichiers audio Tikar (remplacez par vos vrais fichiers)
  const exampleAudios = {
    'Salutations': '/media/audio/pronunciation/salutations.mp3',
    'Politesse': '/media/audio/pronunciation/politesse.mp3',
    'Famille': '/media/audio/pronunciation/famille.mp3',
    'Nature': '/media/audio/pronunciation/nature.mp3'
  }

  const currentAudioUrl = audioUrl || exampleAudios[title] || null

  // Vérifier si un vrai fichier audio existe
  useEffect(() => {
    if (word) {
      checkRealAudio()
    }
  }, [word])

  const checkRealAudio = async () => {
    if (!word) return
    
    setIsCheckingAudio(true)
    try {
      const exists = await realAudioManager.checkAudioExists(word)
      if (exists) {
        const audioUrl = realAudioManager.getAudioUrl(word)
        setRealAudioUrl(audioUrl)
        setHasRealAudio(true)
        setHasAudio(true)
      } else {
        setHasRealAudio(false)
        setRealAudioUrl(null)
      }
    } catch (error) {
      console.log('Erreur lors de la vérification audio:', error)
      setHasRealAudio(false)
    } finally {
      setIsCheckingAudio(false)
    }
  }

  const togglePlay = () => {
    if (hasRealAudio && realAudioUrl) {
      // Utiliser le vrai fichier audio
      const audio = new Audio(realAudioUrl)
      audio.onended = () => setIsPlaying(false)
      audio.onloadedmetadata = () => setDuration(audio.duration)
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
      
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    } else if (audioRef.current) {
      // Utiliser le fichier audio par défaut
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setHasAudio(true)
    }
  }

  const handleError = () => {
    console.log('Erreur de chargement audio - Mode simulation activé')
    setHasAudio(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Générer un son de démonstration Tikar
  const generateRealAudio = async () => {
    if (!word || !pronunciation) return
    
    setIsGenerating(true)
    try {
      const blob = await demoAudioGenerator.generateAudioBlob(word, pronunciation)
      const url = URL.createObjectURL(blob)
      
      setGeneratedAudio(url)
      setHasAudio(true)
      setDuration(1.2)
      
      // Créer un élément audio temporaire pour la lecture
      const tempAudio = new Audio(url)
      tempAudio.onended = () => setIsPlaying(false)
      tempAudio.onloadedmetadata = () => setDuration(tempAudio.duration)
      tempAudio.ontimeupdate = () => setCurrentTime(tempAudio.currentTime)
      
      if (isPlaying) {
        tempAudio.play()
      }
      
    } catch (error) {
      console.error('Erreur lors de la génération audio:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Lecture de l'audio généré
  const playGeneratedAudio = () => {
    if (generatedAudio) {
      const audio = new Audio(generatedAudio)
      audio.onended = () => setIsPlaying(false)
      audio.onloadedmetadata = () => setDuration(audio.duration)
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
      
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }


  return (
    <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-red-800 mb-2">{title}</h3>
        {word && (
          <div className="text-2xl font-bold text-red-600 mb-1">{word}</div>
        )}
        {pronunciation && (
          <div className="text-gray-600 mb-2">Prononciation: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{pronunciation}</span></div>
        )}
      </div>
      
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center mb-4">
          {isCheckingAudio ? (
            <button
              disabled
              className="w-16 h-16 bg-gray-400 text-white rounded-full flex items-center justify-center"
            >
              ⏳
            </button>
          ) : hasRealAudio ? (
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              {isPlaying ? '⏸️' : '🎤'}
            </button>
          ) : !hasAudio && !generatedAudio ? (
            <button
              onClick={generateRealAudio}
              disabled={isGenerating}
              className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? '⏳' : '🎵'}
            </button>
          ) : (
            <button
              onClick={generatedAudio ? playGeneratedAudio : togglePlay}
              className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
      </div>
      
      {currentAudioUrl && (
        <audio
          ref={audioRef}
          src={currentAudioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
        />
      )}
      
      {isCheckingAudio && (
        <div className="text-center text-gray-500 text-sm">
          🔍 Vérification des fichiers audio...
        </div>
      )}
      
      {hasRealAudio && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-sm text-green-800">
            ✅ <strong>Vrai fichier audio trouvé !</strong> Prononciation Tikar authentique pour "{word}" ({pronunciation})
          </p>
        </div>
      )}
      
      {!hasRealAudio && !hasAudio && !generatedAudio && !isCheckingAudio && (
        <div className="text-center text-gray-500 text-sm">
          🔊 {isGenerating ? 'Génération en cours...' : 'Cliquez pour générer la prononciation'}
        </div>
      )}
      
      {generatedAudio && !hasRealAudio && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Son de démonstration :</strong> Son généré pour "{word}" ({pronunciation}) - <em>Ajoutez un vrai fichier audio pour une prononciation authentique</em>
          </p>
        </div>
      )}
      
      {!hasRealAudio && !currentAudioUrl && !generatedAudio && !isCheckingAudio && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Ajoutez un vrai fichier audio :</strong> Enregistrez la prononciation de "{word}" et placez le fichier dans le dossier approprié pour une expérience authentique.
          </p>
        </div>
      )}
      
      {currentAudioUrl && !hasAudio && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800">
            🔊 <strong>Fichier audio manquant :</strong> Placez <code>{currentAudioUrl}</code> pour écouter la vraie prononciation Tikar.
          </p>
        </div>
      )}
    </div>
  )
}
