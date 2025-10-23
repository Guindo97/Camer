import React from 'react'

function Card({ icon, title, children }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl tikar-shadow hover-lift slide-in-left">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 tikar-gradient rounded-full flex items-center justify-center mr-4 cultural-float">
          <span className="text-2xl text-white">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-red-800">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Activites({ activitiesTitle }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 tikar-pattern opacity-20 rounded-3xl -m-8"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 tikar-gradient rounded-full flex items-center justify-center mr-4 cultural-float">
                <span className="text-white text-xl">🎓</span>
              </div>
              <h2 className="text-4xl font-bold text-red-800">{activitiesTitle}</h2>
              <div className="w-12 h-12 rounded-full flex items-center justify-center ml-4 cultural-float overflow-hidden">
                <img 
                  src="https://flagcdn.com/w40/cm.png" 
                  alt="Drapeau du Cameroun" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-32 h-1 tikar-gradient mx-auto rounded-full" />
          </div>
        </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card icon="📖" title="Cours de langue Tikar">
          <p className="text-gray-600 mb-4">Cours hebdomadaires pour tous niveaux, du débutant à l'avancé.</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Cours pour enfants (6-12 ans)</li>
            <li>• Cours pour adolescents (13-17 ans)</li>
            <li>• Cours pour adultes</li>
          </ul>
        </Card>

        <Card icon="🎪" title="Événements culturels">
          <p className="text-gray-600 mb-4">Conférences, ateliers et célébrations traditionnelles.</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Festivals annuels</li>
            <li>• Ateliers d'artisanat</li>
            <li>• Conférences historiques</li>
          </ul>
        </Card>

        <Card icon="🥁" title="Arts traditionnels">
          <p className="text-gray-600 mb-4">Apprentissage des danses, musiques et arts Tikar.</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Cours de danse traditionnelle</li>
            <li>• Initiation aux instruments</li>
            <li>• Sculpture et artisanat</li>
          </ul>
        </Card>
      </div>

      {/* Événements à venir avec affiches */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">Événements à venir</h3>
        
        {/* Affiches d'événements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">15 DÉCEMBRE 2024</div>
              <div className="text-2xl">🎉</div>
            </div>
            <h4 className="text-2xl font-bold mb-3">Festival de fin d'année</h4>
            <p className="text-white/90 mb-4">Célébration avec danses, musiques et plats traditionnels</p>
            <div className="flex items-center space-x-4 text-sm">
              <span>📍 Salle des fêtes, Paris</span>
              <span>🕐 18h00</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">JANVIER 2025</div>
              <div className="text-2xl">📚</div>
            </div>
            <h4 className="text-2xl font-bold mb-3">Nouvelle session de cours</h4>
            <p className="text-white/90 mb-4">Inscriptions ouvertes pour les cours de langue Tikar</p>
            <div className="flex items-center space-x-4 text-sm">
              <span>📍 Centre culturel</span>
              <span>🕐 Samedi 10h-12h</span>
            </div>
          </div>
        </div>

        {/* Calendrier des événements */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h4 className="text-xl font-bold text-red-800 mb-6">Calendrier 2025</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <div className="text-sm text-gray-500 mb-1">Février 2025</div>
              <h5 className="font-semibold text-gray-800">Atelier de danse traditionnelle</h5>
              <p className="text-gray-600 text-sm">Apprentissage des danses Tikar</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm text-gray-500 mb-1">Mars 2025</div>
              <h5 className="font-semibold text-gray-800">Conférence historique</h5>
              <p className="text-gray-600 text-sm">Histoire du peuple Tikar</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="text-sm text-gray-500 mb-1">Avril 2025</div>
              <h5 className="font-semibold text-gray-800">Festival culturel</h5>
              <p className="text-gray-600 text-sm">Grande célébration annuelle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
