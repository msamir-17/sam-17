'use client'

import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { HiExternalLink, HiCode, HiX } from 'react-icons/hi';
import { Project as ProjectTypeFromTypes } from '@/types';
import { trackProjectClick, trackLiveLinkClick, trackGithubClick } from '@/hooks/useAnalytics';
import { useData } from '@/context/DataContext';
import { 
  SiTensorflow, SiPytorch, SiPython, SiScikitlearn, SiTailwindcss, SiNextdotjs, SiReact, 
  SiTypescript, SiJavascript, SiMongodb, SiNodedotjs, SiCplusplus, SiC, SiHtml5, SiCss,
  SiNumpy, SiPandas, SiOpenai, SiHuggingface, SiFlask, SiFastapi, SiDjango, SiDocker, 
  SiPostgresql, SiMysql, SiSqlite, SiGit, SiGithub
} from 'react-icons/si';

interface DynamicProject extends Omit<ProjectTypeFromTypes, 'id'> {
  _id: string;
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
  'NumPy': { icon: SiNumpy, color: 'text-blue-700' },
  'Pandas': { icon: SiPandas, color: 'text-indigo-900 dark:text-indigo-400' },
  'OpenAI': { icon: SiOpenai, color: 'text-green-600 dark:text-green-400' },
  'Hugging Face': { icon: SiHuggingface, color: 'text-yellow-500' },
  'Flask': { icon: SiFlask, color: 'text-gray-700 dark:text-gray-300' },
  'FastAPI': { icon: SiFastapi, color: 'text-teal-500' },
  'Django': { icon: SiDjango, color: 'text-green-800 dark:text-green-600' },
  'Docker': { icon: SiDocker, color: 'text-blue-500' },
  'PostgreSQL': { icon: SiPostgresql, color: 'text-blue-600' },
  'MySQL': { icon: SiMysql, color: 'text-blue-800' },
  'SQLite': { icon: SiSqlite, color: 'text-blue-500' },
  'Git': { icon: SiGit, color: 'text-orange-600' },
  'GitHub': { icon: SiGithub, color: 'text-black dark:text-white' },
};

