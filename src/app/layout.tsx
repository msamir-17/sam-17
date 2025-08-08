import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Samir - AI/ML Engineer & Full Stack Developer',
  description: 'Professional portfolio of Samir, an AI/ML Engineer and Full Stack Developer specializing in modern web technologies and artificial intelligence.',
  keywords: ['AI Engineer', 'ML Engineer', 'Full Stack Developer', 'Next.js', 'React', 'Python', 'Machine Learning'],
  authors: [{ name: 'Samir' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ThemeToggle />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}