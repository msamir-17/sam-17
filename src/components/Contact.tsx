// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import { useState } from 'react'
// import { HiMail, HiUser, HiChatAlt, HiDownload, HiCheckCircle } from 'react-icons/hi'
// import { ContactForm } from '@/types'

// const Contact = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const [formData, setFormData] = useState<ContactForm>({
//     name: '',
//     email: '',
//     message: ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false)
//       setIsSubmitted(true)
//       setFormData({ name: '', email: '', message: '' })
      
//       // Reset success state after 3 seconds
//       setTimeout(() => setIsSubmitted(false), 3000)
//     }, 1500)
//   }

//   const downloadResume = () => {
//     const link = document.createElement('a')
//     link.href = '/samir-r.pdf'
//     link.download = 'Samir_Resume.pdf'
//     link.click()
//   }

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
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   }

//   return (
//     <section id="contact" className="section-padding">
//       <div className="container-custom">
//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//               Get In <span className="gradient-text">Touch</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               Ready to collaborate on your next project? Let's discuss how we can work together
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Contact Form */}
//             <motion.div variants={itemVariants}>
//               <div className="card p-8">
//                 <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                   <HiMail className="text-primary-600" />
//                   Send Message
//                 </h3>

//                 {isSubmitted ? (
//                   <motion.div
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     className="text-center py-8"
//                   >
//                     <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//                     <h4 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h4>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       Thank you for reaching out. I'll get back to you soon!
//                     </p>
//                   </motion.div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium mb-2">
//                         Full Name
//                       </label>
//                       <div className="relative">
//                         <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                           type="text"
//                           id="name"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
//                           placeholder="Enter your full name"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium mb-2">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
//                           placeholder="Enter your email address"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="message" className="block text-sm font-medium mb-2">
//                         Message
//                       </label>
//                       <div className="relative">
//                         <HiChatAlt className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//                         <textarea
//                           id="message"
//                           name="message"
//                           value={formData.message}
//                           onChange={handleChange}
//                           required
//                           rows={6}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
//                           placeholder="Tell me about your project or just say hello!"
//                         />
//                       </div>
//                     </div>

//                     <motion.button
//                       type="submit"
//                       disabled={isSubmitting}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
//                         isSubmitting
//                           ? 'bg-gray-400 cursor-not-allowed'
//                           : 'btn-primary'
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <div className="flex items-center justify-center gap-2">
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           Sending...
//                         </div>
//                       ) : (
//                         'Send Message'
//                       )}
//                     </motion.button>
//                   </form>
//                 )}
//               </div>
//             </motion.div>

//             {/* Contact Info */}
//             <motion.div variants={itemVariants} className="space-y-8">
//               <div className="card p-8">
//                 <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
//                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
//                   I'm always excited to discuss new opportunities, collaborate on interesting projects, 
//                   or simply chat about technology and innovation. Feel free to reach out!
//                 </p>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
//                       <HiMail className="w-6 h-6 text-primary-600" />
//                     </div>
//                     <div>
//                       <p className="font-semibold">Email</p>
//                       <p className="text-gray-600 dark:text-gray-400">samir.dev@example.com</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="card p-8 bg-gradient-to-br from-primary-500 to-purple-600 text-white"
//               >
//                 <h3 className="text-2xl font-bold mb-4">Download Resume</h3>
//                 <p className="mb-6 opacity-90">
//                   Get a detailed overview of my experience, skills, and projects.
//                 </p>
//                 <motion.button
//                   onClick={downloadResume}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-white/30"
//                 >
//                   <HiDownload className="w-5 h-5" />
//                   Download Resume
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Contact

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { HiMail, HiUser, HiChatAlt, HiDownload, HiCheckCircle, HiPhone, HiLocationMarker, HiGlobeAlt } from 'react-icons/hi'
import { ContactForm } from '@/types'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1500)
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Samir_Resume.pdf'
    link.click()
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

  const contactInfo = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'samir.dev@example.com',
      href: 'mailto:samir.dev@example.com',
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
    <section id="contact" className="section-spacing bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 15,
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
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-block mb-4"
              whileHover={{ scale: 1.1 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                📞 Let's Connect
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Get In{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate on your next project? Let's discuss how we can work together to create something amazing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="glass-effect p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                    <HiMail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send Message</h3>
                    <p className="text-gray-600 dark:text-gray-400">I'll get back to you within 24 hours</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16 space-y-6"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                    >
                      <HiCheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="space-y-3">
                      <h4 className="text-3xl font-bold text-green-600 dark:text-green-400">Message Sent!</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Thank you for reaching out. I'll get back to you soon!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Full Name *
                        </label>
                        <div className="relative">
                          <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Email Address *
                        </label>
                        <div className="relative">
                          <HiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Message *
                      </label>
                      <div className="relative">
                        <HiChatAlt className="absolute left-4 top-6 text-gray-400 w-5 h-5" />
                        <motion.textarea
                          whileFocus={{ scale: 1.02 }}
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none placeholder-gray-400"
                          placeholder="Tell me about your project, ideas, or just say hello! I'd love to hear from you."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <HiMail className="w-5 h-5" />
                          Send Message
                        </div>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info & Resume */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Information */}
              <div className="glass-effect p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {info.label}
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Resume Download */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-effect p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl border border-blue-400/50"
              >
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <HiDownload className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Download Resume</h3>
                    <p className="opacity-90 leading-relaxed">
                      Get a detailed overview of my experience, skills, and projects in a comprehensive PDF format.
                    </p>
                  </div>

                  <motion.button
                    onClick={downloadResume}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-white/30 hover:shadow-xl"
                  >
                    <HiDownload className="w-5 h-5" />
                    Download Resume
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact