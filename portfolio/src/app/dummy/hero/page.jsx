// "use client"
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { HiDownload, HiMail, HiSparkles } from 'react-icons/hi'
// import Header from '@/components/Header'
// import axios from 'axios';

// const Hero = () => {
//   const [heroData, setHeroData] = useState({
//     greeting:"",
//     name: 'Samir',
//     jobtitles: ['Loading...'],
//     bio: "Passionate about creating intelligent solutions...",
//     resumeurl: ''
//   });
//   const [currentTitle, setCurrentTitle] = useState(0)
//   const [typewriterText, setTypewriterText] = useState('')
//   const [isDeleting, setIsDeleting] = useState(false)
//   const titles = heroData.jobtitles;
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHeroData = async () => {
//       try{
//         setLoading(true);
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`);
//         if(response.data){
//           setHeroData(response.data)
//         }
//       }
//       catch(error){
//         console.error("Failed to fetch data :", error)
//       }finally{
//         setLoading(false)
//       }
//     };
//     fetchHeroData();
//   }, []);

//   // Typewriter effect
//   useEffect(() => {
//     const currentText = titles[currentTitle];
//     let timeout;

//     if (!isDeleting && typewriterText === currentText) {
//       timeout = setTimeout(() => setIsDeleting(true), 2000);
//     } else if (isDeleting && typewriterText === '') {
//       setIsDeleting(false);
//       setCurrentTitle((prev) => (prev + 1) % titles.length);
//     } else {
//       const nextChar = isDeleting
//         ? currentText.substring(0, typewriterText.length - 1)
//         : currentText.substring(0, typewriterText.length + 1);
      
//       timeout = setTimeout(() => {
//         setTypewriterText(nextChar);
//       }, isDeleting ? 50 : 100);
//     }

//     return () => clearTimeout(timeout);
//   }, [typewriterText, isDeleting, currentTitle, titles]);

//   const scrollToContact = () => {
//     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const downloadResume = async () => {
//     if (!heroData.resumeurl) {
//       alert("Sorry, the resume is not available.");
//       return;
//     }

//     try {
//       const response = await fetch(heroData.resumeurl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'Samir_Resume.pdf';
      
//       document.body.appendChild(link);
//       link.click();
      
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading the resume:", error);
//       alert("Could not download the resume.");
//     }
//   };

//   return (
//     <>
//       <Header/>
//       <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A192F] pt-20">
//         {/* Animated Gradient Mesh Background */}
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div 
//             className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#64FFDA]/10 via-[#112240]/20 to-transparent rounded-full filter blur-[120px]"
//             animate={{ 
//               x: [-100, 100, -100],
//               y: [-50, 50, -50],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{ 
//               duration: 25,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//           <motion.div 
//             className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-[#64FFDA]/15 via-[#112240]/25 to-transparent rounded-full filter blur-[100px]"
//             animate={{ 
//               x: [100, -100, 100],
//               y: [50, -50, 50],
//               scale: [1.2, 1, 1.2],
//             }}
//             transition={{ 
//               duration: 20,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//           <motion.div 
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#64FFDA]/8 to-transparent rounded-full filter blur-[90px]"
//             animate={{ 
//               scale: [1, 1.3, 1],
//               opacity: [0.3, 0.5, 0.3]
//             }}
//             transition={{ 
//               duration: 15,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//         </div>

//         <div className="section-container relative z-10 pb-0.5">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Text Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-center lg:text-left space-y-6"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="inline-flex items-center gap-2 px-5 py-2 bg-[#112240] border border-[#64FFDA]/30 rounded-full text-sm font-medium text-[#64FFDA] shadow-lg shadow-[#64FFDA]/10"
//               >
//                 <HiSparkles className="w-4 h-4" />
//                 Welcome to my portfolio
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E6F1FF]"
//               >
//                 {heroData.greeting}{' '}
//                 <span className="bg-gradient-to-r from-[#64FFDA] via-[#64FFDA] to-[#E6F1FF] bg-clip-text text-transparent">
//                   {heroData.name}
//                 </span>
//               </motion.h1>

//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#8892B0]"
//               >
//                 {heroData.bio}
//               </motion.h2>

//               {/* Typewriter Effect */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//                 className="h-10 flex items-center justify-center lg:justify-start"
//               >
//                 <div className="text-lg sm:text-xl text-[#64FFDA] font-mono font-medium flex items-center gap-2">
//                   <span className="text-[#8892B0]">{'>'}</span>
//                   <span>{typewriterText}</span>
//                   <motion.span
//                     animate={{ opacity: [1, 0, 1] }}
//                     transition={{ duration: 0.8, repeat: Infinity }}
//                     className="w-0.5 h-6 bg-[#64FFDA] inline-block"
//                   />
//                 </div>
//               </motion.div>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 className="text-[#8892B0] text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
//               >
//                 Passionate about creating intelligent solutions and beautiful web experiences. 
//                 Let's build something amazing together!
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.9 }}
//                 className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
//               >
//                 <motion.button
//                   onClick={downloadResume}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group px-8 py-4 bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] font-semibold rounded-lg shadow-lg shadow-[#64FFDA]/20 hover:bg-[#64FFDA]/10 transition-all duration-300 flex items-center gap-3"
//                 >
//                   <HiDownload className="w-5 h-5 group-hover:animate-bounce" />
//                   Download Resume
//                 </motion.button>

//                 <motion.button
//                   onClick={scrollToContact}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="group px-8 py-4 bg-[#64FFDA] text-[#0A192F] font-semibold rounded-lg shadow-lg hover:shadow-[#64FFDA]/50 transition-all duration-300 flex items-center gap-3"
//                 >
//                   <HiMail className="w-5 h-5 group-hover:animate-pulse" />
//                   Let's Connect
//                 </motion.button>
//               </motion.div>
//             </motion.div>

//             {/* Right Side - 3D Avatar */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="flex justify-center lg:justify-end"
//             >
//               <div className="relative">
//                 <motion.div
//                   animate={{ 
//                     y: [-10, 10, -10],
//                   }}
//                   transition={{ 
//                     duration: 6,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="w-80 h-80 lg:w-96 lg:h-96 relative"
//                 >
//                   {/* Glowing Ring Effect */}
//                   <motion.div 
//                     className="absolute inset-0 rounded-full"
//                     animate={{
//                       boxShadow: [
//                         '0 0 60px 15px rgba(100, 255, 218, 0.3)',
//                         '0 0 80px 20px rgba(100, 255, 218, 0.5)',
//                         '0 0 60px 15px rgba(100, 255, 218, 0.3)',
//                       ]
//                     }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                   />

//                   {/* Main Avatar Circle */}
//                   <div className="w-full h-full bg-gradient-to-br from-[#64FFDA] via-[#64FFDA]/80 to-[#112240] rounded-full p-1 shadow-2xl">
//                     <div className="w-full h-full bg-[#112240] rounded-full flex items-center justify-center relative overflow-hidden border-2 border-[#64FFDA]/20">
//                       <img src="/avtar.jpg" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                      
//                       {/* Floating Tech Icons */}
//                       <motion.div 
//                         className="absolute top-4 right-8 text-2xl filter drop-shadow-[0_0_8px_rgba(100,255,218,0.8)]"
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                       >
//                         ⚛️
//                       </motion.div>
//                       <motion.div 
//                         className="absolute bottom-8 left-4 text-2xl filter drop-shadow-[0_0_8px_rgba(100,255,218,0.8)]"
//                         animate={{ rotate: -360 }}
//                         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                       >
//                         🤖
//                       </motion.div>
//                     </div>
//                   </div>

//                   {/* Orbiting Tech Badges */}
//                   <motion.div
//                     className="absolute inset-0 pointer-events-none"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                   >
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#112240] border-2 border-[#64FFDA] rounded-full shadow-lg shadow-[#64FFDA]/50 flex items-center justify-center text-[#64FFDA] text-sm font-bold">
//                       JS
//                     </div>
//                     <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-[#112240] border-2 border-[#64FFDA] rounded-full shadow-lg shadow-[#64FFDA]/50 flex items-center justify-center text-[#64FFDA] text-sm font-bold">
//                       AI
//                     </div>
//                     <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#112240] border-2 border-[#64FFDA] rounded-full shadow-lg shadow-[#64FFDA]/50 flex items-center justify-center text-[#64FFDA] text-sm font-bold">
//                       ML
//                     </div>
//                     <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-[#112240] border-2 border-[#64FFDA] rounded-full shadow-lg shadow-[#64FFDA]/50 flex items-center justify-center text-[#64FFDA] text-sm font-bold">
//                       ⚛️
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Scroll Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.4 }}
//             className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
//           >
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="flex flex-col items-center gap-2 text-[#8892B0]"
//             >
//               <span className="text-sm font-medium font-mono">scroll_down()</span>
//               <div className="w-6 h-10 border-2 border-[#64FFDA]/50 rounded-full flex justify-center">
//                 <motion.div
//                   animate={{ y: [0, 12, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-1 h-3 bg-[#64FFDA] rounded-full mt-2 shadow-[0_0_10px_rgba(100,255,218,0.8)]"
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Hero



"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiDownload, HiMail, HiSun, HiMoon } from 'react-icons/hi'

const Hero = () => {
  const [heroData, setHeroData] = useState({
    greeting: "",
    name: 'Samir',
    jobtitles: ['Loading...'],
    bio: "Crafting intelligent solutions...",
    resumeurl: ''
  });
  
  const [currentTitle, setCurrentTitle] = useState(0)
  const [typewriterText, setTypewriterText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [loading, setLoading] = useState(true)
  const titles = heroData.jobtitles

  // Fetch hero data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`)
        const data = await response.json()
        if (data) {
          setHeroData(data)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHeroData()
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentText = titles[currentTitle]
    let timeout

    if (!isDeleting && typewriterText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), 2500)
    } else if (isDeleting && typewriterText === '') {
      setIsDeleting(false)
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    } else {
      const nextChar = isDeleting
        ? currentText.substring(0, typewriterText.length - 1)
        : currentText.substring(0, typewriterText.length + 1)
      
      timeout = setTimeout(() => {
        setTypewriterText(nextChar)
      }, isDeleting ? 40 : 120)
    }

    return () => clearTimeout(timeout)
  }, [typewriterText, isDeleting, currentTitle, titles])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = async () => {
    if (!heroData.resumeurl) {
      alert("Sorry, the resume is not available.")
      return
    }

    try {
      const response = await fetch(heroData.resumeurl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'Samir_Resume.pdf'
      
      document.body.appendChild(link)
      link.click()
      
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading the resume:", error)
      alert("Could not download the resume.")
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#121212]' : 'bg-[#F8F5F0]'}`}>
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
          isDark ? 'bg-[#121212]/80 border-[#C5A572]/20' : 'bg-[#F8F5F0]/80 border-[#C5A572]/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold ${isDark ? 'text-[#C5A572]' : 'text-[#121212]'}`}
          >
            {heroData.name}
          </motion.div>
          
          <motion.button
            onClick={() => setIsDark(!isDark)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              isDark 
                ? 'bg-[#1C1C1C] text-[#C5A572] hover:bg-[#C5A572]/20' 
                : 'bg-white text-[#C5A572] hover:bg-[#C5A572]/20'
            }`}
          >
            {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] ${
              isDark ? 'bg-[#C5A572]/10' : 'bg-[#C5A572]/20'
            }`}
            animate={{ 
              x: [0, 50, 0],
              y: [0, 80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] ${
              isDark ? 'bg-[#C5A572]/8' : 'bg-[#C5A572]/15'
            }`}
            animate={{ 
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - New Structure */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Greeting Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className={`inline-block px-6 py-3 rounded-full backdrop-blur-md border ${
                  isDark 
                    ? 'bg-[#1C1C1C]/50 border-[#C5A572]/30 text-[#C5A572]' 
                    : 'bg-white/50 border-[#C5A572]/40 text-[#121212]'
                }`}
              >
                <span className="text-sm font-medium tracking-wide">{heroData.greeting || "Hello, I'm"}</span>
              </motion.div>

              {/* Name - Large Display */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <div className={`text-6xl lg:text-7xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#121212]'
                }`}>
                  {heroData.name}
                </div>
                <div className={`text-xl lg:text-2xl font-light ${
                  isDark ? 'text-[#E0E0E0]' : 'text-[#121212]/70'
                }`}>
                  {heroData.bio}
                </div>
              </motion.h1>

              {/* Typewriter Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="h-12 flex items-center"
              >
                <div className={`text-2xl font-light tracking-wide ${
                  isDark ? 'text-[#C5A572]' : 'text-[#C5A572]'
                }`}>
                  {typewriterText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-7 bg-[#C5A572] ml-1"
                  />
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-4 pt-4"
              >
                <motion.button
                  onClick={downloadResume}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-[#C5A572] text-[#121212] font-medium rounded-lg overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C5A572] via-[#D4B589] to-[#C5A572] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-2">
                    <HiDownload className="w-5 h-5" />
                    <span>Resume</span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 backdrop-blur-md border-2 font-medium rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'border-[#C5A572] text-[#C5A572] hover:bg-[#C5A572]/10'
                      : 'border-[#C5A572] text-[#121212] hover:bg-[#C5A572]/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HiMail className="w-5 h-5" />
                    <span>Get in Touch</span>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Glassmorphism Card with Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glassmorphism Card */}
                <div className={`relative w-80 h-96 lg:w-96 lg:h-[480px] rounded-3xl backdrop-blur-xl border overflow-hidden ${
                  isDark 
                    ? 'bg-[#1C1C1C]/30 border-[#C5A572]/20' 
                    : 'bg-white/40 border-[#C5A572]/30'
                }`}>
                  {/* Gold Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C5A572]/20 via-transparent to-[#C5A572]/10" />
                  
                  {/* Avatar Container */}
                  <div className="absolute inset-6 rounded-2xl overflow-hidden">
                    <motion.img 
                      src="/avtar.jpg" 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1 }}
                    />
                    
                    {/* Gold Shine Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#C5A572]/0 via-[#C5A572]/30 to-[#C5A572]/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Floating Tech Icons */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#C5A572] flex items-center justify-center text-white font-bold shadow-lg">
                      AI
                    </div>
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-[#C5A572] flex items-center justify-center text-white font-bold shadow-lg">
                      ML
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#C5A572] flex items-center justify-center text-white font-bold shadow-lg">
                      JS
                    </div>
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-[#C5A572] flex items-center justify-center text-white text-xl shadow-lg">
                      ⚛️
                    </div>
                  </motion.div>
                </div>

                {/* Glowing Border Effect */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
                  animate={{
                    background: [
                      'linear-gradient(0deg, #C5A572 0%, transparent 100%)',
                      'linear-gradient(180deg, #C5A572 0%, transparent 100%)',
                      'linear-gradient(360deg, #C5A572 0%, transparent 100%)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ zIndex: -1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <div className={`w-6 h-10 rounded-full border-2 ${
              isDark ? 'border-[#C5A572]/50' : 'border-[#C5A572]/70'
            } flex justify-center p-2`}>
              <motion.div
                className="w-1 h-2 bg-[#C5A572] rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
            <span className={`text-xs tracking-widest ${
              isDark ? 'text-[#E0E0E0]' : 'text-[#121212]/60'
            }`}>SCROLL</span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Hero