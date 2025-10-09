'use client'

import { motion ,Variants  } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiMongodb, 
  SiHtml5, SiCss3, SiTailwindcss, SiTensorflow, SiPandas,
  SiFastapi, SiDjango, SiNodedotjs
} from 'react-icons/si'
import { FaBrain, FaRobot } from 'react-icons/fa'
import { Skill } from '@/types'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skills: Skill[] = [
    { id: '1', name: 'Python', category: 'backend', level: 90, icon: 'SiPython' },
    { id: '2', name: 'JavaScript', category: 'frontend', level: 85, icon: 'SiJavascript' },
    { id: '3', name: 'React.js', category: 'frontend', level: 88, icon: 'SiReact' },
    { id: '4', name: 'Next.js', category: 'frontend', level: 85, icon: 'SiNextdotjs' },
    { id: '5', name: 'MongoDB', category: 'backend', level: 80, icon: 'SiMongodb' },
    { id: '6', name: 'HTML', category: 'frontend', level: 95, icon: 'SiHtml5' },
    { id: '7', name: 'CSS', category: 'frontend', level: 90, icon: 'SiCss3' },
    { id: '8', name: 'Tailwind CSS', category: 'frontend', level: 88, icon: 'SiTailwindcss' },
    { id: '9', name: 'Machine Learning', category: 'ai', level: 85, icon: 'FaBrain' },
    { id: '10', name: 'Deep Learning', category: 'ai', level: 80, icon: 'SiTensorflow' },
    { id: '11', name: 'AI', category: 'ai', level: 82, icon: 'FaRobot' },
    { id: '12', name: 'Pandas', category: 'ai', level: 85, icon: 'SiPandas' },
    { id: '13', name: 'Node.js', category: 'backend', level: 80, icon: 'SiNodedotjs' },
    { id: '14', name: 'FastAPI', category: 'backend', level: 75, icon: 'SiFastapi' },
    { id: '15', name: 'Django', category: 'backend', level: 70, icon: 'SiDjango' },
  ]

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-7 h-7" }
    switch (iconName) {
      case 'SiPython': return <SiPython {...iconProps} style={{ color: '#3776ab' }} />
      case 'SiJavascript': return <SiJavascript {...iconProps} style={{ color: '#f7df1e' }} />
      case 'SiReact': return <SiReact {...iconProps} style={{ color: '#61dafb' }} />
      case 'SiNextdotjs': return <SiNextdotjs {...iconProps} className="w-7 h-7 text-black dark:text-white" />
      case 'SiMongodb': return <SiMongodb {...iconProps} style={{ color: '#47a248' }} />
      case 'SiHtml5': return <SiHtml5 {...iconProps} style={{ color: '#e34f26' }} />
      case 'SiCss3': return <SiCss3 {...iconProps} style={{ color: '#1572b6' }} />
      case 'SiTailwindcss': return <SiTailwindcss {...iconProps} style={{ color: '#06b6d4' }} />
      case 'FaBrain': return <FaBrain {...iconProps} style={{ color: '#8b5cf6' }} />
      case 'SiTensorflow': return <SiTensorflow {...iconProps} style={{ color: '#ff6f00' }} />
      case 'FaRobot': return <FaRobot {...iconProps} style={{ color: '#6366f1' }} />
      case 'SiPandas': return <SiPandas {...iconProps} style={{ color: '#150458' }} />
      case 'SiNodedotjs': return <SiNodedotjs {...iconProps} style={{ color: '#339933' }} />
      case 'SiFastapi': return <SiFastapi {...iconProps} style={{ color: '#009688' }} />
      case 'SiDjango': return <SiDjango {...iconProps} style={{ color: '#092e20' }} />
      default: return <div className="w-7 h-7 bg-gray-400 rounded" />
    }
  }

  const categories = [
    { name: 'Frontend', color: 'from-blue-500 to-cyan-500', skills: skills.filter(s => s.category === 'frontend') },
    { name: 'Backend', color: 'from-green-500 to-emerald-500', skills: skills.filter(s => s.category === 'backend') },
    { name: 'AI/ML', color: 'from-purple-500 to-pink-500', skills: skills.filter(s => s.category === 'ai') },
  ]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

  return (
    <section id="skills" className="section-spacing notion-bg">
      <div className="section-container">
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
                🚀 Skills & Technologies
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              My Technical{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Arsenal
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit of cutting-edge technologies I use to build intelligent solutions and exceptional digital experiences
            </p>
          </motion.div>

          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center justify-center mb-8">
                  <div className={`px-8 py-3 bg-gradient-to-r ${category.color} rounded-full shadow-lg`}>
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>

                {/* Skills Grid */}
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        rotateY: 5
                      }}
                      className="group glass-effect p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div 
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {getIcon(skill.icon || '')}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {category.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Proficiency</span>
                          <span className="text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.2 + index * 0.1,
                              ease: "easeOut"
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/30"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: categoryIndex * 0.2 + index * 0.1 + 1.5 
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Always learning, always growing</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills














