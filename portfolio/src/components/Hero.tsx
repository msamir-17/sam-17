"use client"
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiDownload, HiMail } from 'react-icons/hi'
import axios from 'axios';
import { trackResumeDownload } from '@/hooks/useAnalytics';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    greeting: "",
    name: 'Samir',
    jobtitles: ['Loading...'],
    bio: "Passionate about creating intelligent solutions...",
    resumeurl: ''
  });
  const [currentTitle, setCurrentTitle] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`);
        if (response.data) {
          setHeroData(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    };
    fetchHeroData();
  }, []);

  useEffect(() => {
    if (heroData.jobtitles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % heroData.jobtitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [heroData.jobtitles])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

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
      trackResumeDownload();
    } catch (error) {
      console.error("Error downloading the resume:", error);
      alert("Could not download the resume.");
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 pt-16 md:pt-20">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left space-y-5"
          >
            <div className="section-badge">
              ✨ Welcome to my portfolio
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="h-12 w-3/4 skeleton rounded-lg mx-auto lg:mx-0" />
                <div className="h-8 w-1/2 skeleton rounded-lg mx-auto lg:mx-0" />
                <div className="h-6 w-2/3 skeleton rounded-lg mx-auto lg:mx-0" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                  {heroData.greeting}{' '}
                  <span className="gradient-text">
                    {heroData.name}
                  </span>
                </h1>

                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                  {heroData.bio}
                </h2>

                <div className="h-8 flex items-center justify-center lg:justify-start">
                  <motion.span
                    key={currentTitle}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-medium"
                  >
                    {heroData.jobtitles?.[currentTitle] || "Loading..."}
                  </motion.span>
                </div>
              </>
            )}

            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Passionate about creating intelligent solutions and beautiful web experiences. 
              Let&apos;s build something amazing together!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button
                onClick={downloadResume}
                className="group px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2.5 justify-center text-sm active:scale-[0.98]"
              >
                <HiDownload className="w-4 h-4" />
                Download Resume
              </button>

              <button
                onClick={scrollToContact}
                className="group px-7 py-3.5 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2.5 justify-center text-sm hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white active:scale-[0.98]"
              >
                <HiMail className="w-4 h-4" />
                Let&apos;s Connect
              </button>
            </div>
          </motion.div>

          {/* Right Side - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="w-full aspect-square relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 shadow-2xl">
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full overflow-hidden">
                    <img 
                      src="/avtar.jpg" 
                      alt="Samir - AI/ML Engineer & Full Stack Developer" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToSkills}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 focus:outline-none group"
          aria-label="Scroll to skills section"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
          >
            <div className="w-8 h-14 border-2 border-current rounded-full flex justify-center pt-3">
              <div className="w-1 h-2.5 bg-current rounded-full" />
            </div>
          </motion.div>
        </button>
      </div>
    </section>
  )
}

export default Hero