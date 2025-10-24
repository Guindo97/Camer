import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'
import AdminPanel from './AdminPanel'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const { t } = useTranslation()
  const { language, toggleLanguage } = useLanguage()

  const NavLink = ({ href, children }) => (
    <a href={href} className="text-yellow-100 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
      {children}
    </a>
  )

  return (
    <nav className="bg-red-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
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
            <div className="text-2xl font-bold text-yellow-300">{t('home.title')}</div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <NavLink href="#accueil">{t('nav.home')}</NavLink>
              <NavLink href="#apropos">{t('nav.about')}</NavLink>
              <NavLink href="#activites">{t('nav.activities')}</NavLink>
              <NavLink href="#langue">{t('nav.language')}</NavLink>
              <NavLink href="#galerie">{t('nav.gallery')}</NavLink>
              <NavLink href="#contact">{t('nav.contact')}</NavLink>
            </div>
          </div>

              {/* Sélecteur de langue et Admin - Visible sur desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors border border-white/30"
                >
                  <span className="text-white font-semibold text-sm">
                    {language === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
                  </span>
                </button>
                
                {/* Bouton Admin discret */}
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors border border-white/20"
                  title={t('admin.accessPanel')}
                >
                  <span className="text-white text-sm">⚙️</span>
                </button>
              </div>

          {/* Menu hamburger mobile */}
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
              <a onClick={() => setOpen(false)} href="#accueil" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">{t('nav.home')}</a>
              <a onClick={() => setOpen(false)} href="#apropos" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">{t('nav.about')}</a>
              <a onClick={() => setOpen(false)} href="#activites" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">{t('nav.activities')}</a>
              <a onClick={() => setOpen(false)} href="#langue" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">{t('nav.language')}</a>
              <a onClick={() => setOpen(false)} href="#galerie" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">{t('nav.gallery')}</a>
              <a onClick={() => setOpen(false)} href="#contact" className="block px-3 py-2 text-yellow-100 hover:text-yellow-300 rounded-md text-base font-medium">{t('nav.contact')}</a>
              
                  {/* Sélecteur de langue et Admin mobile */}
                  <div className="pt-4 border-t border-red-700 space-y-2">
                    <button
                      onClick={() => {
                        toggleLanguage()
                        setOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-yellow-100 hover:text-yellow-300 rounded-lg text-base font-semibold transition-colors"
                    >
                      <span className="text-lg">{language === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                      <span>{language === 'fr' ? 'FRANÇAIS' : 'ENGLISH'}</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowAdminPanel(true)
                        setOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-yellow-100 hover:text-yellow-300 rounded-lg text-base font-semibold transition-colors"
                    >
                      <span className="text-lg">⚙️</span>
                      <span>{t('admin.accessPanel')}</span>
                    </button>
                  </div>
            </div>
          </div>
        )}

        {/* Panneau d'administration */}
        <AdminPanel 
          isOpen={showAdminPanel} 
          onClose={() => setShowAdminPanel(false)} 
        />
    </nav>
  )
}
