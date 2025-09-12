// // 'use client'

// // import { motion } from 'framer-motion'
// // import { useInView } from 'react-intersection-observer'
// // import { HiExternalLink, HiCode } from 'react-icons/hi'
// // import { Project } from '@/types'

// // const Projects = () => {
// //   const [ref, inView] = useInView({
// //     triggerOnce: true,
// //     threshold: 0.1
// //   })

// //   const projects: Project[] = [
// //     {
// //       id: '1',
// //       title: 'Medical Chatbot',
// //       description: 'An AI-powered medical chatbot that provides instant health consultations using natural language processing and machine learning algorithms.',
// //       technologies: ['Python', 'FastAPI', 'TensorFlow', 'NLP', 'React'],
// //       githubUrl: 'https://github.com/samir/medical-chatbot',
// //       liveUrl: 'https://medical-chatbot.demo.com',
// //       imageUrl: "./new.png"
// //     },
// //     {
// //       id: '2',
// //       title: 'Fit4You',
// //       description: 'A comprehensive fitness tracking application with personalized workout plans, nutrition tracking, and progress analytics.',
// //       technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'Node.js'],
// //       githubUrl: 'https://github.com/samir/fit4you',
// //       liveUrl: 'https://fit4you.demo.com',
// //       imageUrl: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Fit4You'
// //     },
// //     {
// //       id: '3',
// //       title: 'WhatsApp Auto-Reply Bot',
// //       description: 'An intelligent WhatsApp automation bot that handles customer inquiries, schedules appointments, and provides instant responses.',
// //       technologies: ['Python', 'Selenium', 'WhatsApp API', 'Machine Learning', 'SQLite'],
// //       githubUrl: 'https://github.com/samir/whatsapp-auto-reply',
// //       imageUrl: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=WhatsApp+Bot'
// //     }
// //   ]

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.2
// //       }
// //     }
// //   }

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 50 },
// //     visible: { 
// //       opacity: 1, 
// //       y: 0,
// //       transition: { duration: 0.6 }
// //     }
// //   }

// //   return (
// //     <section id="projects" className="section-padding">
// //       <div className="container-custom">
// //         <motion.div
// //           ref={ref}
// //           initial="hidden"
// //           animate={inView ? "visible" : "hidden"}
// //           variants={containerVariants}
// //         >
// //           <motion.div variants={itemVariants} className="text-center mb-12">
// //             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
// //               Featured <span className="gradient-text">Projects</span>
// //             </h2>
// //             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
// //               A showcase of my recent work combining AI, web development, and innovative solutions
// //             </p>
// //           </motion.div>

// //           <motion.div 
// //             variants={containerVariants}
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
// //           >
// //             {projects.map((project, index) => (
// //               <motion.div
// //                 key={project.id}
// //                 variants={itemVariants}
// //                 whileHover={{ y: -10 }}
// //                 className="card overflow-hidden group"
// //               >
// //                 <div className="relative overflow-hidden">
// //                   <img
// //                     src={project.imageUrl}
// //                     alt={project.title}
// //                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                 </div>

// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
// //                     {project.title}
// //                   </h3>
                  
// //                   <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
// //                     {project.description}
// //                   </p>

// //                   <div className="mb-4">
// //                     <div className="flex flex-wrap gap-2">
// //                       {project.technologies.map((tech) => (
// //                         <span
// //                           key={tech}
// //                           className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
// //                         >
// //                           {tech}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-3">
// //                     {project.githubUrl && (
// //                       <motion.a
// //                         href={project.githubUrl}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         whileHover={{ scale: 1.05 }}
// //                         whileTap={{ scale: 0.95 }}
// //                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
// //                       >
// //                         <HiCode className="w-4 h-4" />
// //                         Code
// //                       </motion.a>
// //                     )}
                    
// //                     {project.liveUrl && (
// //                       <motion.a
// //                         href={project.liveUrl}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         whileHover={{ scale: 1.05 }}
// //                         whileTap={{ scale: 0.95 }}
// //                         className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
// //                       >
// //                         <HiExternalLink className="w-4 h-4" />
// //                         Live Demo
// //                       </motion.a>
// //                     )}
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </section>
// //   )
// // }

