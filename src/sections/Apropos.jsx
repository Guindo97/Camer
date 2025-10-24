import React, { useEffect, useRef } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Apropos() {
  const { t } = useTranslation()
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
              <h2 className="text-4xl font-bold text-red-800">{t('about.title')}</h2>
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
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('about.history')}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {t('about.historyDescription')}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {t('about.historyDescription2')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-red-800 mb-6">{t('about.ourObjectives')}</h3>
          <ul className="space-y-4">
            {t('about.objectives').map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 mr-3">
                  {index === 0 ? '🎯' : index === 1 ? '🎭' : index === 2 ? '🤝' : '📚'}
                </span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Membres du bureau et enseignants */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">{t('about.ourTeam')}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white">👑</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{t('about.president')}</h4>
            <p className="text-gray-600 mb-2">M. [Nom du Président]</p>
            <p className="text-sm text-gray-500">{t('about.presidentDescription')}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white">📚</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{t('about.teachers')}</h4>
            <p className="text-gray-600 mb-2">Dr. [Nom Enseignant]</p>
            <p className="text-sm text-gray-500">{t('about.teachersDescription')}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl text-white">🎭</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">{t('about.cultureManager')}</h4>
            <p className="text-gray-600 mb-2">Mme [Nom Responsable]</p>
            <p className="text-sm text-gray-500">{t('about.cultureManagerDescription')}</p>
          </div>
        </div>
      </div>

      {/* Informations sur l'équipe */}
      <div className="mt-12 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">{t('about.pedagogicalTeam')}</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('about.languageTeachers')}</h4>
            <ul className="space-y-2 text-gray-600">
              {t('about.languageTeachersList').map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('about.culturalAnimators')}</h4>
            <ul className="space-y-2 text-gray-600">
              {t('about.culturalAnimatorsList').map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
