'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiExternalLink, HiCalendar, HiX, HiLocationMarker, HiCode } from 'react-icons/hi'
import { HiCheckBadge } from 'react-icons/hi2'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  SiTensorflow, SiPytorch, SiPython, SiScikitlearn, SiTailwindcss, SiNextdotjs, SiReact, 
  SiTypescript, SiJavascript, SiMongodb, SiNodedotjs, SiCplusplus, SiC, SiHtml5, SiCss
} from 'react-icons/si'

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

// Map technology names to Simple Icons and Tailwind text colors
const techIcons: Record<string, { icon: any, color: string }> = {
  'TensorFlow': { icon: SiTensorflow, color: 'text-orange-500' },
  'PyTorch': { icon: SiPytorch, color: 'text-red-500' },
  'Python': { icon: SiPython, color: 'text-blue-500' },
  'Scikit-Learn': { icon: SiScikitlearn, color: 'text-orange-400' },
  'React': { icon: SiReact, color: 'text-sky-400' },
  'Next.js': { icon: SiNextdotjs, color: 'text-black dark:text-white' },
  'Tailwind CSS': { icon: SiTailwindcss, color: 'text-cyan-400' },
  'TypeScript': { icon: SiTypescript, color: 'text-blue-600' },
  'JavaScript': { icon: SiJavascript, color: 'text-yellow-500' },
  'MongoDB': { icon: SiMongodb, color: 'text-green-500' },
  'Node.js': { icon: SiNodedotjs, color: 'text-green-600' },
  'C++': { icon: SiCplusplus, color: 'text-blue-700' },
  'C': { icon: SiC, color: 'text-blue-800' },
  'HTML5': { icon: SiHtml5, color: 'text-orange-600' },
  'CSS3': { icon: SiCss, color: 'text-blue-500' },
};

