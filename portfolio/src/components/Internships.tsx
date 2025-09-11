// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import { HiAcademicCap, HiExternalLink, HiCalendar, HiBriefcase } from 'react-icons/hi'
// import { Internship } from '@/types'

// const Internships = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const internships: Internship[] = [
//     {
//       id: '1',
//       role: 'AI/ML Engineer Intern',
//       organization: 'TechCorp Solutions',
//       duration: 'Jun 2024 - Aug 2024',
//       description: 'Developed machine learning models for predictive analytics and worked on natural language processing projects. Implemented automated data pipelines and improved model accuracy by 15%.',
//       certificateUrl: 'https://certificate.example.com/ml-intern'
//     },
//     {
//       id: '2',
//       role: 'Full Stack Developer Intern',
//       organization: 'StartupXYZ',
//       duration: 'Jan 2024 - May 2024',
//       description: 'Built responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions and improved application performance by 30%.',
//       certificateUrl: 'https://certificate.example.com/fullstack-intern'
//     },
//     {
//       id: '3',
//       role: 'Python Developer Intern',
//       organization: 'DataTech Labs',
//       duration: 'Sep 2023 - Dec 2023',
//       description: 'Developed data analysis tools and automated reporting systems. Created RESTful APIs using FastAPI and worked with large datasets for business intelligence solutions.',
//       certificateUrl: 'https://certificate.example.com/python-intern'
//     }
//   ]

//   const certifications = [
//     {
//       id: '1',
//       name: 'AWS Cloud Practitioner',
//       issuer: 'Amazon Web Services',
//       date: '2024',
//       certificateUrl: 'https://aws.amazon.com/certification/'
//     },
//     {
//       id: '2',
//       name: 'Machine Learning Specialization',
//       issuer: 'Stanford University',
//       date: '2023',
//       certificateUrl: 'https://coursera.org/ml-specialization'
//     },
//     {
//       id: '3',
//       name: 'React Developer Certification',
//       issuer: 'Meta',
//       date: '2023',
//       certificateUrl: 'https://meta.com/react-certification'
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
//     hidden: { opacity: 0, x: -50 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: { duration: 0.6 }
//     }
//   }

//   return (
//     <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
//       <div className="container-custom">
//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
//               Experience & <span className="gradient-text">Certifications</span>
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               My professional journey and continuous learning achievements
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Internships Section */}
//             <motion.div variants={itemVariants}>
//               <div className="flex items-center gap-3 mb-8">
//                 <HiBriefcase className="w-8 h-8 text-primary-600" />
//                 <h3 className="text-2xl font-bold">Internships</h3>
//               </div>

//               <div className="space-y-6">
//                 {internships.map((internship, index) => (
//                   <motion.div
//                     key={internship.id}
//                     variants={itemVariants}
//                     className="card p-6 relative"
//                   >
//                     {index !== internships.length - 1 && (
//                       <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-transparent" />
//                     )}

//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
//                         <HiBriefcase className="w-6 h-6 text-primary-600" />
//                       </div>

//                       <div className="flex-1">
//                         <h4 className="text-xl font-semibold mb-1">{internship.role}</h4>
//                         <p className="text-primary-600 font-medium mb-2">{internship.organization}</p>

//                         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
//                           <HiCalendar className="w-4 h-4" />
//                           <span className="text-sm">{internship.duration}</span>
//                         </div>

//                         <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
//                           {internship.description}
//                         </p>

//                         {internship.certificateUrl && (
//                           <motion.a
//                             href={internship.certificateUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             whileHover={{ scale: 1.05 }}
//                             className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
//                           >
//                             <HiExternalLink className="w-4 h-4" />
//                             View Certificate
//                           </motion.a>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Certifications Section */}
//             <motion.div variants={itemVariants}>
//               <div className="flex items-center gap-3 mb-8">
//                 <HiAcademicCap className="w-8 h-8 text-primary-600" />
//                 <h3 className="text-2xl font-bold">Certifications</h3>
//               </div>

//               <div className="space-y-4">
//                 {certifications.map((cert) => (
//                   <motion.div
//                     key={cert.id}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.02 }}
//                     className="card p-6 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                         <HiAcademicCap className="w-6 h-6 text-white" />
//                       </div>

