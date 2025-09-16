// 'use client'
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { HiDownload, HiMail, HiSparkles } from 'react-icons/hi'

// const Hero = () => {
//   const [currentTitle, setCurrentTitle] = useState(0)
//   const titles = [
//     'AI Enthusiast',
//     'Prompt Engineer', 
//     'Next.js Developer',
//     'Hackathon Builder'
//   ]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTitle(prev => (prev + 1) % titles.length)
//     }, 3000)
//     return () => clearInterval(interval)
//   }, [])

//   const scrollToContact = () => {
//     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const downloadResume = () => {
//     const link = document.createElement('a')
//     link.href = '/samir-r.pdf'
//     link.download = 'Samir_Resume.pdf'
//     link.click()
//   }

//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div 
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl"
//           animate={{ 
//             scale: [1, 1.2, 1],
//             rotate: [0, 180, 360]
//           }}
//           transition={{ 
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//         <motion.div 
//           className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl"
//           animate={{ 
//             scale: [1.2, 1, 1.2],
//             rotate: [360, 180, 0]
//           }}
//           transition={{ 
//             duration: 15,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>

//       <div className="section-container relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Side - Text Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center lg:text-left space-y-6"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400"
//             >
//               <HiSparkles className="w-4 h-4" />
//               Welcome to my portfolio
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
//             >
//               Hi, I'm{' '}
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse-glow">
//                 Samir
//               </span>
//             </motion.h1>

//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300"
//             >
//               AI/ML Engineer & Full Stack Developer
//             </motion.h2>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="h-8 flex items-center justify-center lg:justify-start"
//             >
//               <motion.span
//                 key={currentTitle}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium"
//               >
//                 {titles[currentTitle]}
//               </motion.span>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
//             >
//               Passionate about creating intelligent solutions and beautiful web experiences. 
//               Let's build something amazing together!
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
//             >
//               <motion.button
//                 onClick={downloadResume}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
//               >
//                 <HiDownload className="w-5 h-5 group-hover:animate-bounce" />
//                 Download Resume
//               </motion.button>

//               <motion.button
//                 onClick={scrollToContact}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-3"
//               >
//                 <HiMail className="w-5 h-5 group-hover:animate-pulse" />
//                 Let's Connect
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* Right Side - 3D Avatar */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex justify-center lg:justify-end"
//           >
//             <div className="relative">
//               <motion.div
//                 animate={{ 
//                   y: [-10, 10, -10],
//                   rotateY: [0, 5, 0, -5, 0]
//                 }}
//                 transition={{ 
//                   duration: 6,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="w-80 h-80 lg:w-96 lg:h-96 relative"
//               >
//                 {/* Main Avatar Circle */}
//                 <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
//                   <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
//                     {/* Developer Emoji - Replace with Lottie when available */}
//                     <div className="text-8xl lg:text-9xl">👨‍💻</div>
                    
//                     {/* Floating Code Elements */}
//                     <motion.div 
//                       className="absolute top-4 right-8 text-2xl"
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                     >
//                       ⚛️
//                     </motion.div>
//                     <motion.div 
//                       className="absolute bottom-8 left-4 text-2xl"
//                       animate={{ rotate: -360 }}
//                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                     >
//                       🤖
//                     </motion.div>
//                     <motion.div 
//                       className="absolute top-1/2 left-2 text-xl"
//                       animate={{ y: [-5, 5, -5] }}
//                       transition={{ duration: 3, repeat: Infinity }}
//                     >
//                       ⚡
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Orbiting Elements */}
//                 <motion.div
//                   className="absolute inset-0 pointer-events-none"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                 >
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
//                     JS
//                   </div>
//                   <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-purple-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
//                     AI
//                   </div>
//                   <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
//                     ML
//                   </div>
//                   <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
//                     ⚛️
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="absolute left-1/2 transform translate-y-10 -translate-x-1/2 hidden lg:block"
//         >
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="flex flex-col items-center gap-2 text-gray-400"
//           >
//             <span className="text-sm font-medium">Scroll Down</span>
//             <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
//               <motion.div
//                 animate={{ y: [0, 12, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="w-1 h-3 bg-gray-400 rounded-full mt-2"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Hero