// Dynamically assign appropriate technologies based on certificate titles
const getCertSkills = (title: string): string[] => {
  const t = title.toLowerCase();
  if (t.includes('deep learning')) {
    return ['Python', 'TensorFlow', 'PyTorch'];
  }
  if (t.includes('machine learning')) {
    return ['Python', 'Scikit-Learn'];
  }
  if (t.includes('frontend') || t.includes('web development') || t.includes('react')) {
    return ['React', 'Tailwind CSS', 'JavaScript'];
  }
  if (t.includes('node') || t.includes('backend')) {
    return ['Node.js', 'MongoDB', 'JavaScript'];
  }
  if (t.includes('python')) {
    return ['Python'];
  }
  if (t.includes('c++') || t.includes('programming in c')) {
    return ['C++', 'C'];
  }
  return ['HTML5', 'CSS3', 'JavaScript'];
};

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  // Location mapping based on company
  const getCompanyLocation = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('trex')) return 'Mumbai, India';
    if (c.includes('livetechwire')) return 'Nagpur, Maharashtra, India';
    if (c.includes('ybi')) return 'New Delhi, India (Remote)';
    return 'Remote';
  };

  // Smart parser to convert plain text description into achievements bullets
  const parseDescription = (desc: string) => {
    if (!desc) return [];
    
    // Check if it already has newlines
    if (desc.includes('\n')) {
      return desc.split('\n')
        .map(s => s.trim().replace(/^[-*•\s\u2713]+/, ''))
        .filter(Boolean)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1));
    }
    
    // Split by ' and ' or punctuation sentences
    let parts: string[] = [];
    if (!desc.includes('.') && desc.toLowerCase().includes(' and ')) {
      parts = desc.split(/\s+and\s+/i);
    } else {
      parts = desc.split(/(?<=[.!?])\s+/);
    }
    
    return parts
      .map(s => s.trim().replace(/^[-*•\s\u2713]+/, ''))
      .filter(Boolean)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1));
  };

  // Generates clean initials badges for company tabs
  const getCompanyLogo = (company: string) => {
    const char = company.trim().charAt(0).toUpperCase();
    const colors = [
      'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
      'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    ];
    const hash = company.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const colorClass = colors[hash % colors.length];
    
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${colorClass}`}>
        {char}
      </div>
    );
  };

  // Loading skeleton
  const InternshipSkeleton = () => (
    <div className="bg-white dark:bg-[var(--color-bg-tertiary)] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-[var(--color-border)]">
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
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="internships" className="py-12 md:py-16 lg:py-20 bg-gray-50/50 dark:bg-gradient-to-b dark:from-[#14182D] dark:via-[#0C1323] dark:to-[#0C1323]">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="section-title">Work Experience</h2>
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
      {/* Internships / Experience Section */}
      <section id="internships" className="py-12 md:py-16 lg:py-20 bg-gray-50/50 dark:bg-gradient-to-b dark:from-[#14182D] dark:via-[#0C1323] dark:to-[#0C1323]">
        <div className="section-container">
          <motion.div
            ref={internshipsRef}
            initial="hidden"
            animate={internshipsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="section-title">
                Work <span className="gradient-text">Experience</span>
              </h2>
              <p className="section-subtitle">
                My professional journey and hands-on experience across software development, AI, and machine learning.
              </p>
            </motion.div>

            {/* Timeline tab structure */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start max-w-4xl mx-auto mt-4">
              {/* Left Side: Navigation Tabs */}
              <div className="w-full md:w-56 shrink-0 flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2.5 md:pb-0 gap-1.5 border-b md:border-b-0 md:border-l border-gray-200 dark:border-[var(--color-border)] scrollbar-none relative">
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-[var(--color-border)]" />
                
                {internships.map((internship, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={internship._id}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center gap-3 px-3.5 py-2 text-left font-semibold text-sm rounded-xl transition-all duration-200 whitespace-nowrap md:whitespace-normal relative z-10 w-full ${
                        isActive
                          ? 'bg-white dark:bg-[var(--color-bg-tertiary)] shadow-sm border border-gray-150 dark:border-[var(--color-border)] text-blue-600 dark:text-blue-400 md:border-l-2 md:border-l-blue-600 md:rounded-l-none'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-[var(--color-surface-hover)] border border-transparent'
                      }`}
                    >
                      {getCompanyLogo(internship.company)}
                      <span className="truncate">{internship.company}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Right Side: Active content */}
              <div className="flex-1 min-w-0 bg-white dark:bg-[var(--color-bg-tertiary)] p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-[var(--color-border)]">
                {internships[activeIndex] && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {internships[activeIndex].role}{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          @ {internships[activeIndex].company}
                        </span>
                      </h3>
                      
                      <div className="flex items-center gap-2 mt-1.5 text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">
                        <HiCalendar className="w-4 h-4 text-gray-400" />
                        <span>{internships[activeIndex].duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-0.5 text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">
                        <HiLocationMarker className="w-4 h-4 text-gray-400" />
                        <span>{getCompanyLocation(internships[activeIndex].company)}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {parseDescription(internships[activeIndex].description).map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                          <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 mt-1">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {internships[activeIndex].certificateUrl && (
                      <div className="pt-1.5">
                        <button
                          onClick={() => setSelectedCertificate(internships[activeIndex].certificateUrl!)}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white font-semibold transition-all duration-200 text-xs rounded-xl active:scale-[0.98]"
                        >
                          <HiExternalLink className="w-3.5 h-3.5" />
                          View Certificate
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gradient-to-b dark:from-[#0C1323] dark:via-[#14182D] dark:to-[#14182D]">
        <div className="section-container">
          <motion.div
            ref={certificationsRef}
            initial="hidden"
            animate={certificationsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="section-title">Certifications</h2>
              <p className="section-subtitle">
                Professional certifications validating my expertise and commitment to continuous learning
              </p>
            </motion.div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <motion.div
                  key={cert._id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => cert.certificateLink && setSelectedCertificate(cert.certificateLink)}
                  className="bg-white dark:bg-[var(--color-bg-tertiary)] p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-[var(--color-border)] hover:border-emerald-500 dark:hover:border-emerald-400/60 group cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Certificate Thumbnail */}
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-transparent relative flex items-center justify-center">
                      {cert.certificateLink ? (
                        <img
                          src={cert.certificateLink}
                          alt={`${cert.title} Certificate`}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <HiCheckBadge className="w-12 h-12" />
                          <span className="mt-2 font-semibold text-sm">Certificate</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-left">
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
            className="relative bg-white dark:bg-[var(--color-bg-tertiary)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-100 dark:border-[var(--color-border)]"
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