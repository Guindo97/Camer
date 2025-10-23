import React from 'react'
import SimpleTikarImage from '../components/SimpleTikarImage'

export default function Galerie() {
  const events = [
    { 
      title: 'Festival de danse traditionnelle', 
      date: '2024', 
      g: 'from-yellow-400 to-red-500', 
      emoji: '💃',
      type: 'Danse',
      description: 'Célébration des danses traditionnelles Tikar',
      image: '/images/danse-tikar.jpg'
    },
    { 
      title: 'Cours de langue Tikar', 
      date: '2024', 
      g: 'from-red-500 to-pink-500', 
      emoji: '📚',
      type: 'Éducation',
      description: 'Séance d\'apprentissage de la langue Tikar',
      image: '/images/cours-langue.jpg'
    },
    { 
      title: 'Cérémonie traditionnelle', 
      date: '2024', 
      g: 'from-green-500 to-teal-500', 
      emoji: '🎭',
      type: 'Cérémonie',
      description: 'Rituel traditionnel du peuple Tikar',
      image: '/images/ceremonie-tikar.jpg'
    },
    { 
      title: 'Atelier de percussion', 
      date: '2024', 
      g: 'from-purple-500 to-indigo-500', 
      emoji: '🥁',
      type: 'Musique',
      description: 'Apprentissage des instruments traditionnels',
      image: '/images/percussion.jpg'
    },
    { 
      title: 'Exposition d\'artisanat', 
      date: '2024', 
      g: 'from-orange-500 to-red-500', 
      emoji: '🏺',
      type: 'Artisanat',
      description: 'Œuvres d\'art et artisanat Tikar',
      image: '/images/artisanat.jpg'
    },
    { 
      title: 'Conférence culturelle', 
      date: '2024', 
      g: 'from-teal-500 to-green-500', 
      emoji: '🎨',
      type: 'Conférence',
      description: 'Présentation sur l\'histoire Tikar',
      image: '/images/conference.jpg'
    },
    { 
      title: 'Rencontre communautaire', 
      date: '2024', 
      g: 'from-indigo-500 to-purple-500', 
      emoji: '🤝',
      type: 'Communauté',
      description: 'Rassemblement de la diaspora Tikar',
      image: '/images/communaute.jpg'
    },
    { 
      title: 'Festival annuel', 
      date: '2024', 
      g: 'from-pink-500 to-red-500', 
      emoji: '🎉',
      type: 'Festival',
      description: 'Grande célébration annuelle de la culture Tikar',
      image: '/images/festival.jpg'
    },
  ]

  const videos = [
    {
      title: 'Danses traditionnelles Tikar',
      description: 'Spectacle de danses traditionnelles lors du festival 2024',
      thumbnail: '/images/video-danse.jpg',
      duration: '5:30'
    },
    {
      title: 'Cours de langue en action',
      description: 'Séance d\'apprentissage de la langue Tikar avec nos enseignants',
      thumbnail: '/images/video-cours.jpg',
      duration: '8:15'
    },
    {
      title: 'Musique et chants traditionnels',
      description: 'Performance musicale avec instruments traditionnels',
      thumbnail: '/images/video-musique.jpg',
      duration: '6:45'
    },
    {
      title: 'Témoignages de la communauté',
      description: 'Membres de la diaspora partagent leur expérience',
      thumbnail: '/images/video-temoignages.jpg',
      duration: '12:20'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-red-800 mb-4">Galerie</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto" />
        <p className="text-lg text-gray-600 mt-4">Découvrez nos événements, danses, rencontres et moments de partage</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Tous</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Danses</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cours</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Événements</button>
      </div>

      {/* Grille de photos avec vraies images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {events.map((event, i) => (
          <div key={i} className="relative group rounded-lg overflow-hidden hover-lift cursor-pointer">
            <div className={`bg-gradient-to-br ${event.g} h-48 flex flex-col items-center justify-center relative`}>
              {/* Image de fond si disponible */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 text-center text-white">
                <span className="text-white text-4xl mb-2">{event.emoji}</span>
                <div className="text-sm font-semibold">{event.type}</div>
                <div className="text-xs opacity-90">{event.date}</div>
              </div>
              {/* Overlay au survol */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                  <div className="text-sm font-semibold mb-1">{event.title}</div>
                  <div className="text-xs">{event.description}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section vidéos améliorée */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Vidéos de nos événements</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-lg hover-lift">
              <div className="relative aspect-video bg-gradient-to-br from-red-400 to-yellow-500 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">▶️</div>
                    <div className="text-sm font-semibold">{video.duration}</div>
                  </div>
                </div>
                {/* Badge durée */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{video.title}</h4>
              <p className="text-sm text-gray-600">{video.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section photos du peuple Tikar */}
      <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Le peuple Tikar de Bankim</h3>
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src="/media/images/photos/tikar.png"
                  alt="Traditions ancestrales du peuple Tikar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Traditions ancestrales</h4>
              <p className="text-sm text-gray-600">Le peuple Tikar de Bankim préserve ses traditions millénaires</p>
            </div>
          
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🏘️</div>
                <div className="text-sm">Village de Bankim</div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Terre ancestrale</h4>
            <p className="text-sm text-gray-600">Bankim, berceau de la culture Tikar dans l'Adamaoua</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🌍</div>
                <div className="text-sm">Diaspora</div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Diaspora mondiale</h4>
            <p className="text-sm text-gray-600">La communauté Tikar à travers le monde</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors mr-4">Voir plus de photos</button>
        <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors">Voir les vidéos</button>
      </div>
    </div>
  )
}
