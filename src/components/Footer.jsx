import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-red-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Association Culturelle Tikar</h3>
          <p className="text-yellow-200 mb-6">Préservons ensemble notre héritage culturel</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#accueil" className="text-yellow-200 hover:text-yellow-300 transition-colors">Accueil</a>
            <a href="#apropos" className="text-yellow-200 hover:text-yellow-300 transition-colors">À propos</a>
            <a href="#activites" className="text-yellow-200 hover:text-yellow-300 transition-colors">Activités</a>
            <a href="#contact" className="text-yellow-200 hover:text-yellow-300 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-yellow-200">© {new Date().getFullYear()} Association Culturelle Tikar. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
