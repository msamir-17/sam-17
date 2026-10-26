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
        // Fast path: Fetch all data in a single unified API call
        try {
          const res = await api.get('/portfolio')
          if (res.data) {
            if (res.data.hero) setHero(res.data.hero)
            if (Array.isArray(res.data.projects)) setProjects(res.data.projects)
            if (Array.isArray(res.data.internships)) setInternships(res.data.internships)
            if (Array.isArray(res.data.certifications)) setCertifications(res.data.certifications)
            return
          }
        } catch (unifiedErr) {
          console.warn('Unified /api/portfolio endpoint not reachable, falling back to separate calls:', unifiedErr)
        }

        // Fallback: Fetch individually if unified endpoint fails or is updating
        const [heroRes, projectsRes, internshipsRes, certsRes] = await Promise.allSettled([
          api.get('/hero'),
          api.get('/projects'),
          api.get('/internships'),
          api.get('/certificates')
        ])

        if (heroRes.status === 'fulfilled' && heroRes.value.data) {
          setHero(heroRes.value.data)
        }
        if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value.data)) {
          setProjects(projectsRes.value.data)
        }
        if (internshipsRes.status === 'fulfilled' && Array.isArray(internshipsRes.value.data)) {
          setInternships(internshipsRes.value.data)
        }
        if (certsRes.status === 'fulfilled' && Array.isArray(certsRes.value.data)) {
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
