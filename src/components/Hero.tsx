// samir-portfolio/
// ├── public/
// │   ├── resume.pdf
// │   ├── avatar.json
// │   └── favicon.ico
// ├── src/
// │   ├── app/
// │   │   ├── globals.css
// │   │   ├── layout.tsx
// │   │   └── page.tsx
// │   ├── components/
// │   │   ├── Hero.tsx
// │   │   ├── Skills.tsx
// │   │   ├── Projects.tsx
// │   │   ├── Internships.tsx
// │   │   ├── Interests.tsx
// │   │   ├── Testimonials.tsx
// │   │   ├── Contact.tsx
// │   │   ├── Footer.tsx
// │   │   └── ThemeToggle.tsx
// │   ├── hooks/
// │   │   └── useTheme.ts
// │   └── types/
// │       └── index.ts
// ├── package.json
// ├── tailwind.config.js
// ├── tsconfig.json
// └── next.config.js


'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiDownload, HiMail } from 'react-icons/hi'
import Lottie from 'lottie-react'

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0)
  const titles = [
    'AI Enthusiast',
    'ML Engineer',
    'Next.js Developer',
    'Web Developer'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/samir-r.pdf'
    link.download = 'Samir_Resume.pdf'
    link.click()
  }

  // Dummy Lottie animation data (replace with actual avatar.json)
  const dummyLottieData = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 400,
    h: 400,
    nm: "Developer Animation",
    ddd: 0,
    assets: [],
    layers: []
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">
                Samir
              </span>         
                   {/* <span className='text-xl h-[50%] ' >
                    <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestias, illo iusto earum dolores quam corrupti, sit tempora voluptate provident officiis repudiandae quidem ab cum recusandae soluta ipsam placeat dicta!
              Nulla exercitationem odio ipsum accusamus, omnis illo vero velit. Sed voluptatem aliquam laborum beatae maiores reprehenderit dignissimos odit ipsa quasi fuga consectetur nesciunt perferendis, rerum inventore neque non harum explicabo.
              Officiis recusandae pariatur blanditiis quae atque iusto? Facilis dolores sapiente explicabo tenetur saepe recusandae reprehenderit, est harum eius soluta eligendi excepturi ipsum quisquam, quidem nisi eveniet expedita nemo facere deleniti?</h6>
                    </span>           */}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
            >
              AI/ML Engineer & Full Stack Developer
              
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 h-8"
            >
              <motion.span
                key={currentTitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {titles[currentTitle]}
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={downloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                <HiDownload className="w-5 h-5" />
                Download Resume
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                <HiMail className="w-5 h-5" />
                Let's Connect
                
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-br from-primary-400 to-purple-500 rounded-full p-8 shadow-2xl"
              >
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                  {/* Replace with actual Lottie component when avatar.json is available */}
                  {/* <Lottie animationData={dummyLottieData} /> */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero