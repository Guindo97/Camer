import React from 'react'
import Dictionary from '../components/Dictionary'
import VideoLesson from '../components/VideoLesson'
import AudioPlayer from '../components/AudioPlayer'
import PDFDownload from '../components/PDFDownload'

export default function Langue() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-red-800 mb-4">Langue et culture</h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto" />
      </div>

      {/* Leçons vidéo Tikar */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">Leçons vidéo Tikar</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VideoLesson 
            title="Introduction à la langue Tikar"
            description="Découvrez les bases de la langue Tikar avec cette leçon d'introduction complète."
            duration="15 min"
            level="Débutant"
          />
          <VideoLesson 
            title="Prononciation des sons Tikar"
            description="Apprenez à prononcer correctement les sons spécifiques de la langue Tikar."
            duration="20 min"
            level="Débutant"
          />
          <VideoLesson 
            title="Conversation de base"
            description="Maîtrisez les expressions essentielles pour converser en Tikar."
            duration="25 min"
            level="Intermédiaire"
          />
        </div>
      </div>

      {/* Fichiers audio pour la prononciation */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">Prononciation audio</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AudioPlayer 
            title="Salutations"
            word="Mbèn"
            pronunciation="mben"
          />
          <AudioPlayer 
            title="Politesse"
            word="Nde"
            pronunciation="nde"
          />
          <AudioPlayer 
            title="Famille"
            word="Nkum"
            pronunciation="nkum"
          />
          <AudioPlayer 
            title="Nature"
            word="Mba"
            pronunciation="mba"
          />
        </div>
      </div>

        {/* Ressources PDF téléchargeables */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">Manuels et ressources PDF</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <PDFDownload 
              pdfId="manuel-debutant"
              title="Manuel de langue Tikar - Niveau Débutant"
              description="Guide complet pour apprendre les bases de la langue Tikar avec exercices pratiques."
              size="2.5 MB"
              pages="45 pages"
            />
            <PDFDownload 
              pdfId="dictionnaire"
              title="Dictionnaire Tikar-Français"
              description="Dictionnaire complet basé sur les travaux du Dr Carol Thorne-Stanley."
              size="3.2 MB"
              pages="120 pages"
            />
            <PDFDownload 
              pdfId="exercices-prononciation"
              title="Exercices de prononciation"
              description="Cahier d'exercices avec guide audio pour maîtriser la prononciation."
              size="1.8 MB"
              pages="30 pages"
            />
            <PDFDownload 
              pdfId="culture-traditions"
              title="Culture et traditions Tikar"
              description="Guide culturel pour comprendre le contexte de la langue Tikar."
              size="4.1 MB"
              pages="85 pages"
            />
            <PDFDownload 
              pdfId="grammaire-avancee"
              title="Grammaire Tikar Avancée"
              description="Manuel de grammaire pour les niveaux intermédiaire et avancé."
              size="3.8 MB"
              pages="95 pages"
            />
            <PDFDownload 
              pdfId="histoires-tikar"
              title="Histoires et contes Tikar"
              description="Collection de contes traditionnels en langue Tikar avec traductions."
              size="2.9 MB"
              pages="65 pages"
            />
          </div>
        </div>

      {/* Références académiques */}
      <div className="mb-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Références académiques</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Recherches linguistiques</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="text-red-600 mr-2">📚</span>
                <div>
                  <div className="font-semibold">Dr Carol Thorne-Stanley</div>
                  <div>"Tikar Language Studies" - Université de Yaoundé</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-2">🏛️</span>
                <div>
                  <div className="font-semibold">Institut de Linguistique Appliquée (ILA)</div>
                  <div>Recherches sur les langues bantoues</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 mr-2">🌍</span>
                <div>
                  <div className="font-semibold">Centre de Recherche sur les Langues Africaines</div>
                  <div>Documentation des langues en danger</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Partenaires académiques</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div>• Université de Yaoundé I - Département de Linguistique</div>
              <div>• CNRS - Centre National de la Recherche Scientifique</div>
              <div>• UNESCO - Programme de sauvegarde du patrimoine linguistique</div>
              <div>• Association Internationale de Linguistique Appliquée</div>
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                📖 Accéder aux publications
              </button>
            </div>
          </div>
        </div>
      </div>


        {/* Dictionnaire dynamique */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-red-800 mb-6 text-center">Dictionnaire Tikar-Français</h3>
          <p className="text-center text-gray-600 mb-8">
            Dictionnaire interactif basé sur les travaux de recherche du Dr Carol Thorne-Stanley et d'autres linguistes spécialisés dans la langue Tikar.
          </p>
          <Dictionary />
        </div>
    </div>
  )
}
