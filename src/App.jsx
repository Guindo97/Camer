import React, { useMemo } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Accueil from './sections/Accueil'
import Apropos from './sections/Apropos'
import Activites from './sections/Activites'
import Langue from './sections/Langue'
import Galerie from './sections/Galerie'
import Contact from './sections/Contact'

export default function App() {
  // Config par défaut (remplace le data_sdk/element_sdk)
  const defaultConfig = useMemo(() => ({
    site_title: 'Association Culturelle Tikar',
    welcome_message: 'Bienvenue dans notre communauté dédiée à la préservation et à la promotion de la riche culture Tikar',
    about_title: 'À propos de nous',
    activities_title: 'Nos activités',
    contact_title: 'Nous rejoindre',
  }), [])

  return (
    <div className="scroll-smooth">
      <NavBar title={defaultConfig.site_title} />
      <main>
        <section id="accueil" className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 tikar-pattern">
          <Accueil title={defaultConfig.site_title} welcome={defaultConfig.welcome_message} />
        </section>

        <section id="apropos" className="py-20 bg-white">
          <Apropos aboutTitle={defaultConfig.about_title} />
        </section>

        <section id="activites" className="py-20 bg-amber-50">
          <Activites activitiesTitle={defaultConfig.activities_title} />
        </section>

        <section id="langue" className="py-20 bg-white">
          <Langue />
        </section>

        <section id="galerie" className="py-20 bg-amber-50">
          <Galerie />
        </section>

        <section id="contact" className="py-20 bg-white">
          <Contact contactTitle={defaultConfig.contact_title} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
