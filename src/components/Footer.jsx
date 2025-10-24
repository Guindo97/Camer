import React from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-red-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{t('footer.title')}</h3>
          <p className="text-yellow-200 mb-6">{t('footer.subtitle')}</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#accueil" className="text-yellow-200 hover:text-yellow-300 transition-colors">{t('nav.home')}</a>
            <a href="#apropos" className="text-yellow-200 hover:text-yellow-300 transition-colors">{t('nav.about')}</a>
            <a href="#activites" className="text-yellow-200 hover:text-yellow-300 transition-colors">{t('nav.activities')}</a>
            <a href="#contact" className="text-yellow-200 hover:text-yellow-300 transition-colors">{t('nav.contact')}</a>
          </div>
          <p className="text-sm text-yellow-200">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
