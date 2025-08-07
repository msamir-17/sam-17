'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiMongodb, 
  SiHtml5, SiCss3, SiTailwindcss, SiTensorflow, SiPandas,
  SiFastapi, SiDjango
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
    { id: '13', name: 'NumPy', category: 'ai', level: 80, icon: 'SiPandas' },
    { id: '14', name: 'FastAPI', category: 'backend', level: 75, icon: 'SiFastapi' },
    { id: '15', name: 'Django', category: 'backend', level: 70, icon: 'SiDjango' },
  ]

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8" }
    switch (iconName) {
      case 'SiPython': return <SiPython {...iconProps} className="w-8 h-8 text-blue-500" />
      case 'SiJavascript': return <SiJavascript {...iconProps} className="w-8 h-8 text-yellow-500" />
      case 'SiReact': return <SiReact {...iconProps} className="w-8 h-8 text-cyan-400" />
      case 'SiNextdotjs': return <SiNextdotjs {...iconProps} className="w-8 h-8 text-black dark:text-white" />
      case 'SiMongodb': return <SiMongodb {...iconProps} className="w-8 h-8 text-green-500" />
      case 'SiHtml5': return <SiHtml5 {...iconProps} className="w-8 h-8 text-orange-500" />
      case 'SiCss3': return <SiCss3 {...iconProps} className="w-8 h-8 text-blue-600" />
      case 'SiTailwindcss': return <SiTailwindcss {...iconProps} className="w-8 h-8 text-teal-500" />
      case 'FaBrain': return <FaBrain {...iconProps} className="w-8 h-8 text-purple-500" />
      case 'SiTensorflow': return <SiTensorflow {...iconProps} className="w-8 h-8 text-orange-600" />
      case 'FaRobot': return <FaRobot {...iconProps} className="w-8 h-8 text-indigo-500" />
      case 'SiPandas': return <SiPandas {...iconProps} className="w-8 h-8 text-blue-600" />
      case 'SiFastapi': return <SiFastapi {...iconProps} className="w-8 h-8 text-teal-600" />
      case 'SiDjango': return <SiDjango {...iconProps} className="w-8 h-8 text-green-600" />
      default: return <div className="w-8 h-8 bg-gray-400 rounded" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'border-l-blue-500'
      case 'backend': return 'border-l-green-500'
      case 'ai': return 'border-l-purple-500'
      default: return 'border-l-gray-500'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies I use to bring ideas to life
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`card p-6 border-l-4 ${getCategoryColor(skill.category)} hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {getIcon(skill.icon || '')}
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills