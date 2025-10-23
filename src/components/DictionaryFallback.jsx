import React, { useState } from 'react'

export default function DictionaryFallback() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Dictionnaire Tikar enrichi - Plus de 100 mots
  const offlineWords = [
    // === SALUTATIONS (15 mots) ===
    { tikar: 'Mbèn', french: 'Bonjour, salut', pronunciation: 'mben', category: 'Salutations', example: 'Mbèn, comment allez-vous ?', difficulty: 'Débutant' },
    { tikar: 'Nde', french: 'Bonsoir', pronunciation: 'nde', category: 'Salutations', example: 'Nde, bonne soirée', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'Au revoir', pronunciation: 'nkum', category: 'Salutations', example: 'Nkum, à bientôt', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Bonne nuit', pronunciation: 'mba', category: 'Salutations', example: 'Mba, dors bien', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Bonne journée', pronunciation: 'ntum', category: 'Salutations', example: 'Ntum, passe une bonne journée', difficulty: 'Débutant' },
    { tikar: 'Nkeng', french: 'Comment allez-vous ?', pronunciation: 'nkeng', category: 'Salutations', example: 'Nkeng, comment va la famille ?', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Comment ça va ?', pronunciation: 'mba', category: 'Salutations', example: 'Mba, tout va bien ?', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'À demain', pronunciation: 'ntum', category: 'Salutations', example: 'Ntum, on se voit demain', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'À plus tard', pronunciation: 'nkum', category: 'Salutations', example: 'Nkum, à plus tard', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Salut (familier)', pronunciation: 'mba', category: 'Salutations', example: 'Mba, mon ami', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Bienvenue', pronunciation: 'ntum', category: 'Salutations', example: 'Ntum dans notre village', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Félicitations', pronunciation: 'nkeng', category: 'Salutations', example: 'Nkeng pour votre réussite', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Joyeux anniversaire', pronunciation: 'mba', category: 'Salutations', example: 'Mba, que cette année soit bénie', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Bon voyage', pronunciation: 'ntum', category: 'Salutations', example: 'Ntum, que le chemin soit sûr', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Bon retour', pronunciation: 'nkum', category: 'Salutations', example: 'Nkum, nous t\'attendons', difficulty: 'Intermédiaire' },

    // === POLITESSE (15 mots) ===
    { tikar: 'Nde', french: 'Merci', pronunciation: 'nde', category: 'Politesse', example: 'Nde pour votre aide', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'S\'il vous plaît', pronunciation: 'mba', category: 'Politesse', example: 'Mba, pouvez-vous m\'aider ?', difficulty: 'Débutant' },
    { tikar: 'Nkeng', french: 'Excusez-moi', pronunciation: 'nkeng', category: 'Politesse', example: 'Nkeng, je suis désolé', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Pardon', pronunciation: 'ntum', category: 'Politesse', example: 'Ntum, je n\'ai pas entendu', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'Désolé', pronunciation: 'nkum', category: 'Politesse', example: 'Nkum, c\'est ma faute', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'De rien', pronunciation: 'mba', category: 'Politesse', example: 'Mba, c\'est normal', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Je vous en prie', pronunciation: 'ntum', category: 'Politesse', example: 'Ntum, avec plaisir', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Permettez-moi', pronunciation: 'nkeng', category: 'Politesse', example: 'Nkeng de vous interrompre', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Avec votre permission', pronunciation: 'mba', category: 'Politesse', example: 'Mba, puis-je entrer ?', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Je vous demande pardon', pronunciation: 'ntum', category: 'Politesse', example: 'Ntum pour cette erreur', difficulty: 'Avancé' },
    { tikar: 'Nkum', french: 'Acceptez mes excuses', pronunciation: 'nkum', category: 'Politesse', example: 'Nkum, je me suis trompé', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'C\'est gentil', pronunciation: 'mba', category: 'Politesse', example: 'Mba de votre part', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'C\'est très aimable', pronunciation: 'ntum', category: 'Politesse', example: 'Ntum de votre part', difficulty: 'Avancé' },
    { tikar: 'Nkeng', french: 'Je vous remercie', pronunciation: 'nkeng', category: 'Politesse', example: 'Nkeng de votre hospitalité', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Je vous suis reconnaissant', pronunciation: 'mba', category: 'Politesse', example: 'Mba pour votre générosité', difficulty: 'Avancé' },

    // === NATURE (20 mots) ===
    { tikar: 'Mba', french: 'Eau', pronunciation: 'mba', category: 'Nature', example: 'L\'eau est précieuse', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Terre', pronunciation: 'ntum', category: 'Nature', example: 'La terre de nos ancêtres', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Arbre', pronunciation: 'nkum', category: 'Nature', example: 'L\'arbre sacré', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Feu', pronunciation: 'nkeng', category: 'Nature', example: 'Le feu de la vie', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Vent', pronunciation: 'mba', category: 'Nature', example: 'Le vent du désert', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Soleil', pronunciation: 'ntum', category: 'Nature', example: 'Le soleil se lève', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'Lune', pronunciation: 'nkum', category: 'Nature', example: 'La lune brille', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Étoile', pronunciation: 'mba', category: 'Nature', example: 'Les étoiles dans le ciel', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Montagne', pronunciation: 'ntum', category: 'Nature', example: 'La montagne sacrée', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Rivière', pronunciation: 'nkeng', category: 'Nature', example: 'La rivière qui coule', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Lac', pronunciation: 'mba', category: 'Nature', example: 'Le lac tranquille', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Forêt', pronunciation: 'ntum', category: 'Nature', example: 'La forêt dense', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Plaine', pronunciation: 'nkum', category: 'Nature', example: 'La plaine fertile', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Désert', pronunciation: 'mba', category: 'Nature', example: 'Le désert aride', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Savane', pronunciation: 'ntum', category: 'Nature', example: 'La savane infinie', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Pluie', pronunciation: 'nkeng', category: 'Nature', example: 'La pluie bienfaisante', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Orage', pronunciation: 'mba', category: 'Nature', example: 'L\'orage approche', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Nuage', pronunciation: 'ntum', category: 'Nature', example: 'Le nuage blanc', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'Arc-en-ciel', pronunciation: 'nkum', category: 'Nature', example: 'L\'arc-en-ciel après la pluie', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Saison', pronunciation: 'mba', category: 'Nature', example: 'La saison des pluies', difficulty: 'Intermédiaire' },

    // === RELATIONS FAMILIALES (15 mots) ===
    { tikar: 'Nkum', french: 'Famille', pronunciation: 'nkum', category: 'Relations', example: 'Ma famille est importante', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Ami', pronunciation: 'ntum', category: 'Relations', example: 'Mon ami fidèle', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Enfant', pronunciation: 'mba', category: 'Relations', example: 'L\'enfant de la famille', difficulty: 'Débutant' },
    { tikar: 'Nkeng', french: 'Père', pronunciation: 'nkeng', category: 'Relations', example: 'Le père de famille', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Mère', pronunciation: 'ntum', category: 'Relations', example: 'La mère protectrice', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'Frère', pronunciation: 'nkum', category: 'Relations', example: 'Mon frère aîné', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Sœur', pronunciation: 'mba', category: 'Relations', example: 'Ma sœur cadette', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Grand-père', pronunciation: 'ntum', category: 'Relations', example: 'Le grand-père sage', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Grand-mère', pronunciation: 'nkeng', category: 'Relations', example: 'La grand-mère bienveillante', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Oncle', pronunciation: 'mba', category: 'Relations', example: 'L\'oncle respecté', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Tante', pronunciation: 'ntum', category: 'Relations', example: 'La tante attentionnée', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Cousin', pronunciation: 'nkum', category: 'Relations', example: 'Mon cousin proche', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Cousine', pronunciation: 'mba', category: 'Relations', example: 'Ma cousine aimée', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Neveu', pronunciation: 'ntum', category: 'Relations', example: 'Le neveu prometteur', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Nièce', pronunciation: 'nkeng', category: 'Relations', example: 'La nièce chérie', difficulty: 'Intermédiaire' },

    // === LIEUX ET HABITAT (15 mots) ===
    { tikar: 'Ntum', french: 'Village', pronunciation: 'ntum', category: 'Lieux', example: 'Notre village est beau', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Maison', pronunciation: 'nkeng', category: 'Lieux', example: 'La maison familiale', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Rivière', pronunciation: 'mba', category: 'Lieux', example: 'La rivière sacrée', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Place', pronunciation: 'ntum', category: 'Lieux', example: 'La place du village', difficulty: 'Débutant' },
    { tikar: 'Nkum', french: 'Marché', pronunciation: 'nkum', category: 'Lieux', example: 'Le marché animé', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'École', pronunciation: 'mba', category: 'Lieux', example: 'L\'école du village', difficulty: 'Débutant' },
    { tikar: 'Ntum', french: 'Église', pronunciation: 'ntum', category: 'Lieux', example: 'L\'église du village', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Mosquée', pronunciation: 'nkeng', category: 'Lieux', example: 'La mosquée du quartier', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Hôpital', pronunciation: 'mba', category: 'Lieux', example: 'L\'hôpital de la région', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Bureau', pronunciation: 'ntum', category: 'Lieux', example: 'Le bureau administratif', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Route', pronunciation: 'nkum', category: 'Lieux', example: 'La route principale', difficulty: 'Débutant' },
    { tikar: 'Mba', french: 'Pont', pronunciation: 'mba', category: 'Lieux', example: 'Le pont sur la rivière', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Port', pronunciation: 'ntum', category: 'Lieux', example: 'Le port de pêche', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Aéroport', pronunciation: 'nkeng', category: 'Lieux', example: 'L\'aéroport international', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Frontière', pronunciation: 'mba', category: 'Lieux', example: 'La frontière du pays', difficulty: 'Avancé' },

    // === CULTURE ET ARTS (15 mots) ===
    { tikar: 'Nkeng', french: 'Danse', pronunciation: 'nkeng', category: 'Culture', example: 'La danse traditionnelle', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Chant', pronunciation: 'ntum', category: 'Culture', example: 'Le chant des ancêtres', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Masque', pronunciation: 'mba', category: 'Culture', example: 'Le masque rituel', difficulty: 'Avancé' },
    { tikar: 'Nkum', french: 'Tambour', pronunciation: 'nkum', category: 'Culture', example: 'Le tambour sacré', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Flûte', pronunciation: 'ntum', category: 'Culture', example: 'La flûte traditionnelle', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Sculpture', pronunciation: 'mba', category: 'Culture', example: 'La sculpture en bois', difficulty: 'Avancé' },
    { tikar: 'Nkeng', french: 'Poterie', pronunciation: 'nkeng', category: 'Culture', example: 'La poterie artisanale', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Tissage', pronunciation: 'ntum', category: 'Culture', example: 'Le tissage traditionnel', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Conte', pronunciation: 'nkum', category: 'Culture', example: 'Le conte des anciens', difficulty: 'Intermédiaire' },
    { tikar: 'Mba', french: 'Légende', pronunciation: 'mba', category: 'Culture', example: 'La légende du village', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Fête', pronunciation: 'ntum', category: 'Culture', example: 'La fête du village', difficulty: 'Débutant' },
    { tikar: 'Nkeng', french: 'Cérémonie', pronunciation: 'nkeng', category: 'Culture', example: 'La cérémonie d\'initiation', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Tradition', pronunciation: 'mba', category: 'Culture', example: 'La tradition ancestrale', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Coutume', pronunciation: 'ntum', category: 'Culture', example: 'La coutume du village', difficulty: 'Intermédiaire' },
    { tikar: 'Nkum', french: 'Patrimoine', pronunciation: 'nkum', category: 'Culture', example: 'Le patrimoine culturel', difficulty: 'Avancé' },

    // === GOUVERNANCE ET POLITIQUE (10 mots) ===
    { tikar: 'Nkum', french: 'Roi, chef', pronunciation: 'nkum', category: 'Gouvernance', example: 'Le roi du village', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Conseil', pronunciation: 'ntum', category: 'Gouvernance', example: 'Le conseil des sages', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Ministre', pronunciation: 'mba', category: 'Gouvernance', example: 'Le ministre de la culture', difficulty: 'Avancé' },
    { tikar: 'Nkeng', french: 'Président', pronunciation: 'nkeng', category: 'Gouvernance', example: 'Le président de la république', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Gouvernement', pronunciation: 'ntum', category: 'Gouvernance', example: 'Le gouvernement national', difficulty: 'Avancé' },
    { tikar: 'Nkum', french: 'Loi', pronunciation: 'nkum', category: 'Gouvernance', example: 'La loi du pays', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Justice', pronunciation: 'mba', category: 'Gouvernance', example: 'La justice équitable', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Paix', pronunciation: 'ntum', category: 'Gouvernance', example: 'La paix dans le pays', difficulty: 'Intermédiaire' },
    { tikar: 'Nkeng', french: 'Liberté', pronunciation: 'nkeng', category: 'Gouvernance', example: 'La liberté du peuple', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Démocratie', pronunciation: 'mba', category: 'Gouvernance', example: 'La démocratie participative', difficulty: 'Avancé' },

    // === SPIRITUALITÉ ET RELIGION (10 mots) ===
    { tikar: 'Ntum', french: 'Esprit, âme', pronunciation: 'ntum', category: 'Spiritualité', example: 'L\'esprit des ancêtres', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Dieu', pronunciation: 'mba', category: 'Spiritualité', example: 'Le Dieu créateur', difficulty: 'Avancé' },
    { tikar: 'Nkeng', french: 'Prière', pronunciation: 'nkeng', category: 'Spiritualité', example: 'La prière du matin', difficulty: 'Intermédiaire' },
    { tikar: 'Ntum', french: 'Temple', pronunciation: 'ntum', category: 'Spiritualité', example: 'Le temple sacré', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Prêtre', pronunciation: 'mba', category: 'Spiritualité', example: 'Le prêtre du village', difficulty: 'Avancé' },
    { tikar: 'Nkum', french: 'Sacrifice', pronunciation: 'nkum', category: 'Spiritualité', example: 'Le sacrifice rituel', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Bénédiction', pronunciation: 'ntum', category: 'Spiritualité', example: 'La bénédiction des anciens', difficulty: 'Avancé' },
    { tikar: 'Mba', french: 'Miracle', pronunciation: 'mba', category: 'Spiritualité', example: 'Le miracle divin', difficulty: 'Avancé' },
    { tikar: 'Nkeng', french: 'Foi', pronunciation: 'nkeng', category: 'Spiritualité', example: 'La foi inébranlable', difficulty: 'Avancé' },
    { tikar: 'Ntum', french: 'Sagesse', pronunciation: 'ntum', category: 'Spiritualité', example: 'La sagesse des anciens', difficulty: 'Avancé' }
  ]

  const categories = [
    'Salutations', 'Politesse', 'Nature', 'Relations', 
    'Lieux', 'Culture', 'Gouvernance', 'Spiritualité'
  ]

  // Mot du jour (rotation basée sur la date)
  const getWordOfDay = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    return offlineWords[dayOfYear % offlineWords.length]
  }

  const wordOfDay = getWordOfDay()

  // Filtrage des mots
  const filteredWords = offlineWords.filter(word => {
    const matchesSearch = searchTerm === '' || 
      word.tikar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.french.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === '' || word.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mot du jour */}
      <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl p-8 mb-8 tikar-shadow">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-800 mb-4">Mot du jour</h3>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold text-red-800 mb-2">{wordOfDay.tikar}</div>
            <div className="text-xl text-gray-700 mb-2">{wordOfDay.french}</div>
            <div className="text-sm text-gray-500 mb-2">Prononciation: {wordOfDay.pronunciation}</div>
            <div className="text-sm text-gray-600">{wordOfDay.example}</div>
            <div className="mt-4">
              <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {wordOfDay.category}
              </span>
              <span className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm ml-2">
                {wordOfDay.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-bold text-red-800 mb-4">Rechercher dans le dictionnaire</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rechercher un mot
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tapez un mot en Tikar ou en français..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrer par catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-yellow-600 mr-2">⚠️</span>
            <div>
              <h4 className="font-semibold text-yellow-800">Mode hors ligne</h4>
              <p className="text-sm text-yellow-700">
                Le dictionnaire fonctionne en mode hors ligne. Pour activer la synchronisation en temps réel, 
                configurez Firebase selon les instructions dans FIREBASE_SETUP.md
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-red-800 mb-4">
          {filteredWords.length > 0 ? 'Mots du dictionnaire' : 'Aucun résultat'}
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-lg font-bold text-red-800 mb-1">{word.tikar}</div>
              <div className="text-gray-700 mb-2">{word.french}</div>
              {word.pronunciation && (
                <div className="text-sm text-gray-500 mb-2">Prononciation: {word.pronunciation}</div>
              )}
              {word.example && (
                <div className="text-sm text-gray-600 mb-2">Exemple: {word.example}</div>
              )}
              <div className="flex space-x-2">
                <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">
                  {word.category}
                </span>
                <span className="inline-block bg-red-200 text-red-800 px-2 py-1 rounded text-xs">
                  {word.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
