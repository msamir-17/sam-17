'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiMongodb, 
  SiHtml5, SiCss, SiTailwindcss, SiTensorflow, SiPandas,
  SiFastapi, SiDjango, SiNodedotjs, SiPytorch, SiScikitlearn,
  SiNumpy, SiJupyter, SiPlotly
} from 'react-icons/si'
import { FaBrain, FaRobot, FaChartLine, FaChartBar } from 'react-icons/fa'
import { Skill } from '@/types'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const skills: Skill[] = [
    { id: '1', name: 'JavaScript', category: 'frontend', level: 85, icon: 'SiJavascript' },
    { id: '2', name: 'React.js', category: 'frontend', level: 88, icon: 'SiReact' },
    { id: '3', name: 'Next.js', category: 'frontend', level: 85, icon: 'SiNextdotjs' },
    { id: '4', name: 'HTML', category: 'frontend', level: 95, icon: 'SiHtml5' },
    { id: '5', name: 'CSS', category: 'frontend', level: 90, icon: 'SiCss' },
    { id: '6', name: 'Tailwind CSS', category: 'frontend', level: 88, icon: 'SiTailwindcss' },
    { id: '7', name: 'Python', category: 'backend', level: 90, icon: 'SiPython' },
    { id: '8', name: 'Node.js', category: 'backend', level: 80, icon: 'SiNodedotjs' },
    { id: '9', name: 'FastAPI', category: 'backend', level: 75, icon: 'SiFastapi' },
    { id: '10', name: 'Django', category: 'backend', level: 70, icon: 'SiDjango' },
    { id: '11', name: 'MongoDB', category: 'backend', level: 80, icon: 'SiMongodb' },
    { id: '12', name: 'Machine Learning', category: 'ai', level: 85, icon: 'FaBrain' },
    { id: '13', name: 'Deep Learning', category: 'ai', level: 80, icon: 'SiTensorflow' },
    { id: '14', name: 'AI Agents', category: 'ai', level: 82, icon: 'FaRobot' },
    { id: '15', name: 'PyTorch', category: 'ai', level: 82, icon: 'SiPytorch' },
    { id: '16', name: 'TensorFlow', category: 'ai', level: 80, icon: 'SiTensorflow' },
    { id: '17', name: 'Scikit-learn', category: 'ai', level: 85, icon: 'SiScikitlearn' },
    { id: '18', name: 'Pandas', category: 'ai', level: 85, icon: 'SiPandas' },
    { id: '19', name: 'NumPy', category: 'ai', level: 88, icon: 'SiNumpy' },
    { id: '20', name: 'Matplotlib', category: 'ai', level: 80, icon: 'FaChartLine' },
    { id: '21', name: 'Seaborn', category: 'ai', level: 78, icon: 'FaChartBar' },
    { id: '22', name: 'Plotly', category: 'ai', level: 75, icon: 'SiPlotly' },
    { id: '23', name: 'Data Viz', category: 'ai', level: 82, icon: 'FaChartLine' },
    { id: '24', name: 'Jupyter', category: 'ai', level: 90, icon: 'SiJupyter' },
  ]

  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8" }
    switch (iconName) {
      case 'SiPython': return <SiPython {...iconProps} style={{ color: '#3776ab' }} />
      case 'SiJavascript': return <SiJavascript {...iconProps} style={{ color: '#f7df1e' }} />
      case 'SiReact': return <SiReact {...iconProps} style={{ color: '#61dafb' }} />
      case 'SiNextdotjs': return <SiNextdotjs {...iconProps} className="w-8 h-8 text-black dark:text-white" />
      case 'SiMongodb': return <SiMongodb {...iconProps} style={{ color: '#47a248' }} />
      case 'SiHtml5': return <SiHtml5 {...iconProps} style={{ color: '#e34f26' }} />
      case 'SiCss3': return <SiCss {...iconProps} style={{ color: '#1572b6' }} />
      case 'SiTailwindcss': return <SiTailwindcss {...iconProps} style={{ color: '#06b6d4' }} />
      case 'FaBrain': return <FaBrain {...iconProps} style={{ color: '#8b5cf6' }} />
      case 'SiTensorflow': return <SiTensorflow {...iconProps} style={{ color: '#ff6f00' }} />
      case 'FaRobot': return <FaRobot {...iconProps} style={{ color: '#6366f1' }} />
      case 'SiPandas': return <SiPandas {...iconProps} style={{ color: '#150458' }} />
      case 'SiNodedotjs': return <SiNodedotjs {...iconProps} style={{ color: '#339933' }} />
      case 'SiFastapi': return <SiFastapi {...iconProps} style={{ color: '#009688' }} />
      case 'SiDjango': return <SiDjango {...iconProps} style={{ color: '#092e20' }} />
      case 'SiPytorch': return <SiPytorch {...iconProps} style={{ color: '#ee4c2c' }} />
      case 'SiScikitlearn': return <SiScikitlearn {...iconProps} style={{ color: '#f7931e' }} />
      case 'SiNumpy': return <SiNumpy {...iconProps} style={{ color: '#013243' }} />
      case 'SiJupyter': return <SiJupyter {...iconProps} style={{ color: '#f37626' }} />
      case 'FaChartLine': return <FaChartLine {...iconProps} style={{ color: '#10b981' }} />
      case 'FaChartBar': return <FaChartBar {...iconProps} style={{ color: '#3b82f6' }} />
      case 'SiPlotly': return <SiPlotly {...iconProps} style={{ color: '#3f4f75' }} />
      default: return <div className="w-8 h-8 bg-gray-400 rounded" />
    }
  }

  const categories = [
    { name: 'Frontend', color: 'from-blue-500 to-cyan-500', skills: skills.filter(s => s.category === 'frontend') },
    { name: 'Backend', color: 'from-green-500 to-emerald-500', skills: skills.filter(s => s.category === 'backend') },
    { name: 'AI/ML & Data Science', color: 'from-purple-500 to-pink-500', skills: skills.filter(s => s.category === 'ai') },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section id="skills" className="section-spacing bg-gray-50/50 dark:bg-gray-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="section-badge">
              🚀 Skills & Technologies
            </span>
            <h2 className="section-title">
              My Technical{' '}
              <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="section-subtitle">
              A comprehensive toolkit of technologies I use to build intelligent solutions
            </p>
          </motion.div>

          {/* Categories */}
          <div className="space-y-14">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center justify-center">
                  <div className={`px-6 py-2.5 bg-gradient-to-r ${category.color} rounded-full shadow-md`}>
                    <h3 className="text-lg font-bold text-white">{category.name}</h3>
                  </div>
                </div>

                {/* Skills Grid */}
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                      }}
                      className="group relative bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700/60 flex flex-col items-center justify-center text-center gap-3 cursor-default"
                    >
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl group-hover:scale-105 transition-transform duration-300">
                        {getIcon(skill.icon || '')}
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {skill.name}
                      </h4>
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg cursor-default">
              <span>Always learning, always growing</span>
              <span>⚡</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