//                       <div className="flex-1">
//                         <h4 className="font-semibold text-lg mb-1">{cert.name}</h4>
//                         <p className="text-gray-600 dark:text-gray-400 mb-1">{cert.issuer}</p>
//                         <p className="text-sm text-gray-500">{cert.date}</p>
//                       </div>

//                       {cert.certificateUrl && (
//                         <motion.a
//                           href={cert.certificateUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="text-primary-600 hover:text-primary-700"
//                         >
//                           <HiExternalLink className="w-5 h-5" />
//                         </motion.a>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Internships

// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import { HiAcademicCap, HiExternalLink, HiCalendar, HiBriefcase } from 'react-icons/hi'
// import { HiCheckBadge } from "react-icons/hi2";
// import { Internship } from '@/types'

// const Internships = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const internships: Internship[] = [
//     {
//       id: '1',
//       role: 'AI/ML Engineer Intern',
//       organization: 'TechCorp Solutions',
//       duration: 'Jun 2024 - Aug 2024',
//       description: 'Developed machine learning models for predictive analytics and worked on natural language processing projects. Implemented automated data pipelines and improved model accuracy by 15%.',
//       certificateUrl: 'https://certificate.example.com/ml-intern'
//     },
//     {
//       id: '2',
//       role: 'Full Stack Developer Intern',
//       organization: 'StartupXYZ',
//       duration: 'Jan 2024 - May 2024',
//       description: 'Built responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions and improved application performance by 30%.',
//       certificateUrl: 'https://certificate.example.com/fullstack-intern'
//     },
//     {
//       id: '3',
//       role: 'Python Developer Intern',
//       organization: 'DataTech Labs',
//       duration: 'Sep 2023 - Dec 2023',
//       description: 'Developed data analysis tools and automated reporting systems. Created RESTful APIs using FastAPI and worked with large datasets for business intelligence solutions.',
//       certificateUrl: 'https://certificate.example.com/python-intern'
//     }
//   ]

//   const certifications = [
//     {
//       id: '1',
//       name: 'AWS Cloud Practitioner',
//       issuer: 'Amazon Web Services',
//       date: '2024',
//       certificateUrl: 'https://aws.amazon.com/certification/',
//       logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=60&h=60&fit=crop&crop=center'
//     },
//     {
//       id: '2',
//       name: 'Machine Learning Specialization',
//       issuer: 'Stanford University',
//       date: '2023',
//       certificateUrl: 'https://coursera.org/ml-specialization',
//       logo: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=60&h=60&fit=crop&crop=center'
//     },
//     {
//       id: '3',
//       name: 'React Developer Certification',
//       issuer: 'Meta',
//       date: '2023',
//       certificateUrl: 'https://meta.com/react-certification',
//       logo: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=60&h=60&fit=crop&crop=center'
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
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   }

//   return (
//     <section id="experience" className="section-spacing notion-bg">
//       <div className="section-container">
//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <motion.div className="inline-block mb-4" whileHover={{ scale: 1.1 }}>
//               <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold rounded-full">
//                 🎓 Professional Journey
//               </span>
//             </motion.div>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
//               Experience &{' '}
//               <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                 Certifications
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
//               My professional journey and continuous learning achievements that shape my expertise in AI, ML, and full-stack development
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
//             {/* Internships Section */}
//             <motion.div variants={itemVariants} className="space-y-8">
//               <div className="flex items-center gap-4 mb-12">
//                 <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
//                   <HiBriefcase className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Internships</h3>
//                   <p className="text-gray-600 dark:text-gray-400">Building experience through hands-on work</p>
//                 </div>
//               </div>

//               <div className="space-y-8">
//                 {internships.map((internship, index) => (
//                   <motion.div
//                     key={internship.id}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.02, y: -5 }}
//                     className="relative"
//                   >
//                     {index !== internships.length - 1 && (
//                       <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
//                     )}

//                     <div className="glass-effect p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
//                       <div className="flex items-start gap-6">
//                         <motion.div 
//                           className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
//                           whileHover={{ rotate: 360, scale: 1.1 }}
//                           transition={{ duration: 0.6 }}
//                         >
//                           <HiBriefcase className="w-8 h-8 text-white" />
//                         </motion.div>

//                         <div className="flex-1 space-y-4">
//                           <div>
//                             <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{internship.role}</h4>
//                             <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">{internship.organization}</p>
//                           </div>
//                           <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//                             <HiCalendar className="w-5 h-5" />
//                             <span className="font-medium">{internship.duration}</span>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{internship.description}</p>

