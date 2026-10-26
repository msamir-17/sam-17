'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface NavItem {
  id: string;
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'skills', name: 'Skills', href: '#skills' },
  { id: 'internships', name: 'Experience', href: '#internships' },
  { id: 'contact', name: 'Contact', href: '#contact' }
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/msamir-17', icon: FaGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammad-samir-khan-199a7b266', icon: FaLinkedin }
];

export default function SideNavbar() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Sync theme with <html> class
  useEffect(() => {
    if (isDarkMode === null) return;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    setIsDarkMode(prev => !prev);
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 400);
  };

  // ScrollSpy to highlight active section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'skills', 'internships', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════════
          1. DESKTOP VERTICAL SIDE NAVBAR (Hamish Williams Style - md and up)
          ═════════════════════════════════════════════════════════════════ */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 z-50 flex-col justify-between items-center py-7 border-r border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-[#050A17]/85 backdrop-blur-xl transition-all duration-300">
        
        {/* Top: Monogram Logo */}
        <div className="flex flex-col items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Home"
          >
            <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              S<span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
          </a>
        </div>

        {/* Center: Vertical Navigation Links */}
        <nav className="flex flex-col items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative group flex items-center py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium'
                }`}
              >
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.span
                    layoutId="activeSideNavDot"
                    className="absolute -left-3 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Vertical Text */}
                <span
                  className="text-xs uppercase tracking-[0.22em] transition-transform duration-200 group-hover:scale-105"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)'
                  }}
                >
                  {item.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom: Theme Toggle & Social Icons */}
        <div className="flex flex-col items-center gap-3.5 pb-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-gray-200/80 dark:border-white/10 bg-gray-100/70 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {isDarkMode === null ? (
              <div className="w-4 h-4" />
            ) : isDarkMode ? (
              <HiSun className="w-4 h-4 text-yellow-400" />
            ) : (
              <HiMoon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
              aria-label={social.name}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </aside>

      {/* ═════════════════════════════════════════════════════════════════
          2. MOBILE TOP HEADER (< 768px - Hamish Style)
          ═════════════════════════════════════════════════════════════════ */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-6 bg-white/70 dark:bg-[#050A17]/75 backdrop-blur-md border-b border-gray-200/40 dark:border-white/5">
        {/* Left: Minimal Monogram Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          aria-label="Home"
        >
          S<span className="text-blue-600 dark:text-blue-400">.</span>
        </a>

        {/* Right: Modern Hamburger Trigger */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200/80 dark:border-white/10 bg-gray-100/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/80 dark:hover:bg-white/10 transition-all duration-200"
          aria-label="Open menu"
        >
          <HiMenu className="w-5 h-5" />
        </button>
      </header>

      {/* ═════════════════════════════════════════════════════════════════
          3. FULLSCREEN MOBILE OVERLAY (Hamish Williams Reference Match)
          ═════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-[105] backdrop-blur-3xl text-gray-900 dark:text-white flex flex-col justify-between p-8 sm:p-10 pb-12 sm:pb-14 transition-colors duration-300"
          >
            {/* Top Bar: Logo + Close Button */}
            <div className="relative z-10 flex items-center justify-between">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#hero');
                }}
                className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white hover:opacity-85 transition-opacity"
              >
                S<span className="text-blue-600 dark:text-blue-400">.</span>
              </a>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200/80 dark:border-white/10 bg-gray-100/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200"
                aria-label="Close menu"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Vertically and Horizontally Centered Nav Links */}
            <nav className="relative z-10 flex flex-col items-center justify-center gap-7 my-auto">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`text-2xl sm:text-3xl tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-light'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom Bar: Social Icons (Left) + Theme Toggle (Right) */}
            <div className="relative z-10 flex items-center justify-between pt-4 pb-2 px-2">
              {/* Bottom Left: Socials */}
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Bottom Right: Theme Toggle Icon */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode === null ? (
                  <div className="w-5 h-5" />
                ) : isDarkMode ? (
                  <HiSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <HiMoon className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