'use client'
// import ClientOnly from './ClientOnly';
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiDownload, HiMail, HiSparkles, HiMenu, HiX, HiHome, HiUser, HiCode, HiBriefcase, HiPhone, HiSun, HiMoon } from 'react-icons/hi'
import { GrProjects } from "react-icons/gr";
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationLinks = [
    { name: 'About ', href: '#hero', icon: HiUser },
    { name: 'Projects ', href: '#projects', icon: GrProjects },
    { name: 'Skills ', href: '#skills', icon: HiCode },
    { name: 'Experience ', href: '#experience', icon: HiBriefcase },
    { name: 'Contact ', href: '#contact', icon: HiPhone }
  ]
 

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/msamir-17', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammad-samir-khan-199a7b266', icon: FaLinkedin }
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50 dark:border-gray-700/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white font-bold text-lg">S</span>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="relative group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
                <motion.div
                  className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop Social Links & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                className="relative w-5 h-5"
              >
                {isDarkMode ? (
                  <HiSun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
                ) : (
                  <HiMoon className="w-5 h-5 text-blue-600 group-hover:text-blue-500" />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg rounded-2xl mt-2 shadow-xl border border-gray-200/50 dark:border-gray-700/30"
        >
          <div className="p-6 space-y-4">
            {navigationLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ x: 10, scale: 1.02 }}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2"
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </motion.a>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl shadow-lg transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  className="relative w-5 h-5"
                >
                  {isDarkMode ? (
                    <HiSun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
                  ) : (
                    <HiMoon className="w-5 h-5 text-blue-600 group-hover:text-blue-500" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

const Hero = () => {
  const [heroData, setHeroData] = useState({
    greeting: "Hi, I'm",
    name: 'Samir',
    jobtitles: ['Loading titles...'],
    bio: "Passionate about creating intelligent solutions...",
    resumeurl: ''
  });
  const [currentTitle, setCurrentTitle] = useState(0)
  const titles = heroData.jobtitles;
  
  // [
  //   'AI Enthusiast',
  //   'ML Engineer', 
  //   'Next.js Developer',
  //   'Web Developer',
  //   'Hackathon Builder'
  // ]         

  useEffect(() => {
    const fetchHeroData = async () => {
      try{
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/hero');
            // Agar data milta hai, toh use state mein set kar do

        if(response.data){
          setHeroData(response.data)
        }

      }
      catch(error){
        console.error("Failled to fetch data :", error)
      }finally{
        setLoading(false)
      }
    };
    fetchHeroData();
  }, []);
// [] ka matlab hai ki yeh sirf ek baar chalega

  

  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // const downloadResume = () => {
  //   const link = document.createElement('a')
  //   link.href = '/samir-r.pdf'
  //   link.download = 'Samir_Resume.pdf'
  //   link.click()
  // }

//   const downloadResume = () => {
//   // Agar resumeUrl hai, tabhi download start karo
//   if (heroData.resumeurl) {
//     const link = document.createElement('a');
//     link.href = heroData.resumeurl;
//     // Hum yahan 'download' attribute add kar sakte hain, lekin Cloudinary se direct link bhi kaam karega
//     link.target = '_blank'; // Naye tab mein kholein
//     link.rel = 'noopener noreferrer';
//     link.click();
//   }
// }

// Puraane 'downloadResume' function ko is naye waale se replace karein

const downloadResume = () => {
  // Check Point #1: Kya humare paas URL hai?
  console.log("Download button clicked. Resume URL is:", heroData.resumeurl);

  if (heroData.resumeurl) {
    const link = document.createElement('a');
    link.href = heroData.resumeurl;
    link.download = 'Samir_Resume.pdf';

    // Check Point #2: Link kaisa dikh raha hai?
    console.log("Created link element:", link);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.error("Resume URL is empty or not available.");
    alert("Sorry, the resume is not available at the moment.");
  }
}


  return (
    <>
      <Header />
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 pt-20">
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
          {/* Additional light mode enhancements */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full filter blur-3xl"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                <HiSparkles className="w-4 h-4" />
                Welcome to my portfolio
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
              >
                {heroData.greeting}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse-glow">
                  {heroData.name}
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300"
              >
                {heroData.bio}
                {/* AI/ML Engineer & Full Stack Developer */}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="h-8 flex items-center justify-center lg:justify-start"
              >
                <motion.span
                  key={currentTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium"
                >
                  {titles[currentTitle]}
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Passionate about creating intelligent solutions and beautiful web experiences. 
                Let's build something amazing together!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <motion.button
                  onClick={downloadResume}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  <HiDownload className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </motion.button>

                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-3"
                >
                  <HiMail className="w-5 h-5 group-hover:animate-pulse" />
                  Let's Connect
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-80 h-80 lg:w-96 lg:h-96 relative"
                >
                  {/* Main Avatar Circle */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
                    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
                      {/* Developer Emoji */}
                      <div className="text-8xl lg:text-9xl">👨‍💻</div>
                      
                      {/* Floating Code Elements */}
                      <motion.div 
                        className="absolute top-4 right-8 text-2xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        ⚛️
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-8 left-4 text-2xl"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        🤖
                      </motion.div>
                      <motion.div 
                        className="absolute top-1/2 left-2 text-xl"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ⚡
                      </motion.div>
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
                      JS
                    </div>
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-purple-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
                      AI
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
                      ML
                    </div>
                    <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-white text-sm font-bold">
                      ⚛️
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Hero