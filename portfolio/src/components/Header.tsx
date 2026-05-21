

'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiUser, HiCode, HiBriefcase, HiPhone, HiSun, HiMoon } from 'react-icons/hi';
import { GrProjects } from "react-icons/gr";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize theme from localStorage or system preference (client-only)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // Respect system preference, default to dark
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark !== undefined ? prefersDark : true)
    }
  }, [])

  // Apply theme class to <html>
  useEffect(() => {
    if (isDarkMode === null) return // Skip until initialized
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleTheme = () => {
    // Enable smooth transition temporarily
    document.documentElement.classList.add('theme-transition')
    setIsDarkMode(prev => !prev)
    // Remove transition class after animation completes to avoid perf overhead
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 400)
  }

  const navigationLinks = [
    { name: 'About', href: '#hero', icon: HiUser },
    { name: 'Projects', href: '#projects', icon: GrProjects },
    { name: 'Skills', href: '#skills', icon: HiCode },
    { name: 'Experience', href: '#internships', icon: HiBriefcase },
    { name: 'Contact', href: '#contact', icon: HiPhone }
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/msamir-17', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammad-samir-khan-199a7b266', icon: FaLinkedin }
  ]

  const handleMobileLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-1.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-1 p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode === null ? (
                <div className="w-4 h-4" />
              ) : isDarkMode ? (
                <HiSun className="w-4 h-4 text-yellow-500" />
              ) : (
                <HiMoon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {isDarkMode === null ? (
                <div className="w-5 h-5" />
              ) : isDarkMode ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-1">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLinkClick(link.href);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </a>
            ))}

            {/* Mobile Social Links */}
            <div className="flex items-center gap-4 px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default Header;