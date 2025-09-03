'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi'
import { Testimonial } from '@/types'

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'Senior AI Researcher',
      organization: 'TechCorp Solutions',
      quote: 'Samir demonstrated exceptional skills in machine learning and AI development. His innovative approach to problem-solving and attention to detail made him an invaluable team member during his internship.',
      avatar: 'https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Lead Full Stack Developer',
      organization: 'StartupXYZ',
      quote: 'Working with Samir was a pleasure. His ability to quickly grasp complex concepts and deliver high-quality code consistently impressed our entire development team. He has a bright future ahead.',
      avatar: 'https://via.placeholder.com/80x80/10B981/FFFFFF?text=MC'
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      role: 'Project Manager',
      organization: 'DataTech Labs',
      quote: 'Samir\'s dedication and technical expertise were evident from day one. He contributed significantly to our Python projects and showed remarkable growth throughout his internship period.',
      avatar: 'https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=LR'
    }
  ]

  const achievements = [
    { label: 'Projects Completed', value: '15+', icon: '🚀' },
    { label: 'Technologies Mastered', value: '20+', icon: '💻' },
    { label: 'Hackathons Won', value: '3', icon: '🏆' },
    { label: 'Client Satisfaction', value: '100%', icon: '⭐' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="testimonials" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              What People <span className="gradient-text">Say</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Testimonials from colleagues and mentors who have worked with me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonials Slider */}
            <motion.div variants={itemVariants} className="relative">
              <div className="card p-8 relative min-h-[300px] flex flex-col justify-center">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-primary-600 font-medium">{testimonials[currentIndex].role}</p>
                      <p className="text-sm text-gray-500">{testimonials[currentIndex].organization}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Dots indicator */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex 
                            ? 'bg-primary-600' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="card p-6 text-center"
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <motion.div
                    className="text-3xl font-bold text-primary-600 mb-2"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    {achievement.value}
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {achievement.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials