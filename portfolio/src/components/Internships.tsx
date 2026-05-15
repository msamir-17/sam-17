'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCalendar, HiX } from 'react-icons/hi'
import { HiCheckBadge } from 'react-icons/hi2'
import { useState, useEffect } from 'react';
import axios from 'axios'

interface DynamicInternship {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  certificateUrl?: string;
}

interface DynamicCertificate {
  _id: string;
  title: string;
  issuedBy: string;
  dateEarned: string;
  certificateLink: string;
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

  const [internships, setInternships] = useState<DynamicInternship[]>([]);
  const [certifications, setCertifications] = useState<DynamicCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [internshipsRes, certificationsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/internships`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`)
        ]);
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
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  // Loading skeleton
  const InternshipSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/60">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="h-6 w-3/4 skeleton rounded" />
          <div className="h-5 w-1/2 skeleton rounded" />
          <div className="h-4 w-1/3 skeleton rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-5/6 skeleton rounded" />
          </div>
        </div>
        <div className="lg:w-80 h-48 skeleton rounded-xl" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="internships" className="section-spacing bg-gray-50/50 dark:bg-gray-900/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-badge">💼 Loading...</span>
            <h2 className="section-title">My <span className="gradient-text">Internships</span></h2>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => <InternshipSkeleton key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Internships Section */}
      <section id="internships" className="section-spacing bg-gray-50/50 dark:bg-gray-900/50">
        <div className="section-container">
          <motion.div
            ref={internshipsRef}
            initial="hidden"
            animate={internshipsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="section-badge">💼 Professional Experience</span>
              <h2 className="section-title">
                My <span className="gradient-text">Internships</span>
              </h2>
              <p className="section-subtitle">
                Hands-on professional experience that shaped my skills in AI, ML, and full-stack development
              </p>
            </motion.div>

            {/* Internships List */}
            <div className="space-y-8">
              {internships.map((internship, index) => (
                <motion.div
                  key={internship._id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/60 overflow-hidden"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8 space-y-4">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {internship.role}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                          {internship.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <HiCalendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{internship.duration}</span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {internship.description}
                      </p>

                      {internship.certificateUrl && (
                        <button
                          onClick={() => setSelectedCertificate(internship.certificateUrl!)}
                          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors text-sm"
                        >
                          <HiExternalLink className="w-4 h-4" />
                          View Certificate
                        </button>
                      )}
                    </div>

                    {/* Certificate Thumbnail */}
                    {internship.certificateUrl && (
                      <div className="lg:w-80 flex-shrink-0 p-4 lg:p-6">
                        <div
                          onClick={() => setSelectedCertificate(internship.certificateUrl!)}
                          className="w-full h-48 lg:h-full rounded-xl overflow-hidden cursor-pointer group bg-gray-100 dark:bg-gray-700"
                        >
                          <img
                            src={internship.certificateUrl}
                            alt={`${internship.company} certificate`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-spacing bg-white dark:bg-gray-950">
        <div className="section-container">
          <motion.div
            ref={certificationsRef}
            initial="hidden"
            animate={certificationsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">
                🏆 Validated Skills
              </span>
              <h2 className="section-title">
                My <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Certifications</span>
              </h2>
              <p className="section-subtitle">
                Professional certifications that validate my expertise and commitment to continuous learning
              </p>
            </motion.div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <motion.div
                  key={cert._id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => cert.certificateLink && setSelectedCertificate(cert.certificateLink)}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/60 group cursor-pointer"
                >
                  <div className="text-center space-y-4">
                    {/* Certificate Thumbnail */}
                    <div className="w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/10 to-green-500/10">
                      {cert.certificateLink ? (
                        <img
                          src={cert.certificateLink}
                          alt={`${cert.title} Certificate`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <HiCheckBadge className="w-12 h-12" />
                          <span className="mt-2 font-semibold text-sm">Certificate</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                        {cert.issuedBy}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Earned in {cert.dateEarned}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Always Learning Card */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/30"
              >
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Always Learning
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  More certifications coming soon!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <HiX className="w-5 h-5" />
            </button>
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