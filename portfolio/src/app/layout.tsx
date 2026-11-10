
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import LayoutWrapper from './LayoutWrapper';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050A17' },
  ],
}

const siteUrl = 'https://sam-17-f42l.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Samir | AI/ML Engineer & Full Stack Developer',
    template: '%s | Samir',
  },
  description:
    'Portfolio of Mohamad Samir Khan — AI/ML Engineer & Full Stack Developer specializing in Next.js, FastAPI, LangChain, PyTorch, and production-grade AI applications.',
  keywords: [
    'Samir',
    'Mohamad Samir Khan',
    'AI Engineer',
    'ML Engineer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'Python',
    'Machine Learning',
    'FastAPI',
    'LangChain',
    'PyTorch',
    'Portfolio',
    'Mumbai',
    'AI Developer Mumbai',
    'Machine Learning Engineer Mumbai',
  ],
  authors: [{ name: 'Mohamad Samir Khan', url: siteUrl }],
  creator: 'Mohamad Samir Khan',
  publisher: 'Mohamad Samir Khan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Samir | AI/ML Engineer & Full Stack Developer',
    description:
      'Portfolio of Mohamad Samir Khan — AI/ML Engineer & Full Stack Developer specializing in Next.js, FastAPI, LangChain, PyTorch, and production AI applications.',
    url: siteUrl,
    siteName: 'Samir Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Samir - AI/ML Engineer & Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samir | AI/ML Engineer & Full Stack Developer',
    description:
      'Portfolio of Mohamad Samir Khan — AI/ML Engineer & Full Stack Developer specializing in Next.js, FastAPI, LangChain, PyTorch.',
    images: ['/og-image.png'],
    creator: '@msamir_17',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/avtar.jpg',
  },
}

// Structured Data (JSON-LD) for Google Knowledge Graph
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Mohamad Samir Khan',
      alternateName: 'Samir',
      jobTitle: 'AI/ML Engineer & Full Stack Developer',
      url: siteUrl,
      image: `${siteUrl}/avtar.jpg`,
      sameAs: [
        'https://github.com/msamir-17',
        'https://linkedin.com/in/msamir17',
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Next.js',
        'React',
        'FastAPI',
        'Python',
        'PyTorch',
        'LangChain',
        'Full Stack Web Development',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Samir Portfolio',
      description: 'Portfolio of Mohamad Samir Khan — AI/ML Engineer & Full Stack Developer',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Cloudinary CDN to reduce image load latency (~310ms savings per Lighthouse) */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Preconnect to Render backend to reduce API latency on first data fetch */}
        <link rel="preconnect" href="https://portfolio-backend-sp1w.onrender.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className} antialiased`}>
        <main className="min-h-screen">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </main>
      </body>
    </html>
  )
}