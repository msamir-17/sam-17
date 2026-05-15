
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import LayoutWrapper from './LayoutWrapper';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Samir — AI/ML Engineer & Full Stack Developer',
  description: 'Professional portfolio of Samir, an AI/ML Engineer and Full Stack Developer specializing in modern web technologies, machine learning, and artificial intelligence.',
  keywords: ['AI Engineer', 'ML Engineer', 'Full Stack Developer', 'Next.js', 'React', 'Python', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Samir' }],
  openGraph: {
    title: 'Samir — AI/ML Engineer & Full Stack Developer',
    description: 'Professional portfolio showcasing AI/ML and full-stack development projects.',
    type: 'website',
    url: 'https://sam-17.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </main>
      </body>
    </html>
  )
}