// // export default Projects


// // 'use client'

// // import { motion } from 'framer-motion';
// // import { useInView } from 'react-intersection-observer'
// // import { useState, useRef } from 'react'
// // import { HiExternalLink, HiCode, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
// // import { Project } from '@/types'

// // const Projects = () => {
// //   const [ref, inView] = useInView({
// //     triggerOnce: true,
// //     threshold: 0.1
// //   })

// //   const scrollRef = useRef<HTMLDivElement>(null)
// //   const [canScrollLeft, setCanScrollLeft] = useState(false)
// //   const [canScrollRight, setCanScrollRight] = useState(true)

// //   const projects: Project[] = [
// //     {
// //       id: '1',
// //       title: 'Medical Chatbot',
// //       description: 'An AI-powered medical chatbot that provides instant health consultations using natural language processing and machine learning algorithms to assist patients and healthcare professionals.',
// //       technologies: ['Python', 'FastAPI', 'TensorFlow', 'NLP', 'React', 'OpenAI'],
// //       githubUrl: 'https://github.com/samir/medical-chatbot',
// //       liveUrl: 'https://medical-chatbot.demo.com',
// //       imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop'
// //     },
// //     {
// //       id: '2',
// //       title: 'Fit4You',
// //       description: 'A comprehensive fitness tracking application with personalized workout plans, nutrition tracking, progress analytics, and AI-powered recommendations for optimal health outcomes.',
// //       technologies: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Chart.js', 'Node.js', 'AI Analytics'],
// //       githubUrl: 'https://github.com/samir/fit4you',
// //       liveUrl: 'https://fit4you.demo.com',
// //       imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
// //     },
// //     {
// //       id: '3',
// //       title: 'WhatsApp Auto-Reply Bot',
// //       description: 'An intelligent WhatsApp automation bot that handles customer inquiries, schedules appointments, provides instant responses using advanced NLP and machine learning capabilities.',
// //       technologies: ['Python', 'Selenium', 'WhatsApp API', 'Machine Learning', 'SQLite', 'OpenAI'],
// //       githubUrl: 'https://github.com/samir/whatsapp-auto-reply',
// //       imageUrl: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=250&fit=crop'
// //     },
// //     {
// //       id: '4',
// //       title: 'E-Commerce AI Assistant',
// //       description: 'Smart e-commerce platform with AI-powered product recommendations, voice search, and personalized shopping experiences using cutting-edge machine learning algorithms.',
// //       technologies: ['React', 'Python', 'TensorFlow', 'Stripe API', 'AWS', 'Redis'],
// //       githubUrl: 'https://github.com/samir/ecommerce-ai',
// //       liveUrl: 'https://ecommerce-ai.demo.com',
// //       imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
// //     },
// //     {
// //       id: '5',
// //       title: 'Data Visualization Dashboard',
// //       description: 'Interactive dashboard for complex data analysis with real-time updates, machine learning insights, and beautiful visualizations for business intelligence.',
// //       technologies: ['D3.js', 'React', 'Python', 'Pandas', 'FastAPI', 'WebSocket'],
// //       githubUrl: 'https://github.com/samir/data-dashboard',
// //       liveUrl: 'https://data-dashboard.demo.com',
// //       imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
// //     }
// //   ]

// //   const scroll = (direction: 'left' | 'right') => {
// //     if (scrollRef.current) {
// //       const scrollAmount = 400
// //       const newScrollLeft = direction === 'left' 
// //         ? scrollRef.current.scrollLeft - scrollAmount
// //         : scrollRef.current.scrollLeft + scrollAmount
      
// //       scrollRef.current.scrollTo({
// //         left: newScrollLeft,
// //         behavior: 'smooth'
// //       })
// //     }
// //   }

// //   const handleScroll = () => {
// //     if (scrollRef.current) {
// //       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
// //       setCanScrollLeft(scrollLeft > 0)
// //       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
// //     }
// //   }

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.2
// //       }
// //     }
// //   }

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 50 },
// //     visible: { 
// //       opacity: 1, 
// //       y: 0,
// //       transition: { duration: 0.6 }
// //     }
// //   }

