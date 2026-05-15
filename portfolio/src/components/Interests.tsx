'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBrain, FaRobot, FaCode, FaReact } from 'react-icons/fa'
import { Interest } from '@/types'

const Interests = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const interests: Interest[] = [
    {
      id: '1',
      name: 'Artificial Intelligence',
      icon: 'FaBrain',
      color: 'from-purple-500 to-pink-500',
      description: 'Exploring the frontiers of AI and its applications'
    },
    {
      id: '2',
      name: 'Machine Learning',
      icon: 'FaRobot',
      color: 'from-blue-500 to-cyan-500',
      description: 'Building intelligent systems that learn and adapt'
    },
    {
      id: '3',
      name: 'Web Development',
      icon: 'FaCode',
      color: 'from-green-500 to-teal-500',
      description: 'Creating beautiful and functional web experiences'
    },
    {
      id: '4',
      name: 'Next.js Development',
      icon: 'FaReact',
      color: 'from-orange-500 to-red-500',
      description: 'Modern React framework for production applications'
    }
  ]

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8 text-white" }
    switch (iconName) {
      case 'FaBrain': return <FaBrain {...iconProps} />
      case 'FaRobot': return <FaRobot {...iconProps} />
      case 'FaCode': return <FaCode {...iconProps} />
      case 'FaReact': return <FaReact {...iconProps} />
      default: return <div className="w-8 h-8 bg-white rounded" />
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section id="interests" className="section-spacing bg-white dark:bg-gray-950">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-6">
              ✨ What drives my passion
            </span>
            <h2 className="section-title">
              My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Interests</span>
            </h2>
            <p className="section-subtitle">
              Areas of passion that drive my continuous learning and innovation in technology
            </p>
          </motion.div>

          {/* Interests Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {interests.map((interest) => (
              <motion.div
                key={interest.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative group cursor-default"
              >
                <div className={`bg-gradient-to-br ${interest.color} rounded-2xl p-8 h-56 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-shadow duration-300`}>
                  <div className="mb-5 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                    {getIcon(interest.icon || '')}
                  </div>
                  
                  <h3 className="text-white font-bold text-lg leading-tight mb-2">
                    {interest.name}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {interest.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Always Exploring */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-block p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-3xl mb-3">🌟</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Always Exploring
              </h4>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                Technology evolves rapidly, and so do I. I&apos;m constantly learning new frameworks 
                and pushing the boundaries of what&apos;s possible.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Interests