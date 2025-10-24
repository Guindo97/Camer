import React, { useEffect, useRef } from 'react'
import FillTikarImage from '../components/FillTikarImage'
import { useTranslation } from '../hooks/useTranslation'

export default function Accueil() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in') })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section avec image du peuple Tikar */}
      <div className="text-center mb-16 relative">
        {/* Drapeau du Cameroun en arrière-plan */}
        <div className="absolute inset-0 cameroon-gradient opacity-10 rounded-3xl -m-8"></div>
        
        {/* Titre principal avec style camerounais */}
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4 cultural-float overflow-hidden">
              <img 
                src="https://flagcdn.com/w40/cm.png" 
                alt="Drapeau du Cameroun" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-red-800 mb-6">{t('home.title')}</h1>
            <div className="w-16 h-16 tikar-gold rounded-full flex items-center justify-center ml-4 cultural-float">
              <span className="text-white text-2xl">👑</span>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto tikar-shadow">
            <p className="text-xl md:text-2xl text-gray-800 mb-4 font-medium">{t('home.welcome')}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-3 h-3 cameroon-green rounded-full mr-2"></span>
                <span>{t('home.tikarPeople')}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 cameroon-red rounded-full mr-2"></span>
                <span>{t('home.bankim')}</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 cameroon-yellow rounded-full mr-2"></span>
                <span>{t('home.cameroon')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Image représentative du peuple Tikar */}
        <div className="mb-16">
          <div className="relative w-3/4 mx-auto h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Fond flou qui remplit l'espace */}
            <img 
              src="/media/images/photos/tikar.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
            />
            {/* Image nette par-dessus, entière */}
            <img 
              src="/media/images/photos/tikar.png"
              alt="Peuple Tikar de Bankim"
              className="relative z-10 w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
              <h3 className="text-white text-lg font-bold">{t('home.tikarPeopleTitle')}</h3>
              <p className="text-white/90 text-sm">{t('home.ancestralLand')}</p>
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg z-20">
              <span className="text-3xl">🥁</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg z-20">
              <span className="text-2xl">🎭</span>
            </div>
          </div>
        </div>

      {/* Présentation de l'association */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl tikar-shadow slide-in-left">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 cameroon-gradient rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl">🏛️</span>
            </div>
            <h2 className="text-3xl font-bold text-red-800">{t('home.ourAssociation')}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {t('home.associationDescription')}
          </p>
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl">
            <div className="w-12 h-12 tikar-gold rounded-full flex items-center justify-center cultural-float">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{t('home.diaspora')}</h4>
              <p className="text-sm text-gray-600">{t('home.diasporaDescription')}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-green-50 rounded-2xl p-8 tikar-shadow slide-in-right">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 tikar-gradient rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{t('home.ourValues')}</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white/70 rounded-xl hover-lift">
              <div className="w-12 h-12 cameroon-green rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl text-white">🏛️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{t('home.tradition')}</h4>
                <p className="text-sm text-gray-600">{t('home.traditionDescription')}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white/70 rounded-xl hover-lift">
              <div className="w-12 h-12 cameroon-red rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl text-white">📚</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{t('home.education')}</h4>
                <p className="text-sm text-gray-600">{t('home.educationDescription')}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white/70 rounded-xl hover-lift">
              <div className="w-12 h-12 cameroon-yellow rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{t('home.community')}</h4>
                <p className="text-sm text-gray-600">{t('home.communityDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
