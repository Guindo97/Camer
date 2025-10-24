import React from 'react'
import Dictionary from '../components/Dictionary'
import VideoLesson from '../components/VideoLesson'
import AudioPlayer from '../components/AudioPlayer'
import PDFDownload from '../components/PDFDownload'
import { useTranslation } from '../hooks/useTranslation'

export default function Langue() {
  const { t } = useTranslation()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-red-800 mb-4">{t('language.title')}</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto" />
      </div>

      {/* Leçons vidéo Tikar */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">{t('language.videoLessonsTitle')}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VideoLesson 
            title={t('language.videoIntroTitle')}
            description={t('language.videoIntroDescription')}
            duration="15 min"
            level={t('language.beginner')}
          />
          <VideoLesson 
            title={t('language.videoPronunciationTitle')}
            description={t('language.videoPronunciationDescription')}
            duration="20 min"
            level={t('language.beginner')}
          />
          <VideoLesson 
            title={t('language.videoConversationTitle')}
            description={t('language.videoConversationDescription')}
            duration="25 min"
            level={t('language.intermediate')}
          />
        </div>
      </div>

      {/* Fichiers audio pour la prononciation */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">{t('language.audioPronunciationTitle')}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AudioPlayer 
            title={t('language.audioGreetings')}
            word="Mbèn"
            pronunciation="mben"
          />
          <AudioPlayer 
            title={t('language.audioPoliteness')}
            word="Nde"
            pronunciation="nde"
          />
          <AudioPlayer 
            title={t('language.audioFamily')}
            word="Nkum"
            pronunciation="nkum"
          />
          <AudioPlayer 
            title={t('language.audioNature')}
            word="Mba"
            pronunciation="mba"
          />
        </div>
      </div>

        {/* Ressources PDF téléchargeables */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">{t('language.pdfResourcesTitle')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <PDFDownload 
              pdfId="manuel-debutant"
              title={t('language.pdfBeginnerManual')}
              description={t('language.pdfBeginnerManualDescription')}
              size="2.5 MB"
              pages="45 pages"
            />
            <PDFDownload 
              pdfId="dictionnaire"
              title={t('language.pdfDictionary')}
              description={t('language.pdfDictionaryDescription')}
              size="3.2 MB"
              pages="120 pages"
            />
            <PDFDownload 
              pdfId="exercices-prononciation"
              title={t('language.pdfPronunciationExercises')}
              description={t('language.pdfPronunciationExercisesDescription')}
              size="1.8 MB"
              pages="30 pages"
            />
            <PDFDownload 
              pdfId="culture-traditions"
              title={t('language.pdfCultureTraditions')}
              description={t('language.pdfCultureTraditionsDescription')}
              size="4.1 MB"
              pages="85 pages"
            />
            <PDFDownload 
              pdfId="grammaire-avancee"
              title={t('language.pdfAdvancedGrammar')}
              description={t('language.pdfAdvancedGrammarDescription')}
              size="3.8 MB"
              pages="95 pages"
            />
            <PDFDownload 
              pdfId="histoires-tikar"
              title={t('language.pdfTikarStories')}
              description={t('language.pdfTikarStoriesDescription')}
              size="2.9 MB"
              pages="65 pages"
            />
          </div>
        </div>

      {/* Références académiques */}
      <div className="mb-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">{t('language.academicReferencesTitle')}</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('language.linguisticResearch')}</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="text-red-600 mr-2">📚</span>
                <div>
                  <div className="font-semibold">{t('language.drThorneStanley')}</div>
                  <div>"{t('language.tikarLanguageStudies')}" - {t('language.yaoundeUniversity')}</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-2">🏛️</span>
                <div>
                  <div className="font-semibold">{t('language.ila')}</div>
                  <div>{t('language.bantouLanguages')}</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-2">🌍</span>
                <div>
                  <div className="font-semibold">{t('language.africanLanguagesResearchCenter')}</div>
                  <div>{t('language.endangeredLanguages')}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{t('language.academicPartners')}</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div>• {t('language.yaoundeUniDept')}</div>
              <div>• {t('language.cnrs')}</div>
              <div>• {t('language.unesco')}</div>
              <div>• {t('language.aila')}</div>
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                {t('language.accessPublications')}
              </button>
            </div>
          </div>
        </div>
      </div>


        {/* Dictionnaire dynamique */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-red-800 mb-6 text-center">{t('language.dictionaryTitle')}</h3>
          <p className="text-center text-gray-600 mb-8">
            {t('language.dictionaryDescription')}
          </p>
          <Dictionary />
        </div>
    </div>
  )
}
