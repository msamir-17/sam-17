'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import { usePageView } from '@/hooks/useAnalytics'

// Skeleton placeholders with fixed min-heights to prevent CLS when lazy components load
const SectionSkeleton = ({ minHeight }: { minHeight: string }) => (
  <div style={{ minHeight }} aria-hidden="true" />
)

// Below-the-fold components dynamically imported to reduce initial JS bundle.
// Each has a fixed-height skeleton so the page layout doesn't shift when they load (CLS fix).
const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <SectionSkeleton minHeight="600px" />,
})
const Internships = dynamic(() => import('@/components/Internships'), {
  loading: () => <SectionSkeleton minHeight="500px" />,
})
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <SectionSkeleton minHeight="400px" />,
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <SectionSkeleton minHeight="80px" />,
})

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
