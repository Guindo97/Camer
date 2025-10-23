import React, { useState } from 'react'

export default function TikarImage({ 
  src = "/media/images/photos/tikar.png", 
  alt = "Peuple Tikar de Bankim", 
  className = "w-full h-full object-cover",
  fallbackContent = null,
  showDecorations = true 
}) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const defaultFallback = (
    <div className="w-full h-full bg-gradient-to-br from-amber-200 via-red-300 to-yellow-400 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-2xl font-bold mb-2">Peuple Tikar de Bankim</h3>
        <p className="text-lg opacity-90">Terre ancestrale de l'Adamaoua</p>
        <p className="text-sm opacity-75 mt-2">Image en cours de chargement...</p>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {!imageError ? (
        <img 
          src={src}
          alt={alt}
          className={className}
          onError={handleImageError}
        />
      ) : (
        fallbackContent || defaultFallback
      )}
      
      {showDecorations && (
        <>
          {/* Éléments décoratifs traditionnels */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl">🥁</span>
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🎭</span>
          </div>
        </>
      )}
    </div>
  )
}
