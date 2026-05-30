'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '@/lib/axios'

interface HeroData {
  greeting: string
  name: string
  jobtitles: string[]
  bio: string
  resumeurl: string
}

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

interface DynamicInternship {
  _id: string
  role: string
  company: string
  duration: string
  location?: string
  description: string
  certificateUrl?: string
}

interface DynamicCertificate {
  _id: string
  title: string
  issuedBy: string
  dateEarned: string
  certificateLink: string
}

interface DataContextType {
  hero: HeroData
  projects: Project[]
  internships: DynamicInternship[]
  certifications: DynamicCertificate[]
  loaded: boolean
}

const defaultHero: HeroData = {
  greeting: '',
  name: 'Samir',
  jobtitles: ['Loading...'],
  bio: 'Passionate about creating intelligent solutions...',
  resumeurl: ''
}

const DataContext = createContext<DataContextType>({
  hero: defaultHero,
  projects: [],
  internships: [],
  certifications: [],
  loaded: false
})

export const useData = () => useContext(DataContext)

export function DataProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<HeroData>(defaultHero)
  const [projects, setProjects] = useState<Project[]>([])
  const [internships, setInternships] = useState<DynamicInternship[]>([])
  const [certifications, setCertifications] = useState<DynamicCertificate[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch all data in parallel
        const [heroRes, projectsRes, internshipsRes, certsRes] = await Promise.allSettled([
          api.get('/hero'),
          api.get('/projects'),
          api.get('/internships'),
          api.get('/certificates')
        ])

        if (heroRes.status === 'fulfilled' && heroRes.value.data) {
          setHero(heroRes.value.data)
        }
        if (projectsRes.status === 'fulfilled') {
          setProjects(projectsRes.value.data)
        }
        if (internshipsRes.status === 'fulfilled') {
          setInternships(internshipsRes.value.data)
        }
        if (certsRes.status === 'fulfilled') {
          setCertifications(certsRes.value.data)
        }
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error)
      } finally {
        setLoaded(true)
      }
    }

    fetchAll()
  }, [])

  return (
    <DataContext.Provider value={{ hero, projects, internships, certifications, loaded }}>
      {children}
    </DataContext.Provider>
  )
}
