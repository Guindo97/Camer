import React, { useState, useEffect } from 'react'
import { 
  getWordOfDay, 
  getAllWords, 
  searchWords, 
  getWordsByCategory,
  initialWords,
  addWord 
} from '../services/dictionaryService'
import DictionaryFallback from './DictionaryFallback'
import { useTranslation } from '../hooks/useTranslation'

export default function Dictionary() {
  const { t } = useTranslation()
  const [wordOfDay, setWordOfDay] = useState(null)
  const [allWords, setAllWords] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [firebaseError, setFirebaseError] = useState(false)
  const [newWord, setNewWord] = useState({
    tikar: '',
    french: '',
    pronunciation: '',
    category: '',
    example: '',
    difficulty: 'Débutant'
  })

  const categories = [
    t('dictionary.categories.greetings'), t('dictionary.categories.politeness'), t('dictionary.categories.nature'), t('dictionary.categories.relationships'), 
    t('dictionary.categories.places'), t('dictionary.categories.culture'), t('dictionary.categories.governance'), t('dictionary.categories.spirituality')
  ]

  const difficulties = [t('language.beginner'), t('language.intermediate'), t('dictionary.advanced')]

  useEffect(() => {
    loadWordOfDay()
    loadAllWords()
  }, [])

  const loadWordOfDay = async () => {
    try {
      const word = await getWordOfDay()
      setWordOfDay(word)
    } catch (error) {
      console.error('Erreur lors du chargement du mot du jour:', error)
      setFirebaseError(true)
      // Mot du jour par défaut en cas d'erreur
      setWordOfDay({
        word: {
          tikar: 'Mbèn',
          french: 'Bonjour, salut',
          pronunciation: 'mben',
          category: 'Salutations',
          example: 'Mbèn, comment allez-vous ?',
          difficulty: 'Débutant'
        }
      })
    }
  }

  const loadAllWords = async () => {
    try {
      const words = await getAllWords()
      setAllWords(words)
    } catch (error) {
      console.error('Erreur lors du chargement des mots:', error)
      setFirebaseError(true)
      setAllWords([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (term) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setSearchResults([])
      return
    }
    
    try {
      const results = await searchWords(term)
      setSearchResults(results)
    } catch (error) {
      console.error('Erreur lors de la recherche:', error)
      setSearchResults([])
    }
  }

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category)
    if (category === '') {
      setSearchResults([])
      return
    }
    
    try {
      const results = await getWordsByCategory(category)
      setSearchResults(results)
    } catch (error) {
      console.error('Erreur lors du filtrage par catégorie:', error)
      setSearchResults([])
    }
  }

  const handleAddWord = async (e) => {
    e.preventDefault()
    try {
      await addWord(newWord)
      setNewWord({
        tikar: '',
        french: '',
        pronunciation: '',
        category: '',
        example: '',
        difficulty: 'Débutant'
      })
      setShowAddForm(false)
      loadAllWords() // Recharger la liste
    } catch (error) {
      console.error('Erreur lors de l\'ajout du mot:', error)
    }
  }

  const initializeDictionary = async () => {
    try {
      for (const word of initialWords) {
        await addWord(word)
      }
      loadAllWords()
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error)
    }
  }

  // Si Firebase n'est pas configuré, utiliser le mode fallback
  if (firebaseError) {
    return <DictionaryFallback />
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dictionnaire...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mot du jour */}
      {wordOfDay && (
        <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl p-8 mb-8 tikar-shadow">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-800 mb-4">Mot du jour</h3>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl font-bold text-red-800 mb-2">
                {wordOfDay.word?.tikar || 'Mbèn'}
              </div>
              <div className="text-xl text-gray-700 mb-2">
                {wordOfDay.word?.french || 'Bonjour, salut'}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                Prononciation: {wordOfDay.word?.pronunciation || 'mben'}
              </div>
              <div className="text-sm text-gray-600">
                {wordOfDay.word?.example || 'Mbèn, comment allez-vous ?'}
              </div>
              <div className="mt-4">
                <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {wordOfDay.word?.category || 'Salutations'}
                </span>
                <span className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm ml-2">
                  {wordOfDay.word?.difficulty || 'Débutant'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recherche et filtres */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-bold text-red-800 mb-4">{t('dictionary.searchInDictionary')}</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dictionary.searchWord')}
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t('dictionary.searchPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('dictionary.filterByCategory')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">{t('dictionary.allCategories')}</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {showAddForm ? 'Annuler' : 'Ajouter un mot'}
          </button>
          
          {allWords.length === 0 && (
            <button
              onClick={initializeDictionary}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Initialiser le dictionnaire
            </button>
          )}
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-red-800 mb-4">Ajouter un nouveau mot</h3>
          <form onSubmit={handleAddWord} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot en Tikar</label>
              <input
                type="text"
                value={newWord.tikar}
                onChange={(e) => setNewWord({...newWord, tikar: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Traduction française</label>
              <input
                type="text"
                value={newWord.french}
                onChange={(e) => setNewWord({...newWord, french: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prononciation</label>
              <input
                type="text"
                value={newWord.pronunciation}
                onChange={(e) => setNewWord({...newWord, pronunciation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                value={newWord.category}
                onChange={(e) => setNewWord({...newWord, category: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exemple d'usage</label>
              <input
                type="text"
                value={newWord.example}
                onChange={(e) => setNewWord({...newWord, example: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau de difficulté</label>
              <select
                value={newWord.difficulty}
                onChange={(e) => setNewWord({...newWord, difficulty: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('dictionary.addWordToDictionary')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Résultats de recherche */}
      {(searchResults.length > 0 || (searchTerm === '' && selectedCategory === '')) && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-red-800 mb-4">
            {searchResults.length > 0 ? t('dictionary.searchResults') : t('dictionary.allWords')}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(searchResults.length > 0 ? searchResults : allWords).map((word, index) => (
              <div key={word.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
      )}
    </div>
  )
}
