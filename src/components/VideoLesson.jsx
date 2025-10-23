import React, { useState } from 'react'

export default function VideoLesson({ title, description, videoUrl, duration, level }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  // URLs d'exemple pour les vidéos (remplacez par vos vraies vidéos)
  const exampleVideos = {
    'Introduction à la langue Tikar': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'Prononciation des sons Tikar': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'Conversation de base': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }

  const currentVideoUrl = videoUrl || exampleVideos[title] || null

  const handlePlay = () => {
    setIsPlaying(true)
    setShowVideo(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-red-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">{level}</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">{duration}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
        <div className="aspect-video flex items-center justify-center">
          {showVideo && currentVideoUrl ? (
            <video 
              controls 
              className="w-full h-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={currentVideoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          ) : (
            <div className="text-center text-white">
              <div className="text-6xl mb-4">▶️</div>
              <p className="text-lg">Leçon vidéo Tikar</p>
              <p className="text-sm opacity-75">Cliquez pour commencer</p>
              <div className="mt-4">
                <button 
                  onClick={handlePlay}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  🎬 Démarrer la leçon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          onClick={showVideo ? handlePause : handlePlay}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Lire la leçon'}
        </button>
        <div className="text-sm text-gray-500">
          📚 Cours de langue Tikar
        </div>
      </div>
      
      {!currentVideoUrl && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 <strong>Note :</strong> Cette vidéo est un exemple. Remplacez par vos vraies leçons vidéo Tikar.
          </p>
        </div>
      )}
    </div>
  )
}
