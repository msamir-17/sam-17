
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCalendar, HiBriefcase } from 'react-icons/hi'
import { HiCheckBadge } from 'react-icons/hi2'
import { Variants, Easing } from "framer-motion";
import { useState, useEffect } from 'react';
import axios from 'axios'


// hey cloude nice kaam kya  ab is ss me dekho view certificate ka btn mujhe us div me apne certificate ka thumpnail dikhana h  agar uspe user click krega toh ek modal open hoga usme full certificate dikhayi dega or  modal cancel ka X btn rahega  View Certificate yaha pe  update only internship section certificate fully responsive dont touch backend ohk


// Backend se match karne ke liye naya Internship type
interface DynamicInternship {
  _id: string;
  role: string;
  company: string;
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


  
  const ease: Easing = [0.42, 0, 0.58, 1]; // cubic-bezier equivalent of easeInOut

  const sectionHeaderVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: ease } // ✅ type-safe
    }
  };

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

  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // useState ke neeche yeh code add karein

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Promise.all ka istemaal karke dono requests ek saath bhejein
        const [internshipsRes, certificationsRes] = await Promise.all([
          // axios.get('http://localhost:5000/api/internships'),
          // axios.get('http://localhost:5000/api/certificates')
           await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/internships`),
           await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`)
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
  hidden: { opacity: 0, x: -100, scale: 0.8 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" as any } 
  }
}

const rightToLeftVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.8 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" as any } 
  }
}


  // const sectionHeaderVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: -50
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: "easeOut"
  //     }
  //   }
  // }
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
            <div className="space-y-12 max-h-[90vh] overflow-y-auto pr-4 custom-scrollbar ">
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
                              {internship.company}
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
                      onClick={() => internship.certificateUrl && setSelectedCertificate(internship.certificateUrl)}

                      className={`w-120 h-64 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center ${internship.certificateUrl ? 'cursor-pointer' : ''}`}
                    // className="w-120 h-64 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center"
                    >
                      <div className="w-108 h-50 bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-2xl">
                        <span className="text-4xl font-bold text-white">
                          {internship.certificateUrl && (
                            <img
                              src={internship.certificateUrl}
                              alt={`${internship.company} certificate`}
                              className="w-108 h-50  object-cover"
                            />
                          )}
                        </span>
                      </div>
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
                  onClick={() => cert.certificateLink && setSelectedCertificate(cert.certificateLink)}
                  className="glass-effect p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      className="flex-shrink-0 relative mx-auto w-fit"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >

                      <div className="w-80 h-40 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto overflow-hidden">
                        {cert.certificateLink ? (
                          // Agar certificate ka link hai, toh thumbnail dikhao
                          <img
                            src={cert.certificateLink}
                            alt={`${cert.title} Certificate`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          // Agar link nahi hai, toh ek placeholder dikhao
                          <div className="flex flex-col items-center text-white">
                            <HiCheckBadge className="w-12 h-12" />
                            <span className="mt-2 font-semibold">Certificate</span>
                          </div>
                        )}
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
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)} // Bahar click karne par modal band ho
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Image par click karne se modal band na ho
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate Image */}
            <img
              src={selectedCertificate}
              alt="Certificate Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Internships