// //   return (
// //     <section id="projects" className="section-spacing bg-white dark:bg-gray-950">
// //       <div className="section-container">
// //         <motion.div
// //           ref={ref}
// //           initial="hidden"
// //           animate={inView ? "visible" : "hidden"}
// //           variants={containerVariants}
// //         >
// //           <motion.div variants={itemVariants} className="text-center mb-16">
// //             <motion.div 
// //               className="inline-block mb-4"
// //               whileHover={{ scale: 1.1 }}
// //             >
// //               <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
// //                 💼 Featured Work
// //               </span>
// //             </motion.div>
// //             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
// //               Featured{' '}
// //               <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                 Projects
// //               </span>
// //             </h2>
// //             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
// //               A showcase of my recent work combining AI, web development, and innovative solutions that make a real impact
// //             </p>
// //           </motion.div>

// //           {/* Projects Horizontal Scroll Container */}
// //           <motion.div variants={itemVariants} className="relative">
// //             {/* Scroll Controls */}
// //             <div className="flex justify-between items-center mb-8">
// //               <div className="flex gap-2">
// //                 <motion.button
// //                   onClick={() => scroll('left')}
// //                   disabled={!canScrollLeft}
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   className={`p-3 rounded-full transition-all duration-300 ${
// //                     canScrollLeft 
// //                       ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
// //                       : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
// //                   }`}
// //                 >
// //                   <HiChevronLeft className="w-5 h-5" />
// //                 </motion.button>
// //                 <motion.button
// //                   onClick={() => scroll('right')}
// //                   disabled={!canScrollRight}
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   className={`p-3 rounded-full transition-all duration-300 ${
// //                     canScrollRight 
// //                       ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
// //                       : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
// //                   }`}
// //                 >
// //                   <HiChevronRight className="w-5 h-5" />
// //                 </motion.button>
// //               </div>
              
// //               <div className="text-sm text-gray-500 dark:text-gray-400">
// //                 Scroll to see more projects →
// //               </div>
// //             </div>

// //             {/* Horizontal Scrolling Projects */}
// //             <div
// //               ref={scrollRef}
// //               onScroll={handleScroll}
// //               className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
// //               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
// //             >
// //               {projects.map((project, index) => (
// //                 <motion.div
// //                   key={project.id}
// //                   initial={{ opacity: 0, x: 100 }}
// //                   animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
// //                   transition={{ duration: 0.6, delay: index * 0.1 }}
// //                   whileHover={{ y: -10, scale: 1.02 }}
// //                   className="flex-shrink-0 w-80 lg:w-96 group"
// //                 >
// //                   <div className="glass-effect rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
// //                     {/* Project Image */}
// //                     <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-500 to-purple-600">
// //                       <img
// //                         src={project.imageUrl}
// //                         alt={project.title}
// //                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //                       />
// //                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
// //                       {/* Floating Action Buttons */}
// //                       <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                         {project.githubUrl && (
// //                           <motion.a
// //                             href={project.githubUrl}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             whileHover={{ scale: 1.2 }}
// //                             whileTap={{ scale: 0.9 }}
// //                             className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
// //                           >
// //                             <HiCode className="w-4 h-4" />
// //                           </motion.a>
// //                         )}
// //                         {project.liveUrl && (
// //                           <motion.a
// //                             href={project.liveUrl}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             whileHover={{ scale: 1.2 }}
// //                             whileTap={{ scale: 0.9 }}
// //                             className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
// //                           >
// //                             <HiExternalLink className="w-4 h-4" />
// //                           </motion.a>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Project Content */}
// //                     <div className="p-8 space-y-4">
// //                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
// //                         {project.title}
// //                       </h3>
                      
// //                       <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
// //                         {project.description}
// //                       </p>

// //                       {/* Tech Stack */}
// //                       <div className="flex flex-wrap gap-2 pt-2">
// //                         {project.technologies.map((tech) => (
// //                           <motion.span
// //                             key={tech}
// //                             whileHover={{ scale: 1.1 }}
// //                             className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50"
// //                           >
// //                             {tech}
// //                           </motion.span>
// //                         ))}
// //                       </div>

