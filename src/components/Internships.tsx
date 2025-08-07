'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiAcademicCap, HiExternalLink, HiCalendar, HiBriefcase } from 'react-icons/hi'
import { Internship } from '@/types'

const Internships = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const internships: Internship[] = [
    {
      id: '1',
      role: 'AI/ML Engineer Intern',
      organization: 'TechCorp Solutions',
      duration: 'Jun 2024 - Aug 2024',
      description: 'Developed machine learning models for predictive analytics and worked on natural language processing projects. Implemented automated data pipelines and improved model accuracy by 15%.',
      certificateUrl: 'https://certificate.example.com/ml-intern'
    },
    {
      id: '2',
      role: 'Full Stack Developer Intern',
      organization: 'StartupXYZ',
      duration: 'Jan 2024 - May 2024',
      description: 'Built responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions and improved application performance by 30%.',
      certificateUrl: 'https://certificate.example.com/fullstack-intern'
    },
    {
      id: '3',
      role: 'Python Developer Intern',
      organization: 'DataTech Labs',
      duration: 'Sep 2023 - Dec 2023',
      description: 'Developed data analysis tools and automated reporting systems. Created RESTful APIs using FastAPI and worked with large datasets for business intelligence solutions.',
      certificateUrl: 'https://certificate.example.com/python-intern'
    }
  ]

  const certifications = [
    {
      id: '1',
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      certificateUrl: 'https://aws.amazon.com/certification/'
    },
    {
      id: '2',
      name: 'Machine Learning Specialization',
      issuer: 'Stanford University',
      date: '2023',
      certificateUrl: 'https://coursera.org/ml-specialization'
    },
    {
      id: '3',
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023',
      certificateUrl: 'https://meta.com/react-certification'
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
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Experience & <span className="gradient-text">Certifications</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey and continuous learning achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Internships Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <HiBriefcase className="w-8 h-8 text-primary-600" />
                <h3 className="text-2xl font-bold">Internships</h3>
              </div>

              <div className="space-y-6">
                {internships.map((internship, index) => (
                  <motion.div
                    key={internship.id}
                    variants={itemVariants}
                    className="card p-6 relative"
                  >
                    {index !== internships.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-transparent" />
                    )}
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <HiBriefcase className="w-6 h-6 text-primary-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-1">{internship.role}</h4>
                        <p className="text-primary-600 font-medium mb-2">{internship.organization}</p>
                        
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                          <HiCalendar className="w-4 h-4" />
                          <span className="text-sm">{internship.duration}</span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {internship.description}
                        </p>
                        
                        {internship.certificateUrl && (
                          <motion.a
                            href={internship.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                          >
                            <HiExternalLink className="w-4 h-4" />
                            View Certificate
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <HiAcademicCap className="w-8 h-8 text-primary-600" />
                <h3 className="text-2xl font-bold">Certifications</h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <HiAcademicCap className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{cert.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{cert.issuer}</p>
                        <p className="text-sm text-gray-500">{cert.date}</p>
                      </div>
                      
                      {cert.certificateUrl && (
                        <motion.a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <HiExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Internships