'use client'

import { motion } from 'framer-motion'
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
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '2',
      name: 'Machine Learning',
      icon: 'FaRobot',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '3',
      name: 'Web Development',
      icon: 'FaCode',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: '4',
      name: 'Next.js Development',
      icon: 'FaReact',
      color: 'from-orange-500 to-red-500'
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="interests" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Interests</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Areas of passion that drive my continuous learning and innovation
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${interest.color} rounded-2xl p-8 h-48 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300`}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    {getIcon(interest.icon || '')}
                  </motion.div>
                  
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {interest.name}
                  </h3>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        animate={{
                          x: [0, 30, 0],
                          y: [0, -30, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${20 + i * 8}%`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated background elements */}
          <div className="relative mt-16">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full filter blur-3xl opacity-20 animate-float" />
            <div className="absolute top-10 right-1/4 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Interests