// //                       {/* Action Buttons */}
// //                       <div className="flex gap-3 pt-4">
// //                         {project.githubUrl && (
// //                           <motion.a
// //                             href={project.githubUrl}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
// //                           >
// //                             <HiCode className="w-4 h-4" />
// //                             Code
// //                           </motion.a>
// //                         )}
                        
// //                         {project.liveUrl && (
// //                           <motion.a
// //                             href={project.liveUrl}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
// //                           >
// //                             <HiExternalLink className="w-4 h-4" />
// //                             Live Demo
// //                           </motion.a>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </motion.div>

// //           {/* View More Projects CTA */}
// //           <motion.div
// //             variants={itemVariants}
// //             className="text-center mt-16"
// //           >
// //             <motion.a
// //               href="https://github.com/msamir-17"
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               whileHover={{ scale: 1.05, y: -2 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
// //             >
// //               <span>View More Projects on GitHub</span>
// //               <HiExternalLink className="w-5 h-5" />
// //             </motion.a>
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </section>
// //   )
// // }

// // export default Projects


// 'use client'

// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useInView } from 'react-intersection-observer';
// import { useState, useEffect } from 'react';
// import { HiExternalLink, HiCode } from 'react-icons/hi';
// import { Project as ProjectTypeFromTypes } from '@/types'; // Type ko naya naam diya

// // Naya Type jo backend se match karta hai
// interface DynamicProject extends Omit<ProjectTypeFromTypes, 'id'> {
//   _id: string; 
// }

// const Projects = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   });

//   const [projects, setProjects] = useState<DynamicProject[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:5000/api/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error("Failed to fetch projects from API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   };

//   if (loading) {
//     return (
//       <section id="projects" className="section-padding text-center">
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Loading Projects...</h2>
//       </section>
//     );
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

//           {/* Yeh aapka grid layout hai, jismein koi badlaav nahi hai */}
//           <motion.div 
//             variants={containerVariants}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {projects.map((project, index) => (
//               <motion.div
//                 key={project._id} // 'id' ki jagah '_id'
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

import { motion } from 'framer-motion';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { HiExternalLink, HiCode, HiSparkles } from 'react-icons/hi';
import { Project as ProjectTypeFromTypes } from '@/types';

// Backend logic remains unchanged
interface DynamicProject extends Omit<ProjectTypeFromTypes, 'id'> {
  _id: string; 
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Backend logic unchanged
  const [projects, setProjects] = useState<DynamicProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects from API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  if (loading) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          {/* Geometric loading animation */}
          <div className="relative mb-8">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full mx-auto"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Loading Projects...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background geometric elements - inspired by hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/6 w-32 h-32 border border-blue-200/30 dark:border-blue-500/20 rounded-2xl"
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute top-2/3 right-1/6 w-24 h-24 border border-purple-200/40 dark:border-purple-500/30 rounded-full"
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg"
          animate={{ 
            rotate: [0, 180, 360],
            x: [-10, 10, -10]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header section with hero-style design */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            {/* Badge similar to hero */}
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <HiSparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Featured Work
              </span>
            </motion.div>

            {/* Title with hero-style typography */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              <span className="text-gray-900 dark:text-gray-100">Featured </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work combining AI, web development, and innovative solutions
            </p>

            {/* Decorative line */}
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Projects grid with enhanced cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
              >
                {/* Card container with hero-style design */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500">
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image section with geometric overlay */}
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    <motion.img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Geometric overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/50"
                        >
                          <HiCode className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </motion.a>
                      )}
                      
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-blue-500/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl"
                        >
                          <HiExternalLink className="w-4 h-4 text-white" />
                        </motion.a>
                      )}
                    </div>

                    {/* Project index badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="relative p-6 lg:p-8">
                    <motion.h3 
                      className="text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                      layoutId={`title-${project._id}`}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies with better styling */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.1 }}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-600">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons with hero-style design */}
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md"
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
                          className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <HiExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Geometric accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-b-3xl"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-400/50"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom styles for line clamping and scrollbars */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default Projects