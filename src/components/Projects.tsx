'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCode } from 'react-icons/hi'
import { Project } from '@/types'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const projects: Project[] = [
    {
      id: '1',
      title: 'Medical Chatbot',
      description: 'An AI-powered medical chatbot that provides instant health consultations using natural language processing and machine learning algorithms.',
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'NLP', 'React'],
      githubUrl: 'https://github.com/samir/medical-chatbot',
      liveUrl: 'https://medical-chatbot.demo.com',
      imageUrl: "./new.png"
    },
    {
      id: '2',
      title: 'Fit4You',
      description: 'A comprehensive fitness tracking application with personalized workout plans, nutrition tracking, and progress analytics.',
      technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'Node.js'],
      githubUrl: 'https://github.com/samir/fit4you',
      liveUrl: 'https://fit4you.demo.com',
      imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Fit4You'
    },
    {
      id: '3',
      title: 'WhatsApp Auto-Reply Bot',
      description: 'An intelligent WhatsApp automation bot that handles customer inquiries, schedules appointments, and provides instant responses.',
      technologies: ['Python', 'Selenium', 'WhatsApp API', 'Machine Learning', 'SQLite'],
      githubUrl: 'https://github.com/samir/whatsapp-auto-reply',
      imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=WhatsApp+Bot'
    }
  ]

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
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work combining AI, web development, and innovative solutions
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="card overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <HiExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects