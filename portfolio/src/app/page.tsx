'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import { usePageView } from '@/hooks/useAnalytics'

// Below-the-fold components dynamically imported to reduce initial JS execution and main-thread work
const Projects = dynamic(() => import('@/components/Projects'))
const Internships = dynamic(() => import('@/components/Internships'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  usePageView('/home');

  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Internships />
      <Contact />
      <Footer />
    </div>
  )
}
