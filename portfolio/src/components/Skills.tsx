'use client'

import { motion } from 'framer-motion'
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

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
















// 'use client'

// import { motion } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, Float, Text3D, MeshWobbleMaterial, Sphere } from '@react-three/drei'
// import { Suspense, useRef, useState } from 'react'
// import { 
//   SiPython, SiJavascript, SiReact, SiNextdotjs, SiMongodb, 
//   SiHtml5, SiCss3, SiTailwindcss, SiTensorflow, SiPandas,
//   SiFastapi, SiDjango, SiNodedotjs
// } from 'react-icons/si'
// import { FaBrain, FaRobot } from 'react-icons/fa'
// import { Skill } from '@/types'

// // 3D Floating Orb Component
// const FloatingOrb = ({ position, color, scale = 1 }) => {
//   return (
//     <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
//       <Sphere args={[0.5 * scale, 32, 32]} position={position}>
//         <MeshWobbleMaterial
//           color={color}
//           factor={0.6}
//           speed={2}
//           roughness={0.1}
//           metalness={0.8}
//         />
//       </Sphere>
//     </Float>
//   )
// }

// // 3D Scene Background
// const Scene3D = () => {
//   return (
//     <div className="absolute inset-0 opacity-30">
//       <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Suspense fallback={null}>
//           <FloatingOrb position={[-4, 3, 0]} color="#3b82f6" scale={0.8} />
//           <FloatingOrb position={[4, -2, -2]} color="#8b5cf6" scale={1.2} />
//           <FloatingOrb position={[-2, -3, 1]} color="#06b6d4" scale={0.6} />
//           <FloatingOrb position={[3, 2, -1]} color="#10b981" scale={0.9} />
//           <FloatingOrb position={[0, 0, -3]} color="#f59e0b" scale={0.7} />
//         </Suspense>
//         <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
//       </Canvas>
//     </div>
//   )
// }

// // Animated Skill Card with Advanced Effects
// const SkillCard = ({ skill, categoryColor, index }) => {
//   const [isHovered, setIsHovered] = useState(false)
//   const cardRef = useRef(null)

//   const getIcon = (iconName) => {
//     const iconProps = { className: "w-7 h-7" }
//     switch (iconName) {
//       case 'SiPython': return <SiPython {...iconProps} style={{ color: '#3776ab' }} />
//       case 'SiJavascript': return <SiJavascript {...iconProps} style={{ color: '#f7df1e' }} />
//       case 'SiReact': return <SiReact {...iconProps} style={{ color: '#61dafb' }} />
//       case 'SiNextdotjs': return <SiNextdotjs {...iconProps} className="w-7 h-7 text-black dark:text-white" />
//       case 'SiMongodb': return <SiMongodb {...iconProps} style={{ color: '#47a248' }} />
//       case 'SiHtml5': return <SiHtml5 {...iconProps} style={{ color: '#e34f26' }} />
//       case 'SiCss3': return <SiCss3 {...iconProps} style={{ color: '#1572b6' }} />
//       case 'SiTailwindcss': return <SiTailwindcss {...iconProps} style={{ color: '#06b6d4' }} />
//       case 'FaBrain': return <FaBrain {...iconProps} style={{ color: '#8b5cf6' }} />
//       case 'SiTensorflow': return <SiTensorflow {...iconProps} style={{ color: '#ff6f00' }} />
//       case 'FaRobot': return <FaRobot {...iconProps} style={{ color: '#6366f1' }} />
//       case 'SiPandas': return <SiPandas {...iconProps} style={{ color: '#150458' }} />
//       case 'SiNodedotjs': return <SiNodedotjs {...iconProps} style={{ color: '#339933' }} />
//       case 'SiFastapi': return <SiFastapi {...iconProps} style={{ color: '#009688' }} />
//       case 'SiDjango': return <SiDjango {...iconProps} style={{ color: '#092e20' }} />
//       default: return <div className="w-7 h-7 bg-gray-400 rounded" />
//     }
//   }

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50, scale: 0.8 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
//       whileHover={{ 
//         scale: 1.08, 
//         y: -10,
//         rotateY: 10,
//         rotateX: 5,
//         transition: { duration: 0.3 }
//       }}
//       whileTap={{ scale: 0.95 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="group relative overflow-hidden"
//       style={{
//         perspective: "1000px",
//         transformStyle: "preserve-3d"
//       }}
//     >
//       <div className="relative glass-effect p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg bg-white/10 dark:bg-gray-900/10">
//         {/* Animated Background Gradient */}
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}
//           animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
//         />
        
