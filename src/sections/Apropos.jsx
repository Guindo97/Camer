import React, { useEffect, useRef } from 'react'

export default function Apropos({ aboutTitle }) {
  const wrapRef = useRef(null)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 african-pattern opacity-20 rounded-3xl -m-8"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 tikar-gradient rounded-full flex items-center justify-center mr-4 cultural-float">
                <span className="text-white text-xl">🌿</span>
              </div>
              <h2 className="text-4xl font-bold text-red-800">{aboutTitle}</h2>
              <div className="w-12 h-12 rounded-full flex items-center justify-center ml-4 cultural-float overflow-hidden">
                <img 
                  src="https://flagcdn.com/w40/cm.png" 
                  alt="Drapeau du Cameroun" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-32 h-1 cameroon-gradient mx-auto rounded-full" />
          </div>
        </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Histoire du peuple Tikar</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Le peuple Tikar, originaire de la région de l'Adamaoua au Cameroun, possède une riche histoire et une culture millénaire.
            Connus pour leur organisation sociale sophistiquée et leurs traditions artistiques, les Tikar ont su préserver leur identité à travers les siècles.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Notre association s'engage à maintenir vivante cette précieuse héritage culturel et linguistique pour les générations futures.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-red-800 mb-6">Nos Objectifs</h3>
          <ul className="space-y-4">
            <li className="flex items-start"><span className="text-yellow-600 mr-3">🎯</span> <span className="text-gray-700">Enseigner la langue Tikar aux jeunes et adultes</span></li>
            <li className="flex items-start"><span className="text-yellow-600 mr-3">🎭</span> <span className="text-gray-700">Promouvoir les arts et traditions culturelles</span></li>
            <li className="flex items-start"><span className="text-yellow-600 mr-3">🤝</span> <span className="text-gray-700">Créer des liens communautaires forts</span></li>
            <li className="flex items-start"><span className="text-yellow-600 mr-3">📚</span> <span className="text-gray-700">Documenter et préserver notre patrimoine</span></li>
          </ul>
        </div>
      </div>

      {/* Membres du bureau et enseignants */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">Notre Équipe</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white">👑</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Président</h4>
            <p className="text-gray-600 mb-2">M. [Nom du Président]</p>
            <p className="text-sm text-gray-500">Responsable de la coordination générale</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white">📚</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Enseignants</h4>
            <p className="text-gray-600 mb-2">Dr. [Nom Enseignant]</p>
            <p className="text-sm text-gray-500">Spécialiste de la langue Tikar</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white">🎭</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Responsable Culture</h4>
            <p className="text-gray-600 mb-2">Mme [Nom Responsable]</p>
            <p className="text-sm text-gray-500">Organisation des événements culturels</p>
          </div>
        </div>
      </div>

      {/* Informations sur l'équipe */}
      <div className="mt-12 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Notre Équipe Pédagogique</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Enseignants de langue Tikar</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Natifs de Bankim et région de l'Adamaoua</li>
              <li>• Formation en linguistique africaine</li>
              <li>• Expérience dans l'enseignement aux enfants et adultes</li>
              <li>• Méthodes pédagogiques adaptées à la diaspora</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Animateurs culturels</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Maîtres de danse traditionnelle</li>
              <li>• Musiciens et percussionnistes</li>
              <li>• Artisans et sculpteurs</li>
              <li>• Conteurs et gardiens de la tradition orale</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
