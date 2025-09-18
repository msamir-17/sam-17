

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiAcademicCap, HiExternalLink, HiCalendar, HiBriefcase } from 'react-icons/hi'
import { HiCheckBadge } from 'react-icons/hi2'
import { Internship } from '@/types'
const Certification = () => {
      const [certificationsRef, certificationsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  return (
    <>
      <div className="section-container relative z-10">
          <motion.div
            ref={certificationsRef}
            initial="hidden"
            animate={certificationsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={sectionHeaderVariants} className="text-center mb-16">
              <motion.div
                className="inline-block mb-4"
                whileHover={{ scale: 1.1 }}
              >
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  🏆 Validated Skills
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                My{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse-glow">
                  Certifications
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Professional certifications that validate my expertise and commitment to continuous learning
              </p>
            </motion.div>

            {/* Certifications section hai ye Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  variants={leftToRightVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass-effect p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      className="flex-shrink-0 relative mx-auto w-fit"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
                        <HiCheckBadge className="w-10 h-10 text-white" />
                      </div>
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-sm font-bold">✓</span>
                      </motion.div>
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {cert.issuedBy}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Earned in {cert.dateEarned}
                      </p>
                    </div>

                    {cert.certificateUrl && (
                      <motion.a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-green-600 transition-colors"
                      >
                        <HiExternalLink className="w-4 h-4" />
                        View Certificate
                      </motion.a>
                    )}

                    {/* Progress Indicator */}
                    <motion.div
                      className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={certificationsInView ? { width: '100%' } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}

              {/* Add More Certifications Card */}
              <motion.div
                variants={leftToRightVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-effect p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center group cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center"
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📚
                </motion.div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  Always Learning
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  More certifications coming soon!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
    </>
  )
}

export default Certification
