'use client'

import { motion, Variants } from 'framer-motion'
import { HiMail, HiHeart, HiArrowUp } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();
  const currentYear = new Date().getFullYear()

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      router.push('/admin/login');
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/msamir-17', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammad-samir-khan-199a7b266', icon: FaLinkedin },
    { name: 'Email', url: 'mailto:samirkhan003786@gmail.com', icon: HiMail }
  ]

  const navigationLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#internships' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="relative bg-gray-900 dark:bg-[#050A17] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Main Content */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Amazing</span>{' '}
              Together
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              I&apos;m always open to discussing new opportunities and exciting projects. 
              Feel free to reach out if you&apos;d like to collaborate!
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-10">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-[var(--color-bg-inset)] hover:bg-gray-700 dark:hover:bg-[var(--color-surface-hover)] rounded-xl transition-colors duration-200 group"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-10">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-200 font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-800 dark:bg-[var(--color-border)] mb-8" />

          {/* Bottom Section */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <span onClick={handleSecretClick} className="cursor-pointer select-none">
                © {currentYear} Samir. Made with
              </span>
              <HiHeart className="text-red-500 w-4 h-4" />
              <span>using Next.js & Tailwind CSS</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-gray-500 text-sm font-medium">
                AI/ML Engineer & Full Stack Developer
              </span>
              
              <button
                onClick={scrollToTop}
                className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-200 shadow-lg active:scale-95"
                aria-label="Scroll to top"
              >
                <HiArrowUp className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </footer>
  )
}

export default Footer