//                           {internship.certificateUrl && (
//                             <motion.a
//                               href={internship.certificateUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               whileHover={{ scale: 1.05 }}
//                               className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors group"
//                             >
//                               <HiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                               View Certificate
//                             </motion.a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Certifications Section */}
//             <motion.div variants={itemVariants} className="space-y-8">
//               <div className="flex items-center gap-4 mb-12">
//                 <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
//                   <HiAcademicCap className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Certifications</h3>
//                   <p className="text-gray-600 dark:text-gray-400">Validated skills and expertise</p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {certifications.map((cert, index) => (
//                   <motion.div
//                     key={cert.id}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.03, y: -3 }}
//                     className="glass-effect p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group"
//                   >
//                     <div className="flex items-center gap-6">
//                       <div className="flex-shrink-0 relative">
//                         <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
//                           <HiCheckBadge className="w-8 h-8 text-white" />
//                         </div>
//                         <motion.div
//                           className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
//                           animate={{ rotate: [0, 10, -10, 0] }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         >
//                           <span className="text-xs">✓</span>
//                         </motion.div>
//                       </div>

//                       <div className="flex-1 space-y-2">
//                         <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
//                           {cert.name}
//                         </h4>
//                         <p className="text-gray-600 dark:text-gray-400 font-medium">{cert.issuer}</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-500">Earned in {cert.date}</p>
//                       </div>

//                       {cert.certificateUrl && (
//                         <motion.a
//                           href={cert.certificateUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           whileHover={{ scale: 1.2, rotate: 15 }}
//                           whileTap={{ scale: 0.9 }}
//                           className="p-3 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
//                         >
//                           <HiExternalLink className="w-6 h-6" />
//                         </motion.a>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Achievement Stats */}
//           <motion.div
//             variants={itemVariants}
//             className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
//           >
//             {[
//               { label: 'Internships Completed', value: '3+', icon: '💼', color: 'from-blue-500 to-purple-500' },
//               { label: 'Certifications Earned', value: '10+', icon: '🏆', color: 'from-green-500 to-emerald-500' },
//               { label: 'Skills Mastered', value: '15+', icon: '⚡', color: 'from-orange-500 to-red-500' },
//               { label: 'Projects Built', value: '20+', icon: '🚀', color: 'from-pink-500 to-purple-500' }
//             ].map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 className="text-center"
//               >
//                 <div className={`p-6 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg mb-4 mx-auto w-fit`}>
//                   <div className="text-3xl">{stat.icon}</div>
//                 </div>
//                 <motion.div
//                   className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
//                   initial={{ scale: 0 }}
//                   animate={inView ? { scale: 1 } : { scale: 0 }}
//                   transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
//                 >
//                   {stat.value}
//                 </motion.div>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
//                   {stat.label}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Internships







'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiAcademicCap, HiExternalLink, HiCalendar, HiBriefcase } from 'react-icons/hi'
import { HiCheckBadge } from 'react-icons/hi2'
import { Internship } from '@/types'

import { useState, useEffect } from 'react';
import axios from 'axios'

// Backend se match karne ke liye naya Internship type
interface DynamicInternship {
  _id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
  certificateUrl?: string; // Optional
}