//         {/* Particle Effect */}
//         <div className="absolute inset-0 overflow-hidden rounded-2xl">
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={isHovered ? {
//                 y: [-10, -50, -10],
//                 opacity: [0, 1, 0],
//                 scale: [0, 1.5, 0]
//               } : {}}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 delay: i * 0.2
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 flex items-center gap-4 mb-4">
//           <motion.div 
//             className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-inner"
//             whileHover={{ 
//               rotate: [0, -10, 10, -10, 0],
//               scale: 1.2
//             }}
//             transition={{ duration: 0.6 }}
//             animate={isHovered ? { 
//               boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
//               background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
//             } : {}}
//           >
//             {getIcon(skill.icon || '')}
            
//             {/* Icon Glow Effect */}
//             <motion.div
//               className="absolute inset-0 rounded-xl"
//               animate={isHovered ? {
//                 boxShadow: [
//                   "0 0 0 0 rgba(59, 130, 246, 0.4)",
//                   "0 0 0 10px rgba(59, 130, 246, 0)",
//                   "0 0 0 0 rgba(59, 130, 246, 0)"
//                 ]
//               } : {}}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             />
//           </motion.div>
          
//           <div className="flex-1">
//             <motion.h4 
//               className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
//               animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
//             >
//               {skill.name}
//             </motion.h4>
//             <motion.p 
//               className="text-sm text-gray-500 dark:text-gray-400 capitalize"
//               animate={isHovered ? { x: 5 } : { x: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {skill.category}
//             </motion.p>
//           </div>
//         </div>
        
//         <div className="relative z-10 space-y-3">
//           <div className="flex justify-between items-center text-sm">
//             <motion.span 
//               className="text-gray-600 dark:text-gray-400 font-medium"
//               animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
//             >
//               Proficiency
//             </motion.span>
//             <motion.span 
//               className="text-blue-600 dark:text-blue-400 font-bold text-lg"
//               animate={isHovered ? { 
//                 scale: 1.2,
//                 color: "#8b5cf6"
//               } : { scale: 1 }}
//             >
//               {skill.level}%
//             </motion.span>
//           </div>
          
//           <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
//             <motion.div
//               className={`h-full bg-gradient-to-r ${categoryColor} rounded-full relative overflow-hidden`}
//               initial={{ width: 0, opacity: 0.8 }}
//               animate={{ 
//                 width: `${skill.level}%`, 
//                 opacity: 1 
//               }}
//               transition={{ 
//                 duration: 2, 
//                 delay: index * 0.1,
//                 ease: "easeOut"
//               }}
//             >
//               {/* Animated Shine Effect */}
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
//                 animate={{ x: ['-100%', '200%'] }}
//                 transition={{ 
//                   duration: 2, 
//                   repeat: Infinity, 
//                   repeatDelay: 3,
//                   delay: index * 0.1 + 2
//                 }}
//               />
              
//               {/* Pulsing Effect */}
//               <motion.div
//                 className="absolute inset-0 bg-white/20"
//                 animate={isHovered ? { opacity: [0.2, 0.6, 0.2] } : { opacity: 0.2 }}
//                 transition={{ duration: 1, repeat: Infinity }}
//               />
//             </motion.div>
//           </div>
          
//           {/* Skill Level Indicator Dots */}
//           <div className="flex gap-1 mt-2">
//             {[...Array(5)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className={`w-2 h-2 rounded-full ${
//                   i < Math.floor(skill.level / 20) 
//                     ? 'bg-blue-500' 
//                     : 'bg-gray-300 dark:bg-gray-600'
//                 }`}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: index * 0.1 + i * 0.1 }}
//                 whileHover={{ scale: 1.3 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Corner Accent */}
//         <motion.div
//           className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${categoryColor} opacity-10 rounded-2xl`}
//           animate={isHovered ? { 
//             scale: 1.5,
//             opacity: 0.3,
//             rotate: 45
//           } : { 
//             scale: 1,
//             opacity: 0.1,
//             rotate: 0
//           }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>
//     </motion.div>
//   )
// }

// const Skills = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const skills: Skill[] = [
//     { id: '1', name: 'Python', category: 'backend', level: 90, icon: 'SiPython' },
//     { id: '2', name: 'JavaScript', category: 'frontend', level: 85, icon: 'SiJavascript' },
//     { id: '3', name: 'React.js', category: 'frontend', level: 88, icon: 'SiReact' },
//     { id: '4', name: 'Next.js', category: 'frontend', level: 85, icon: 'SiNextdotjs' },
//     { id: '5', name: 'MongoDB', category: 'backend', level: 80, icon: 'SiMongodb' },
//     { id: '6', name: 'HTML', category: 'frontend', level: 95, icon: 'SiHtml5' },
//     { id: '7', name: 'CSS', category: 'frontend', level: 90, icon: 'SiCss3' },
//     { id: '8', name: 'Tailwind CSS', category: 'frontend', level: 88, icon: 'SiTailwindcss' },
//     { id: '9', name: 'Machine Learning', category: 'ai', level: 85, icon: 'FaBrain' },
//     { id: '10', name: 'Deep Learning', category: 'ai', level: 80, icon: 'SiTensorflow' },
//     { id: '11', name: 'AI', category: 'ai', level: 82, icon: 'FaRobot' },
//     { id: '12', name: 'Pandas', category: 'ai', level: 85, icon: 'SiPandas' },
//     { id: '13', name: 'Node.js', category: 'backend', level: 80, icon: 'SiNodedotjs' },
//     { id: '14', name: 'FastAPI', category: 'backend', level: 75, icon: 'SiFastapi' },
//     { id: '15', name: 'Django', category: 'backend', level: 70, icon: 'SiDjango' },
//   ]

//   const categories = [
//     { name: 'Frontend', color: 'from-blue-500 to-cyan-500', skills: skills.filter(s => s.category === 'frontend') },
//     { name: 'Backend', color: 'from-green-500 to-emerald-500', skills: skills.filter(s => s.category === 'backend') },
//     { name: 'AI/ML', color: 'from-purple-500 to-pink-500', skills: skills.filter(s => s.category === 'ai') },
//   ]

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
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
//     <section id="skills" className="section-spacing notion-bg relative overflow-hidden">
//       {/* 3D Background */}
//       <Scene3D />
      
//       {/* Floating Geometric Shapes */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-4 h-4 bg-blue-400/20 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [-20, 20, -20],
//               x: [-10, 10, -10],
//               rotate: [0, 360],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>

//       <div className="section-container relative z-10">
//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <motion.div 
//               className="inline-block mb-4"
//               whileHover={{ scale: 1.1 }}
//               animate={{ 
//                 boxShadow: [
//                   "0 0 0 0 rgba(59, 130, 246, 0.4)",
//                   "0 0 0 20px rgba(59, 130, 246, 0)",
//                   "0 0 0 0 rgba(59, 130, 246, 0)"
//                 ]
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               <span className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
//                 🚀 Skills & Technologies
//               </span>
//             </motion.div>
            
//             <motion.h2 
//               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
//               animate={{ 
//                 backgroundPosition: ['0%', '100%', '0%']
//               }}
//               transition={{ duration: 5, repeat: Infinity }}
//             >
//               My Technical{' '}
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]">
//                 Arsenal
//               </span>
//             </motion.h2>
            
//             <motion.p 
//               className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
//               variants={itemVariants}
//             >
//               A comprehensive toolkit of cutting-edge technologies I use to build intelligent solutions and exceptional digital experiences
//             </motion.p>
//           </motion.div>

//           <div className="space-y-16">
//             {categories.map((category, categoryIndex) => (
//               <motion.div
//                 key={category.name}
//                 variants={itemVariants}
//                 className="space-y-8"
//               >
//                 {/* Enhanced Category Header */}
//                 <div className="flex items-center justify-center mb-12">
//                   <motion.div 
//                     className={`relative px-10 py-4 bg-gradient-to-r ${category.color} rounded-2xl shadow-2xl`}
//                     whileHover={{ 
//                       scale: 1.05,
//                       boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
//                     }}
//                     animate={{
//                       boxShadow: [
//                         "0 10px 20px rgba(0,0,0,0.1)",
//                         "0 20px 40px rgba(0,0,0,0.15)",
//                         "0 10px 20px rgba(0,0,0,0.1)"
//                       ]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   >
//                     <h3 className="text-2xl font-bold text-white relative z-10">{category.name}</h3>
                    
//                     {/* Animated Background */}
//                     <motion.div
//                       className="absolute inset-0 bg-white/20 rounded-2xl"
//                       animate={{ opacity: [0.1, 0.3, 0.1] }}
//                       transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.5 }}
//                     />
//                   </motion.div>
//                 </div>

//                 {/* Enhanced Skills Grid */}
//                 <motion.div 
//                   variants={containerVariants}
//                   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
//                 >
//                   {category.skills.map((skill, index) => (
//                     <SkillCard
//                       key={skill.id}
//                       skill={skill}
//                       categoryColor={category.color}
//                       index={index}
//                     />
//                   ))}
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Enhanced Bottom CTA */}
//           <motion.div
//             variants={itemVariants}
//             className="text-center mt-20"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
//               animate={{
//                 backgroundPosition: ['0%', '100%', '0%']
//               }}
//               transition={{ duration: 5, repeat: Infinity }}
//               style={{ backgroundSize: '200% auto' }}
//             >
//               <span className="text-lg">Always learning, always growing</span>
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="text-2xl"
//               >
//                 ⚡
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Skills


