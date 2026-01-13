"use client"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiDownload, HiMail, HiSparkles } from 'react-icons/hi'
import Header from '@/components/Header'
import axios from 'axios';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    greeting:"",
    name: 'Samir',
    jobtitles: ['Loading...'],
    bio: "Passionate about creating intelligent solutions...",
    resumeurl: ''
  });
  const [currentTitle, setCurrentTitle] = useState(0)
  const [loading, setLoading] = useState(true);
  const titles = heroData.jobtitles;

  useEffect(() => {
    const fetchHeroData = async () => {
      try{
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`);
        if(response.data){
          setHeroData(response.data)
        }
      }
      catch(error){
        console.error("Failed to fetch data:", error)
      }finally{
        setLoading(false)
      }
    };
    fetchHeroData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const titles = heroData.jobtitles;
      setCurrentTitle(prev => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [heroData.jobtitles])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Function to scroll to skills section
  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = async () => {
    if (!heroData.resumeurl) {
      alert("Sorry, the resume is not available.");
      return;
    }

    try {
      const response = await fetch(heroData.resumeurl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Samir_Resume.pdf';
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error downloading the resume:", error);
      alert("Could not download the resume.");
    }
  };

  return (
    <>
      <Header/>
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 pt-16 md:pt-20">
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

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left space-y-4 md:space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 transition-all duration-300"
              >
                <HiSparkles className="w-4 h-4" />
                Welcome to my portfolio
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
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
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {heroData.bio}
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
                  className="text-base sm:text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium"
                >
                  {titles?.[currentTitle] || "Loading..."}
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Passionate about creating intelligent solutions and beautiful web experiences. 
                Let's build something amazing together!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2 md:pt-4"
              >
                <motion.button
                  onClick={downloadResume}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2, 
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 md:gap-3 justify-center text-sm md:text-base"
                >
                  <HiDownload className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </motion.button>

                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    backgroundColor: "rgb(37, 99, 235)",
                    color: "#ffffff",
                    boxShadow: "0 10px 15px -3px rgb(37 99 235 / 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-6 md:px-8 py-3 md:py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 md:gap-3 justify-center text-sm md:text-base"
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
              className="flex justify-center lg:justify-end mt-8 lg:mt-0"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
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
                  className="w-full aspect-square relative"
                >
                  {/* Main Avatar Circle */}
                  <motion.div 
                    className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl"
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 5,
                      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
                      <img src="/avtar.jpg" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                      
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
                    </div>
                  </motion.div>

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

          {/* Scroll Indicator - Now clickable and scrolls to Skills */}
          <motion.button
            onClick={scrollToSkills}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer focus:outline-none group"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
            >
              <div className="w-12 h-20 pt-5 border-2 border-current rounded-full flex justify-center relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-current rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.button>
        </div>
      </section>
    </>
  )
}

export default Hero