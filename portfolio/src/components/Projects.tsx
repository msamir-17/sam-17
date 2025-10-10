'use client'

import { motion ,Variants, Easing  } from 'framer-motion';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { HiExternalLink, HiCode, HiSparkles, HiEye, HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
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
  const [error, setError] = useState<string | null>(null);
  
  // Crawler state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        // const response = await axios.get('http://localhost:5000/api/projects');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects from API:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Auto-advance crawler every 4 seconds
  useEffect(() => {
    if (projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [projects.length]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

const easeCustom: Easing = [0.25, 0.46, 0.45, 0.94]; // cubic-bezier equivalent

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: easeCustom
    }
  }
};
const shimmerVariants: Variants = {
  animate: {
    x: ['-100%', '100%'],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear' as any // linear string ko type-safe karne ke liye
    }
  }
};

  // Loading Skeleton Component
  const ProjectSkeleton = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="relative h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
          variants={shimmerVariants}
          animate="animate"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
                variants={shimmerVariants}
                animate="animate"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="projects" className="section-spacing relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl"
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
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-6"
            >
              <HiSparkles className="w-4 h-4" />
              Loading Projects
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section-spacing relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 overflow-hidden">
        <div className="section-container relative z-10">
          <div className="text-center">
            <div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Projects</h3>
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-spacing relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl"
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
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
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
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <HiSparkles className="w-4 h-4" />
              Featured Work
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse-glow">
                Projects
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work combining AI, web development, and innovative solutions
            </p>
          </motion.div>

          {/* Horizontal Crawler Section */}
          {projects.length > 0 && (
            <motion.div variants={itemVariants} className="mb-20">
              {/* Crawler Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Project Showcase
                  </h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {currentIndex + 1} of {projects.length}
                    </span>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={prevProject}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
                  >
                    <HiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                  
                  <motion.button
                    onClick={nextProject}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
                  >
                    <HiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </div>
              </div>

              {/* Crawler Container */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-2xl">
                {/* Project Display */}
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Project Image */}
                  <div className="relative group order-2 lg:order-1">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                      <img
                        src={projects[currentIndex]?.imageUrl}
                        alt={projects[currentIndex]?.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay with Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                        <div className="flex gap-3">
                          {projects[currentIndex]?.liveUrl && (
                            <motion.a
                              href={projects[currentIndex].liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="p-3 bg-blue-600/90 hover:bg-blue-700/90 backdrop-blur-sm rounded-xl shadow-lg transition-colors"
                            >
                              <HiEye className="w-5 h-5 text-white" />
                            </motion.a>
                          )}
                          {projects[currentIndex]?.githubUrl && (
                            <motion.a
                              href={projects[currentIndex].githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="p-3 bg-gray-800/90 hover:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg transition-colors"
                            >
                              <HiCode className="w-5 h-5 text-white" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-6 order-1 lg:order-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <HiStar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            {projects[currentIndex]?.title}
                          </h4>
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            Featured Project #{currentIndex + 1}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                        {projects[currentIndex]?.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {projects[currentIndex]?.technologies.map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {projects[currentIndex]?.githubUrl && (
                        <motion.a
                          href={projects[currentIndex].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <HiCode className="w-4 h-4" />
                          View Code
                        </motion.a>
                      )}
                      
                      {projects[currentIndex]?.liveUrl && (
                        <motion.a
                          href={projects[currentIndex].liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <HiExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Progress Indicator */}
                <div className="flex justify-center mt-8 gap-2">
                  {projects.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToProject(index)}
                      whileHover={{ scale: 1.2 }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Static Grid for All Projects - COMMENTED OUT */}
          {/* 
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500"
              >
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                      <HiStar className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4 z-20">
                  <div className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <motion.img
                    src={project.imageUrl}
                    alt={`Screenshot of ${project.title} project`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-blue-600/90 hover:bg-blue-700/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 group/btn"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <HiEye className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
                      </motion.a>
                    )}
                    
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-gray-800/90 hover:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 group/btn"
                        aria-label={`View source code of ${project.title}`}
                      >
                        <HiCode className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="p-6 lg:p-8 space-y-4">
                  <div className="space-y-3">
                    <motion.h3 
                      className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                      layoutId={`title-${project._id}`}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm lg:text-base line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700 cursor-default"
                        >
                          +{project.technologies.length - 4}
                        </motion.span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                      >
                        <HiCode className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        View Code
                      </motion.a>
                    )}
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn flex-1 justify-center"
                      >
                        <HiExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.article>
            ))}
          </motion.div>
          */}

          {/* View More Section */}
          {projects.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-center mt-16"
            >
              <motion.a
                href="https://github.com/msamir-17"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>View All Projects on GitHub</span>
                <HiExternalLink className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all" />
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Custom Styles for Better UX */}
      <style jsx global>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse-glow {
          from {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          to {
            text-shadow: 0 0 30px rgba(147, 51, 234, 0.7);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-glow {
            animation: none;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .crawler-container {
            padding: 1rem;
          }
          
          .crawler-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 1024px) {
          .crawler-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Projects

// https://dashboard.render.com/web/srv-d3ggc7qli9vc73f441i0/deploys/dep-d3ggc82li9vc73f441ng 