'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { HiMail, HiUser, HiChatAlt, HiCheckCircle, HiPhone, HiLocationMarker, HiGlobeAlt } from 'react-icons/hi'
import { ContactForm } from '@/types'
import api from '@/lib/axios'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      setTimeout(() => setIsSubmitted(false), 4000)
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
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const contactInfo = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'samirkhan003786@gmail.com',
      href: 'mailto:samirkhan003786@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HiPhone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Nagpur, Maharashtra, IN',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HiGlobeAlt,
      label: 'Timezone',
      value: 'IST (GMT+5:30)',
      href: '#',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="contact" className="section-spacing bg-gray-50/50 dark:bg-gradient-to-b dark:from-[#14182D] dark:via-[#0C1323] dark:to-[#0C1323]">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">
              Ready to collaborate on your next project? Let&apos;s discuss how we can work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white dark:bg-[var(--color-bg-tertiary)] p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-[var(--color-border)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <HiMail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send Message</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">I&apos;ll get back to you within 24 hours</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16 space-y-4"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <HiCheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">Message Sent!</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for reaching out. I&apos;ll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="contact-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[var(--color-bg-inset)] text-gray-900 dark:text-white transition-all duration-200 placeholder-gray-400 text-sm"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <HiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[var(--color-bg-inset)] text-gray-900 dark:text-white transition-all duration-200 placeholder-gray-400 text-sm"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <HiChatAlt className="absolute left-4 top-4 text-gray-400 w-4 h-4" />
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[var(--color-bg-inset)] text-gray-900 dark:text-white transition-all duration-200 resize-none placeholder-gray-400 text-sm"
                          placeholder="Tell me about your project or just say hello!"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-center font-medium">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-300 dark:bg-[var(--color-bg-inset)]/80 cursor-not-allowed text-gray-500'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <HiMail className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="bg-white dark:bg-[var(--color-bg-tertiary)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-[var(--color-border)]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[var(--color-bg-inset)]/50 hover:bg-gray-100 dark:hover:bg-[var(--color-surface-hover)] transition-colors duration-200 group"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                          {info.label}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact