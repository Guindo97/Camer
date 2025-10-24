import { useLanguage } from '../contexts/LanguageContext'
import { fr } from '../translations/fr'
import { en } from '../translations/en'

export const useTranslation = () => {
  const { language } = useLanguage()
  
  const translations = {
    fr,
    en
  }
  
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        return key
      }
    }
    
    return value
  }
  
  return { t, language }
}
