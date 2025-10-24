import React from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Accueil from './sections/Accueil'
import Apropos from './sections/Apropos'
import Activites from './sections/Activites'
import Langue from './sections/Langue'
import Galerie from './sections/Galerie'
import Contact from './sections/Contact'

export default function App() {
  return (
    <LanguageProvider>
      <div className="scroll-smooth">
        <NavBar />
        <main>
          <section id="accueil" className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 tikar-pattern">
            <Accueil />
          </section>

          <section id="apropos" className="py-20 bg-white">
            <Apropos />
          </section>

          <section id="activites" className="py-20 bg-amber-50">
            <Activites />
          </section>

          <section id="langue" className="py-20 bg-white">
            <Langue />
          </section>

          <section id="galerie" className="py-20 bg-amber-50">
            <Galerie />
          </section>

          <section id="contact" className="py-20 bg-white">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
