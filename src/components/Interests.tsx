// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import { FaBrain, FaRobot, FaCode, FaReact } from 'react-icons/fa'
// import { Interest } from '@/types'

// const Interests = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const interests: Interest[] = [
//     {
//       id: '1',
//       name: 'Artificial Intelligence',
//       icon: 'FaBrain',
//       color: 'from-purple-500 to-pink-500'
//     },
//     {
//       id: '2',
//       name: 'Machine Learning',
//       icon: 'FaRobot',
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       id: '3',
//       name: 'Web Development',
//       icon: 'FaCode',
//       color: 'from-green-500 to-teal-500'
//     },
//     {
//       id: '4',
//       name: 'Next.js Development',
//       icon: 'FaReact',
//       color: 'from-orange-500 to-red-500'
//     }
//   ]

//   const getIcon = (iconName: string) => {
//     const iconProps = { className: "w-8 h-8 text-white" }
//     switch (iconName) {
//       case 'FaBrain': return <FaBrain {...iconProps} />
//       case 'FaRobot': return <FaRobot {...iconProps} />
//       case 'FaCode': return <FaCode {...iconProps} />
//       case 'FaReact': return <FaReact {...iconProps} />
//       default: return <div className="w-8 h-8 bg-white rounded" />
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { duration: 0.5 }
//     }
//   }

//   return (
//     <section id="interests" className="section-padding">
//       <div className="container-custom">
//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//               My <span className="gradient-text">Interests</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               Areas of passion that drive my continuous learning and innovation
//             </p>
//           </motion.div>

//           <motion.div 
//             variants={containerVariants}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {interests.map((interest, index) => (
//               <motion.div
//                 key={interest.id}
//                 variants={itemVariants}
//                 whileHover={{ 
//                   scale: 1.05,
//                   rotateY: 5,
//                   rotateX: 5,
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative group cursor-pointer"
//               >
//                 <div className={`bg-gradient-to-br ${interest.color} rounded-2xl p-8 h-48 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300`}>
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.6 }}
//                     className="mb-4"
//                   >
//                     {getIcon(interest.icon || '')}
//                   </motion.div>
                  
//                   <h3 className="text-white font-bold text-lg leading-tight">
//                     {interest.name}
//                   </h3>
                  
//                   {/* Floating particles effect */}
//                   <div className="absolute inset-0 rounded-2xl overflow-hidden">
//                     {[...Array(6)].map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className="absolute w-2 h-2 bg-white/20 rounded-full"
//                         animate={{
//                           x: [0, 30, 0],
//                           y: [0, -30, 0],
//                           opacity: [0, 1, 0],
//                         }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           delay: i * 0.5,
//                         }}
//                         style={{
//                           left: `${20 + i * 10}%`,
//                           top: `${20 + i * 8}%`,
//                         }}
//                       />
//                     ))}
//                   </div>
                  
//                   {/* Glow effect */}
//                   <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Animated background elements */}
//           <div className="relative mt-16">
//             <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full filter blur-3xl opacity-20 animate-float" />
//             <div className="absolute top-10 right-1/4 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
// export default Interests

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBrain, FaRobot, FaCode, FaReact } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { Interest } from '@/types'
import { variants } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.7, type: "spring", stiffness: 100 }
    }
  }

  return (
    <section id="interests" className="section-spacing relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 120, 240, 360],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.5, 1.2],
            rotate: [360, 240, 120, 0],
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <HiSparkles className="w-4 h-4" />
              What drives my passion
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              My{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse-glow">
                Interests
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Areas of passion that drive my continuous learning and innovation in technology
            </p>
          </motion.div>

          {/* Interests Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08,
                  y: -10,
                  rotateY: 8,
                  rotateX: 8,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${interest.color} rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-white/20`}>
                  {/* Icon Container */}
                  <motion.div
                    className="mb-6 relative"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                  >
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                      {getIcon(interest.icon || '')}
                    </div>
                    
                    {/* Floating ring */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  <h3 className="text-white font-bold text-xl leading-tight mb-3 group-hover:scale-105 transition-transform">
                    {interest.name}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {interest.description}
                  </p>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                        animate={{
                          x: [0, Math.random() * 60 - 30],
                          y: [0, Math.random() * 60 - 30],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        style={{
                          left: `${10 + Math.random() * 80}%`,
                          top: `${10 + Math.random() * 80}%`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10 scale-110`}
                    whileHover={{ scale: 1.2 }}
                  />
                </div>

                {/* Index number */}
                <motion.div
                  className="absolute -top-3 -left-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Content Section */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <motion.div
              className="inline-block p-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌟
              </motion.div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Always Exploring
              </h4>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                Technology evolves rapidly, and so do I. I'm constantly learning new frameworks, 
                exploring emerging technologies, and pushing the boundaries of what's possible.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Interests