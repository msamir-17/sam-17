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
  refreshData: () => Promise<void>
}

const defaultHero: HeroData = {
  greeting: '',
  name: 'Samir',
  jobtitles: ['Loading...'],
  bio: 'Passionate about creating intelligent solutions...',
  resumeurl: ''
}

const CACHE_KEY = 'portfolio_data_cache_v2';

export const clearPortfolioCache = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {}
  }
};

const DataContext = createContext<DataContextType>({
  hero: defaultHero,
  projects: [],
  internships: [],
  certifications: [],
  loaded: false,
  refreshData: async () => {}
})

export const useData = () => useContext(DataContext)

export function DataProvider({ children }: { children: ReactNode }) {
  const [hero, setHero] = useState<HeroData>(defaultHero)
  const [projects, setProjects] = useState<Project[]>([])
  const [internships, setInternships] = useState<DynamicInternship[]>([])
  const [certifications, setCertifications] = useState<DynamicCertificate[]>([])
  const [loaded, setLoaded] = useState(false)

  // 1. Instant Hydration from Client Cache (0ms load time for repeat visits)
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed.hero) setHero(parsed.hero)
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) setProjects(parsed.projects)
        if (Array.isArray(parsed.internships) && parsed.internships.length > 0) setInternships(parsed.internships)
        if (Array.isArray(parsed.certifications) && parsed.certifications.length > 0) setCertifications(parsed.certifications)
        setLoaded(true)
      }
    } catch {
      // localStorage may fail in private mode or corrupt JSON
    }
  }, [])

  // 2. Fresh Data Fetcher (SWR - Stale While Revalidate)
  const fetchAll = async () => {
    try {
      let fetchedData: {
        hero?: HeroData
        projects?: Project[]
        internships?: DynamicInternship[]
        certifications?: DynamicCertificate[]
      } | null = null

      // Fast path: Unified /api/portfolio
      try {
        const res = await api.get('/portfolio')
        if (res.data) {
          fetchedData = {
            hero: res.data.hero || undefined,
            projects: Array.isArray(res.data.projects) ? res.data.projects : [],
            internships: Array.isArray(res.data.internships) ? res.data.internships : [],
            certifications: Array.isArray(res.data.certifications) ? res.data.certifications : []
          }
        }
      } catch (unifiedErr) {
        console.warn('Unified /api/portfolio endpoint unreachable, falling back to individual calls:', unifiedErr)
      }

      // Fallback: Individual calls
      if (!fetchedData) {
        const [heroRes, projectsRes, internshipsRes, certsRes] = await Promise.allSettled([
          api.get('/hero'),
          api.get('/projects'),
          api.get('/internships'),
          api.get('/certificates')
        ])

        fetchedData = {
          hero: heroRes.status === 'fulfilled' && heroRes.value.data ? heroRes.value.data : undefined,
          projects: projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value.data) ? projectsRes.value.data : [],
          internships: internshipsRes.status === 'fulfilled' && Array.isArray(internshipsRes.value.data) ? internshipsRes.value.data : [],
          certifications: certsRes.status === 'fulfilled' && Array.isArray(certsRes.value.data) ? certsRes.value.data : []
        }
      }

      if (fetchedData) {
        if (fetchedData.hero) setHero(fetchedData.hero)
        if (fetchedData.projects) setProjects(fetchedData.projects)
        if (fetchedData.internships) setInternships(fetchedData.internships)
        if (fetchedData.certifications) setCertifications(fetchedData.certifications)

        // Store into cache for future instant renders
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedData))
        } catch {}
      }
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error)
    } finally {
      setLoaded(true)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <DataContext.Provider value={{ hero, projects, internships, certifications, loaded, refreshData: fetchAll }}>
      {children}
    </DataContext.Provider>
  )
}
