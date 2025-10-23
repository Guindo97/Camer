import React, { useState } from 'react'

export default function Contact({ contactTitle }) {
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
        <h2 className="text-4xl font-bold text-red-800 mb-4">{contactTitle}</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Formulaire d'inscription */}
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-red-800 mb-6">Formulaire d'inscription</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input id="nom" name="nom" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input id="telephone" name="telephone" type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="activite" className="block text-sm font-medium text-gray-700 mb-1">Activité d'intérêt</label>
              <select id="activite" name="activite" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">Choisissez une activité</option>
                <option value="cours-langue">Cours de langue Tikar</option>
                <option value="danse">Danse traditionnelle</option>
                <option value="musique">Musique et instruments</option>
                <option value="artisanat">Artisanat</option>
                <option value="toutes">Toutes les activités</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows="3" placeholder="Parlez-nous de votre motivation..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"/>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">S'inscrire</button>
          </form>

          {sent && (
            <div className="mt-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-700">
              Merci pour votre inscription ! Nous vous contacterons bientôt.
            </div>
          )}
        </div>

        {/* Informations de contact */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-800 mb-6">Contactez-nous</h3>
            <div className="space-y-4">
              <div className="flex items-center"><span className="text-2xl mr-4">📧</span>
                <div>
                  <h4 className="font-semibold">Email principal</h4>
                  <p className="text-gray-600">contact@association-tikar.fr</p>
                </div>
              </div>
              <div className="flex items-center"><span className="text-2xl mr-4">📱</span>
                <div>
                  <h4 className="font-semibold">WhatsApp Bureau</h4>
                  <p className="text-gray-600">+33 6 12 34 56 78</p>
                </div>
              </div>
              <div className="flex items-center"><span className="text-2xl mr-4">📍</span>
                <div>
                  <h4 className="font-semibold">Adresse</h4>
                  <p className="text-gray-600">15 Rue de la Culture, 75015 Paris</p>
                </div>
              </div>
              <div className="flex items-center"><span className="text-2xl mr-4">🕒</span>
                <div>
                  <h4 className="font-semibold">Horaires</h4>
                  <p className="text-gray-600">Lun-Ven: 9h-18h, Sam: 10h-16h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-800 mb-6">Suivez-nous</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://facebook.com/association.tikar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <span className="mr-2">📘</span> Facebook
              </a>
              <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <span className="mr-2">💬</span> WhatsApp
              </a>
              <a href="https://youtube.com/@associationtikar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <span className="mr-2">📺</span> YouTube
              </a>
              <a href="https://tiktok.com/@associationtikar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <span className="mr-2">🎵</span> TikTok
              </a>
            </div>
            
            {/* Informations de contact détaillées */}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <h4 className="font-semibold text-gray-800 mb-4">Contact direct</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="text-lg mr-3">📧</span>
                  <div>
                    <div className="font-medium">Email principal</div>
                    <div className="text-gray-600">contact@association-tikar.fr</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-3">📱</span>
                  <div>
                    <div className="font-medium">WhatsApp Bureau</div>
                    <div className="text-gray-600">+33 6 12 34 56 78</div>
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