// Normalize technology names to match the techIcons dictionary keys
const getNormalizedTech = (tech: string): string | undefined => {
  const t = tech.toLowerCase().trim().replace(/[\s.-]/g, '');
  const keyMap: Record<string, string> = {
    'react': 'React',
    'nextjs': 'Next.js',
    'next': 'Next.js',
    'tailwindcss': 'Tailwind CSS',
    'tailwind': 'Tailwind CSS',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'mongodb': 'MongoDB',
    'mongo': 'MongoDB',
    'nodejs': 'Node.js',
    'node': 'Node.js',
    'python': 'Python',
    'py': 'Python',
    'tensorflow': 'TensorFlow',
    'tf': 'TensorFlow',
    'pytorch': 'PyTorch',
    'scikitlearn': 'Scikit-Learn',
    'sklearn': 'Scikit-Learn',
    'numpy': 'NumPy',
    'pandas': 'Pandas',
    'openai': 'OpenAI',
    'huggingface': 'Hugging Face',
    'flask': 'Flask',
    'fastapi': 'FastAPI',
    'django': 'Django',
    'docker': 'Docker',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'mysql': 'MySQL',
    'sqlite': 'SQLite',
    'git': 'Git',
    'github': 'GitHub',
    'html5': 'HTML5',
    'html': 'HTML5',
    'css3': 'CSS3',
    'css': 'CSS3',
    'c++': 'C++',
    'cpp': 'C++',
    'c': 'C'
  };
  return keyMap[t];
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { projects, loaded } = useData();
  const loading = !loaded;
  const [selectedProject, setSelectedProject] = useState<DynamicProject | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  // Skeleton loader
  const ProjectSkeleton = () => (
    <div className="bg-white dark:bg-[var(--color-bg-tertiary)] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-[var(--color-border)] flex flex-col h-full">
      <div className="relative aspect-[16/10] w-full skeleton rounded-2xl" />
      <div className="pt-4 flex-grow space-y-3">
        <div className="h-6 w-3/4 skeleton rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-5/6 skeleton rounded" />
        </div>
        <div className="flex-grow" />
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-9 w-9 skeleton rounded-full border-2 border-white dark:border-[var(--color-bg-tertiary)]" />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section id="projects" className="section-spacing bg-white dark:bg-gradient-to-b dark:from-[#0C1323] dark:via-[#14182D] dark:to-[#14182D]">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }



  return (
    <>
      <section id="projects" className="section-spacing bg-white dark:bg-gradient-to-b dark:from-[#0C1323] dark:via-[#14182D] dark:to-[#14182D]">
        <div className="section-container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="section-title">Projects</h2>
              <p className="section-subtitle">
                A showcase of my recent work combining AI, web development, and innovative solutions.
              </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => {
                // Filter technologies to identify ones that have icons
                const techsWithLogos = project.technologies
                  .map(tech => getNormalizedTech(tech))
                  .filter((tech): tech is string => !!tech);
                
                // Get unique items
                const uniqueTechsWithLogos = Array.from(new Set(techsWithLogos));
                const displayedTechs = uniqueTechsWithLogos.slice(0, 3);
                
                // Remaining technologies count
                const remainingCount = project.technologies.length - displayedTechs.length;

                return (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group flex flex-col h-full bg-white dark:bg-[var(--color-bg-tertiary)] rounded-3xl p-5 transition-all duration-300 cursor-pointer border border-gray-100 dark:border-[var(--color-border)] hover:border-blue-500/50 dark:hover:border-blue-400/40 shadow-sm hover:shadow-md"
                    onClick={() => {
                      trackProjectClick(project._id, project.title);
                      setSelectedProject(project);
                    }}
                  >
                    {/* Project Image Container (Inset and Rounded) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-950">
                      <img
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Project Info */}
                    <div className="pt-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex-grow" />

                      {/* Tech Stack Badges */}
                      <div className="flex items-center -space-x-2.5 mb-2 isolate">
                        {displayedTechs.map((techName) => {
                          const tech = techIcons[techName] || { icon: HiCode, color: 'text-gray-400' };
                          const Icon = tech.icon;
                          const isHovered = hoveredTech === `${project._id}-${techName}`;

                          return (
                            <div
                              key={techName}
                              onMouseEnter={() => setHoveredTech(`${project._id}-${techName}`)}
                              onMouseLeave={() => setHoveredTech(null)}
                              onClick={(e) => e.stopPropagation()} // Prevent card click
                              className="flex items-center h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-[var(--color-bg-tertiary)] hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 ease-out overflow-hidden px-2 cursor-pointer shadow-sm relative"
                              style={{
                                maxWidth: isHovered ? '200px' : '36px',
                                zIndex: isHovered ? 10 : 1,
                                transitionProperty: 'max-width, background-color, border-color'
                              }}
                            >
                              <div className={`flex-shrink-0 ${tech.color} flex items-center justify-center w-5 h-5`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span
                                className={`text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap transition-all duration-300 ${
                                  isHovered ? 'ml-2 opacity-100' : 'opacity-0 w-0 pointer-events-none'
                                }`}
                              >
                                {techName}
                              </span>
                            </div>
                          );
                        })}

                        {/* Remaining tech count badge */}
                        {remainingCount > 0 && (
                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-[var(--color-bg-tertiary)] text-xs font-bold text-gray-500 dark:text-gray-400 shadow-sm relative z-0">
                            +{remainingCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* View All Projects */}
            <motion.div variants={itemVariants} className="text-center mt-12">
              <motion.a
                href="https://github.com/msamir-17"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>View All Projects on GitHub</span>
                <HiExternalLink className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-[var(--color-bg-tertiary)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-[var(--color-border)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-[var(--color-bg-tertiary)]/95 backdrop-blur-sm z-10 p-4 border-b border-gray-200 dark:border-[var(--color-border)] flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project Details</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[var(--color-surface-hover)] rounded-xl transition-colors"
              >
                <HiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Project Image */}
            <div className="relative h-64">
              <img
                src={selectedProject.imageUrl}
                alt={`Screenshot of ${selectedProject.title}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackGithubClick(selectedProject._id, selectedProject.title)}
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[var(--color-bg-inset)] hover:bg-gray-200 dark:hover:bg-[var(--color-surface-hover)] rounded-xl transition-colors"
                  >
                    <HiCode className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackLiveLinkClick(selectedProject._id, selectedProject.title)}
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Projects;