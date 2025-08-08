'use client'

import { motion } from 'framer-motion'
import { HiMail, HiHeart, HiArrowUp } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
// import { SiHuggingface } from 'react-icons/si'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/samir',
      icon: FaGithub,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/samir',
      icon: FaLinkedin,
      color: 'hover:text-blue-600'
    },
    // {
    //   name: 'Hugging Face',
    //   url: 'https://huggingface.co/samir',
    //   icon: SiHuggingface,
    //   color: 'hover:text-yellow-500'
    // },
    {
      name: 'Email',
      url: 'mailto:samir.dev@example.com',
      icon: HiMail,
      color: 'hover:text-red-500'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="container-custom py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Main Footer Content */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Let's Build Something <span className="gradient-text">Amazing</span> Together
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                I'm always open to discussing new opportunities and exciting projects. 
                Feel free to reach out if you'd like to collaborate!
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-gray-800 dark:bg-gray-900 rounded-full text-gray-400 transition-all duration-300 ${social.color} hover:shadow-lg`}
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
              {[
                { name: 'About', href: '#hero' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div variants={itemVariants} className="border-t border-gray-800 dark:border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  © {currentYear} Samir. Made with <HiHeart className="text-red-500 w-4 h-4" /> using Next.js & Tailwind CSS
                </p>
                
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">AI/ML Engineer & Full Stack Developer</span>
                  
                  {/* Scroll to top button */}
                  <motion.button
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-primary-600 hover:bg-primary-700 rounded-full transition-colors duration-300"
                    aria-label="Scroll to top"
                  >
                    <HiArrowUp className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500"></div>
      </div>
    </footer>
  )
}

export default Footer