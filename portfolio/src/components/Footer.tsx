
'use client'

import { motion } from 'framer-motion'
import { HiMail, HiHeart, HiArrowUp, HiSparkles } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Footer = () => {
  const [ clickCount, setClickCount] = useState(0);
  const router = useRouter();
  const currentYear = new Date().getFullYear()
  const [hoveredSocial, setHoveredSocial] = useState(null)

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if(newCount >= 5){
      router.push('/admin/login');
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/samir',
      icon: FaGithub,
      color: 'hover:text-gray-900 dark:hover:text-white',
      hoverBg: 'group-hover:from-gray-700 group-hover:to-gray-900'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/samir',
      icon: FaLinkedin,
      color: 'hover:text-blue-600',
      hoverBg: 'group-hover:from-blue-500 group-hover:to-blue-700'
    },
    {
      name: 'Email',
      url: 'mailto:samir.dev@example.com',
      icon: HiMail,
      color: 'hover:text-red-500',
      hoverBg: 'group-hover:from-red-500 group-hover:to-red-700'
    }
  ]

  const navigationLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-black dark:via-gray-900 dark:to-purple-950 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.2 }}
            variants={containerVariants}
          >
            {/* Main Footer Content */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-400 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <HiSparkles className="w-4 h-4" />
                Let's connect and create amazing things together
              </motion.div>
              
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Let's Build Something{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse-glow">
                  Amazing
                </span>{' '}
                Together
              </h3>
              
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
                I'm always open to discussing new opportunities and exciting projects. 
                Feel free to reach out if you'd like to collaborate!
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center gap-6 mb-12">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.2, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative"
                  aria-label={social.name}
                >
                  <motion.div
                    className={`p-4 bg-gradient-to-r from-gray-800 to-gray-700 ${social.hoverBg} rounded-2xl shadow-xl transition-all duration-300 backdrop-blur-sm border border-gray-600/50`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <social.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={hoveredSocial === index ? { opacity: 1, y: -10, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
                  >
                    {social.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-12">
              {navigationLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg relative group"
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div 
              variants={itemVariants}
              className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"
            />

            {/* Bottom Section */}
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 text-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <span onClick={handleSecretClick} className="cursor-pointer">© {currentYear} Samir. Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <HiHeart className="text-red-500 w-5 h-5" />
                  </motion.div>
                  <span>using Next.js & Tailwind CSS</span>
                </div>
              </motion.div>
              
              {/* Role and Scroll to Top */}
              <div className="flex items-center gap-6">
                <motion.div 
                  className="hidden sm:block text-gray-400 font-medium"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  AI/ML Engineer & Full Stack Developer
                </motion.div>
                
                {/* Scroll to top button */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="group p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Scroll to top"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiArrowUp className="w-5 h-5 group-hover:animate-pulse" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>

            {/* Fun Stats */}
            {/* <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {[
                { label: 'Lines of Code', value: '10k+', icon: '💻' },
                { label: 'Coffee Cups', value: '500+', icon: '☕' },
                { label: 'Projects Shipped', value: '20+', icon: '🚀' },
                { label: 'Happy Clients', value: '15+', icon: '😊' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    className="text-3xl mb-2"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 300 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div> */}
          </motion.div>
        </div>

        {/* Animated Footer Wave */}
        <div className="relative">
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{ 
              background: [
                'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)',
                'linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6)',
                'linear-gradient(90deg, #EC4899, #3B82F6, #8B5CF6)',
                'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -80, -20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer