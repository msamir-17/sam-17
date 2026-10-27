'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { HiMail, HiUser, HiChatAlt, HiCheckCircle, HiX } from 'react-icons/hi'
import { ContactForm } from '@/types'
import api from '@/lib/axios'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ESC key and body scroll lock for Contact Modal
  useEffect(() => {
    if (!isModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await api.post('/contact', formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => {
        setIsSubmitted(false)
        setIsModalOpen(false)
      }, 2500)
    } catch (err: any) {
      setIsSubmitting(false)
      setError(err?.response?.data?.message || 'Failed to send message. Please try again.')
      setTimeout(() => setError(null), 5000)
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
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section id="contact" className="section-spacing bg-gray-50/50 dark:bg-gradient-to-b dark:from-[#14182D] dark:via-[#0C1323] dark:to-[#0C1323]">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <span className="section-badge">
              <HiMail className="w-4 h-4" />
              Get in Touch
            </span>
            <h2 className="section-title">
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Amazing</span>
            </h2>
          </motion.div>

          {/* Main Action Banner Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-[var(--color-bg-tertiary)] rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-100 dark:border-[var(--color-border)] relative overflow-hidden"
          >
            {/* Subtle glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                Have an exciting project, a role opportunity, or an idea to discuss? 
                Feel free to reach out — my inbox is always open!
              </p>

              {/* Primary CTA Button */}
              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-9 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm active:scale-[0.98] group cursor-pointer"
                >
                  <HiMail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Send a Message
                </button>
              </div>
            </div>
          </motion.div>


        </motion.div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          INTERACTIVE EMAIL MODAL (Popup Form)
          ═════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              className="bg-white dark:bg-[#0C1323] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-[var(--color-border)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                    <HiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Send Message</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Directly sends to my inbox</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg text-white">
                    <HiCheckCircle className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-green-600 dark:text-green-400">Message Sent!</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[var(--color-bg-inset)] text-gray-900 dark:text-white transition-all placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[var(--color-bg-inset)] text-gray-900 dark:text-white transition-all placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <div className="relative">
                      <HiChatAlt className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
                      <textarea
                        id="modal-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[var(--color-bg-inset)] text-gray-900 dark:text-white transition-all resize-none placeholder-gray-400"
                        placeholder="Hi Samir, let's discuss..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-2.5 text-xs text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-center font-medium">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-300 dark:bg-[var(--color-bg-inset)] cursor-not-allowed text-gray-500'
                          : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <HiMail className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Contact