// Backend se match karne ke liye Certificate type
interface DynamicCertificate {
  _id: string;
  title: string;       // Aapke hardcoded data mein 'name' tha
  issuedBy: string;    // Aapke hardcoded data mein 'issuer' tha
  dateEarned: string;  // Aapke hardcoded data mein 'date' tha
  certificateLink: string; // Aapke hardcoded data mein 'certificateUrl' tha
}
const Internships = () => {
  const [internshipsRef, internshipsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [certificationsRef, certificationsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // const internships: Internship[] = [
  //   {
  //     id: '1',
  //     role: 'AI/ML Engineer Intern',
  //     organization: 'TechCorp Solutions',
  //     duration: 'Jun 2024 - Aug 2024',
  //     description: 'Developed machine learning models for predictive analytics and worked on natural language processing projects. Implemented automated data pipelines and improved model accuracy by 15%.',
  //     certificateUrl: 'https://certificate.example.com/ml-intern'
  //   },
  //   {
  //     id: '2',
  //     role: 'Full Stack Developer Intern',
  //     organization: 'StartupXYZ',
  //     duration: 'Jan 2024 - May 2024',
  //     description: 'Built responsive web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions and improved application performance by 30%.',
  //     certificateUrl: 'https://certificate.example.com/fullstack-intern'
  //   },
  //   {
  //     id: '3',
  //     role: 'Python Developer Intern',
  //     organization: 'DataTech Labs',
  //     duration: 'Sep 2023 - Dec 2023',
  //     description: 'Developed data analysis tools and automated reporting systems. Created RESTful APIs using FastAPI and worked with large datasets for business intelligence solutions.',
  //     certificateUrl: 'https://certificate.example.com/python-intern'
  //   }
  // ]

  // const certifications = [
  //   {
  //     id: '1',
  //     name: 'AWS Cloud Practitioner',
  //     issuer: 'Amazon Web Services',
  //     date: '2024',
  //     certificateUrl: 'https://aws.amazon.com/certification/',
  //     logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=60&h=60&fit=crop&crop=center'
  //   },
  //   {
  //     id: '2',
  //     name: 'Machine Learning Specialization',
  //     issuer: 'Stanford University',
  //     date: '2023',
  //     certificateUrl: 'https://coursera.org/ml-specialization',
  //     logo: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=60&h=60&fit=crop&crop=center'
  //   },
  //   {
  //     id: '3',
  //     name: 'React Developer Certification',
  //     issuer: 'Meta',
  //     date: '2023',
  //     certificateUrl: 'https://meta.com/react-certification',
  //     logo: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=60&h=60&fit=crop&crop=center'
  //   }
  // ]




  // Animation variants for left-to-right crawl effect

  const [internships, setInternships] = useState<DynamicInternship[]>([]);
  const [certifications, setCertifications] = useState<DynamicCertificate[]>([]);
  const [loading, setLoading] = useState(true);

  // useState ke neeche yeh code add karein

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Promise.all ka istemaal karke dono requests ek saath bhejein
        const [internshipsRes, certificationsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/internships'),
          axios.get('http://localhost:5000/api/certificates')
        ]);

        // Dono ke data ko respective states mein daal dein
        setInternships(internshipsRes.data);
        setCertifications(certificationsRes.data);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const leftToRightVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const rightToLeftVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const sectionHeaderVariants = {
    hidden: {
      opacity: 0,
      y: -50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">Loading Experiences...</h2>
      </section>
    );
  }

  return (
    <>
      {/* Internships Section */}
      <section id="internships" className="section-spacing relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full filter blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full filter blur-3xl"
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
            ref={internshipsRef}
            initial="hidden"
            animate={internshipsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={sectionHeaderVariants} className="text-center mb-16">
              <motion.div
                className="inline-block mb-4"
                whileHover={{ scale: 1.1 }}
              >
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400">
                  💼 Professional Experience
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                My{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent animate-pulse-glow">
                  Internships
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Hands-on professional experience that shaped my skills in AI, ML, and full-stack development
              </p>
            </motion.div>

            {/* Internships Grid */}
            <div className="space-y-12">
              {internships.map((internship, index) => (
                <motion.div
                  key={internship._id}
                  variants={index % 2 === 0 ? leftToRightVariants : rightToLeftVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-8`}
                >
                  <div className="lg:w-1/2">
                    <div className="glass-effect p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm h-full">
                      <div className="flex items-start gap-6">
                        <motion.div
                          className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <HiBriefcase className="w-8 h-8 text-white" />
                        </motion.div>

                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {internship.role}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                              {internship.organization}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <HiCalendar className="w-5 h-5" />
                            <span className="font-medium">{internship.duration}</span>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {internship.description}
                          </p>

                          {internship.certificateUrl && (
                            <motion.a
                              href={internship.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors group"
                            >
                              <HiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              View Certificate
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="lg:w-1/2 flex items-center justify-center">
                    <motion.div
                      className="w-120 h-64 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center"
                      
                      
                    >
                     
                      <div className="w-108 h-50 bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-2xl">
                        <span className="text-4xl font-bold text-white">#{index + 1}
                             {/* <img
                        src={internship.imageUrl}
                        alt={internship.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      /> */}
                        </span>
                      </div>


                      {/* add certificate here  */}


                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-spacing relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-emerald-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full filter blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              rotate: [-360, -180, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

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

            {/* Certifications Grid */}
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

                    {cert.certificateLink && (
                      <motion.a
                        href={cert.certificateLink}
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
      </section>
    </>
  )
}

export default Internships