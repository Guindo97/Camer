import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function AdminPanel({ isOpen, onClose }) {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  // Mot de passe simple pour l'équipe
  const ADMIN_PASSWORD = 'tikar2024'

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError(t('admin.wrongPassword'))
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-800 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 tikar-gradient rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-xl">👑</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t('admin.panelTitle')}</h2>
                <p className="text-red-200">{t('admin.panelSubtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {!isAuthenticated ? (
            /* Formulaire de connexion */
            <div className="max-w-md mx-auto">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('admin.enterPassword')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder={t('admin.passwordPlaceholder')}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  {t('admin.accessPanel')}
                </button>
              </form>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>{t('admin.note')}:</strong> {t('admin.passwordNote')}
                </p>
              </div>
            </div>
          ) : (
            /* Panneau d'administration */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">{t('admin.managementPanel')}</h3>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  {t('admin.logout')}
                </button>
              </div>

              {/* Actions rapides */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-100 transition-colors">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">🎪</span>
                    <span className="font-medium">{t('admin.manageEvents')}</span>
                  </div>
                </button>

                <button className="p-4 bg-green-50 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-100 transition-colors">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">📚</span>
                    <span className="font-medium">{t('admin.manageCourses')}</span>
                  </div>
                </button>

                <button className="p-4 bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-100 transition-colors">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">📢</span>
                    <span className="font-medium">{t('admin.manageAnnouncements')}</span>
                  </div>
                </button>

                <button className="p-4 bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-100 transition-colors">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">📸</span>
                    <span className="font-medium">{t('admin.managePhotos')}</span>
                  </div>
                </button>
              </div>

              {/* Sections de gestion */}
              <div className="space-y-4">
                {/* Gestion des événements */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎪</span>
                    {t('admin.eventsSection')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.eventTitle')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.eventTitlePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.eventDate')}
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.eventDescription')}
                      </label>
                      <textarea
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.eventDescriptionPlaceholder')}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        {t('admin.addEvent')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gestion des cours */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📚</span>
                    {t('admin.coursesSection')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.courseTitle')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.courseTitlePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.courseLevel')}
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                        <option>{t('language.beginner')}</option>
                        <option>{t('language.intermediate')}</option>
                        <option>{t('dictionary.advanced')}</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.courseDescription')}
                      </label>
                      <textarea
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.courseDescriptionPlaceholder')}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        {t('admin.addCourse')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gestion des annonces */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📢</span>
                    {t('admin.announcementsSection')}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.announcementTitle')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.announcementTitlePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.announcementContent')}
                      </label>
                      <textarea
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.announcementContentPlaceholder')}
                      />
                    </div>
                    <div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        {t('admin.publishAnnouncement')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gestion des photos */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">📸</span>
                    {t('admin.photosSection')}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.uploadPhotos')}
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.photoDescription')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder={t('admin.photoDescriptionPlaceholder')}
                      />
                    </div>
                    <div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        {t('admin.uploadPhotos')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton de fermeture en bas */}
              <div className="flex justify-center pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {t('admin.closePanel')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
