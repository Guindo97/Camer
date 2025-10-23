import React, { useState } from 'react'

export default function NavBar({ title }) {
  const [open, setOpen] = useState(false)

  const NavLink = ({ href, children }) => (
    <a href={href} className="text-yellow-100 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
      {children}
    </a>
  )

  return (
    <nav className="bg-red-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {/* Logo Tikar symbolique avec drapeau camerounais */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center tikar-shadow cultural-float overflow-hidden">
                <img 
                  src="https://flagcdn.com/w40/cm.png" 
                  alt="Drapeau du Cameroun" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 tikar-gradient rounded-full flex items-center justify-center tikar-shadow cultural-float">
                <span className="text-white text-xl">👑</span>
              </div>
              <div className="text-2xl font-bold text-yellow-300">{title}</div>
            </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="#accueil">🏠 Accueil</NavLink>
              <NavLink href="#apropos">🌿 À propos</NavLink>
              <NavLink href="#activites">🎓 Activités</NavLink>
              <NavLink href="#langue">🗣️ Langue</NavLink>
              <NavLink href="#galerie">📸 Galerie</NavLink>
              <NavLink href="#contact">🤝 Contact</NavLink>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(o => !o)} className="text-yellow-100 hover:text-yellow-300 focus:outline-none" aria-label="Ouvrir le menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-red-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a onClick={() => setOpen(false)} href="#accueil" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">🏠 Accueil</a>
            <a onClick={() => setOpen(false)} href="#apropos" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">🌿 À propos</a>
            <a onClick={() => setOpen(false)} href="#activites" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">🎓 Activités</a>
            <a onClick={() => setOpen(false)} href="#langue" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">🗣️ Langue</a>
            <a onClick={() => setOpen(false)} href="#galerie" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">📸 Galerie</a>
            <a onClick={() => setOpen(false)} href="#contact" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">🤝 Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}
