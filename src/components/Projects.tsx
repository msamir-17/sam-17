// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import { HiExternalLink, HiCode } from 'react-icons/hi'
// import { Project } from '@/types'

// const Projects = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const projects: Project[] = [
//     {
//       id: '1',
//       title: 'Medical Chatbot',
//       description: 'An AI-powered medical chatbot that provides instant health consultations using natural language processing and machine learning algorithms.',
//       technologies: ['Python', 'FastAPI', 'TensorFlow', 'NLP', 'React'],
//       githubUrl: 'https://github.com/samir/medical-chatbot',
//       liveUrl: 'https://medical-chatbot.demo.com',
//       imageUrl: "./new.png"
//     },
//     {
//       id: '2',
//       title: 'Fit4You',
//       description: 'A comprehensive fitness tracking application with personalized workout plans, nutrition tracking, and progress analytics.',
//       technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'Node.js'],
//       githubUrl: 'https://github.com/samir/fit4you',
//       liveUrl: 'https://fit4you.demo.com',
//       imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Fit4You'
//     },
//     {
//       id: '3',
//       title: 'WhatsApp Auto-Reply Bot',
//       description: 'An intelligent WhatsApp automation bot that handles customer inquiries, schedules appointments, and provides instant responses.',
//       technologies: ['Python', 'Selenium', 'WhatsApp API', 'Machine Learning', 'SQLite'],
//       githubUrl: 'https://github.com/samir/whatsapp-auto-reply',
//       imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=WhatsApp+Bot'
//     }
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   }

//   return (
//     <section id="projects" className="section-padding">
//       <div className="container-custom">
//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//               Featured <span className="gradient-text">Projects</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               A showcase of my recent work combining AI, web development, and innovative solutions
//             </p>
//           </motion.div>

//           <motion.div 
//             variants={containerVariants}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {projects.map((project, index) => (
//               <motion.div
//                 key={project.id}
//                 variants={itemVariants}
//                 whileHover={{ y: -10 }}
//                 className="card overflow-hidden group"
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={project.imageUrl}
//                     alt={project.title}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
//                     {project.title}
//                   </h3>
                  
//                   <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
//                     {project.description}
//                   </p>

//                   <div className="mb-4">
//                     <div className="flex flex-wrap gap-2">
//                       {project.technologies.map((tech) => (
//                         <span
//                           key={tech}
//                           className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     {project.githubUrl && (
//                       <motion.a
//                         href={project.githubUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                       >
//                         <HiCode className="w-4 h-4" />
//                         Code
//                       </motion.a>
//                     )}
                    
//                     {project.liveUrl && (
//                       <motion.a
//                         href={project.liveUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
//                       >
//                         <HiExternalLink className="w-4 h-4" />
//                         Live Demo
//                       </motion.a>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Projects


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'
import { HiExternalLink, HiCode, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { Project } from '@/types'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const projects: Project[] = [
    {
      id: '1',
      title: 'Medical Chatbot',
      description: 'An AI-powered medical chatbot that provides instant health consultations using natural language processing and machine learning algorithms to assist patients and healthcare professionals.',
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'NLP', 'React', 'OpenAI'],
      githubUrl: 'https://github.com/samir/medical-chatbot',
      liveUrl: 'https://medical-chatbot.demo.com',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop'
    },
    {
      id: '2',
      title: 'Fit4You',
      description: 'A comprehensive fitness tracking application with personalized workout plans, nutrition tracking, progress analytics, and AI-powered recommendations for optimal health outcomes.',
      technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'Node.js', 'AI Analytics'],
      githubUrl: 'https://github.com/samir/fit4you',
      liveUrl: 'https://fit4you.demo.com',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: 'WhatsApp Auto-Reply Bot',
      description: 'An intelligent WhatsApp automation bot that handles customer inquiries, schedules appointments, provides instant responses using advanced NLP and machine learning capabilities.',
      technologies: ['Python', 'Selenium', 'WhatsApp API', 'Machine Learning', 'SQLite', 'OpenAI'],
      githubUrl: 'https://github.com/samir/whatsapp-auto-reply',
      imageUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: 'E-Commerce AI Assistant',
      description: 'Smart e-commerce platform with AI-powered product recommendations, voice search, and personalized shopping experiences using cutting-edge machine learning algorithms.',
      technologies: ['React', 'Python', 'TensorFlow', 'Stripe API', 'AWS', 'Redis'],
      githubUrl: 'https://github.com/samir/ecommerce-ai',
      liveUrl: 'https://ecommerce-ai.demo.com',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for complex data analysis with real-time updates, machine learning insights, and beautiful visualizations for business intelligence.',
      technologies: ['D3.js', 'React', 'Python', 'Pandas', 'FastAPI', 'WebSocket'],
      githubUrl: 'https://github.com/samir/data-dashboard',
      liveUrl: 'https://data-dashboard.demo.com',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
    }
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="projects" className="section-spacing bg-white dark:bg-gray-950">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-block mb-4"
              whileHover={{ scale: 1.1 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                💼 Featured Work
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work combining AI, web development, and innovative solutions that make a real impact
            </p>
          </motion.div>

          {/* Projects Horizontal Scroll Container */}
          <motion.div variants={itemVariants} className="relative">
            {/* Scroll Controls */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                <motion.button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    canScrollLeft 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  }`}
                >
                  <HiChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    canScrollRight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  }`}
                >
                  <HiChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Scroll to see more projects →
              </div>
            </div>

            {/* Horizontal Scrolling Projects */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="flex-shrink-0 w-80 lg:w-96 group"
                >
                  <div className="glass-effect rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Floating Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <HiCode className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <HiExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-8 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <HiCode className="w-4 h-4" />
                            Code
                          </motion.a>
                        )}
                        
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                          >
                            <HiExternalLink className="w-4 h-4" />
                            Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View More Projects CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/samir"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View More Projects on GitHub</span>
              <HiExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects