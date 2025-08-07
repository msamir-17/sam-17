'use client'

import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Internships from '@/components/Internships'
import Interests from '@/components/Interests'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Internships />
      <Interests />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}