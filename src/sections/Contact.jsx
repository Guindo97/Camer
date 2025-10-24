import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const t = setTimeout(() => setSent(false), 5000)
    e.target.reset()
    return () => clearTimeout(t)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-red-800 mb-4">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto" />
        </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Formulaire d'inscription */}
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-red-800 mb-6">{t('contact.registrationForm')}</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.fullName')}</label>
              <input id="nom" name="nom" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')}</label>
              <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.phone')}</label>
              <input id="telephone" name="telephone" type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="activite" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.activityInterest')}</label>
              <select id="activite" name="activite" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">{t('contact.chooseActivity')}</option>
                <option value="cours-langue">{t('contact.languageCourse')}</option>
                <option value="danse">{t('contact.dance')}</option>
                <option value="musique">{t('contact.music')}</option>
                <option value="artisanat">{t('contact.craft')}</option>
                <option value="toutes">{t('contact.allActivities')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.message')}</label>
              <textarea id="message" name="message" rows="3" placeholder={t('contact.messagePlaceholder')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">{t('contact.register')}</button>
          </form>

          {sent && (
            <div className="mt-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-700">
              {t('contact.thankYouMessage')}
            </div>
          )}
        </div>

        {/* Informations de contact */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-800 mb-6">{t('contact.contactUs')}</h3>
            <div className="space-y-4">
              <div className="flex items-center"><span className="text-2xl mr-4">📧</span>
                <div>
                  <h4 className="font-semibold">{t('contact.mainEmail')}</h4>
                  <p className="text-gray-600">{t('contact.mainEmailAddress')}</p>
                </div>
              </div>
              <div className="flex items-center"><span className="text-2xl mr-4">📱</span>
                <div>
                  <h4 className="font-semibold">{t('contact.whatsappOffice')}</h4>
                  <p className="text-gray-600">{t('contact.whatsappNumber')}</p>
                </div>
              </div>
              <div className="flex items-center"><span className="text-2xl mr-4">📍</span>
                <div>
                  <h4 className="font-semibold">{t('contact.address')}</h4>
                  <p className="text-gray-600">{t('contact.addressDetails')}</p>
                </div>
              </div>
              <div className="flex items-center"><span className="text-2xl mr-4">🕒</span>
                <div>
                  <h4 className="font-semibold">{t('contact.hours')}</h4>
                  <p className="text-gray-600">{t('contact.hoursDetails')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-800 mb-6">{t('contact.followUs')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://facebook.com/association.tikar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <span className="mr-2">📘</span> {t('contact.facebook')}
              </a>
              <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <span className="mr-2">💬</span> {t('contact.whatsapp')}
              </a>
              <a href="https://youtube.com/@associationtikar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <span className="mr-2">📺</span> {t('contact.youtube')}
              </a>
              <a href="https://tiktok.com/@associationtikar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <span className="mr-2">🎵</span> {t('contact.tiktok')}
              </a>
            </div>
            
            {/* Informations de contact détaillées */}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <h4 className="font-semibold text-gray-800 mb-4">{t('contact.directContact')}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="text-lg mr-3">📧</span>
                  <div>
                    <div className="font-medium">{t('contact.mainEmail')}</div>
                    <div className="text-gray-600">{t('contact.mainEmailAddress')}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">📱</span>
                  <div>
                    <div className="font-medium">{t('contact.whatsappOffice')}</div>
                    <div className="text-gray-600">{t('contact.whatsappNumber')}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">👑</span>
                  <div>
                    <div className="font-medium">Président</div>
                    <div className="text-gray-600">M. Jean-Baptiste Tikar</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">📚</span>
                  <div>
                    <div className="font-medium">Responsable Pédagogique</div>
                    <div className="text-gray-600">Dr Marie Tikar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
