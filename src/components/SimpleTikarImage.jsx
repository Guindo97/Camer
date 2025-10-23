import React from 'react'

export default function SimpleTikarImage({ 
  className = "w-full h-auto object-contain",
  showCaption = true,
  showDecorations = true 
}) {
  return (
    <div className="relative">
      <img 
        src="/media/images/photos/tikar.png"
        alt="Peuple Tikar de Bankim - Trois personnes portant des chapeaux traditionnels colorés"
        className={className}
        style={{ maxHeight: '500px' }}
      />
      
      {showCaption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-bold">Peuple Tikar de Bankim</h3>
          <p className="text-white/90 text-sm">Terre ancestrale de l'Adamaoua</p>
        </div>
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
