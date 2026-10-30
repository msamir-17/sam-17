"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiDownload, HiMail } from 'react-icons/hi'
import { trackResumeDownload } from '@/hooks/useAnalytics';
import { useData } from '@/context/DataContext';

const Hero = () => {
  const { hero: heroData, loaded } = useData();
  const [currentTitle, setCurrentTitle] = useState(0)
  const loading = !loaded;


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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#fafaf9] via-white to-gray-50/80 dark:from-[#050A17] dark:via-[#0A0F1F] dark:to-[#0C1323]">
      {/* Ambient Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dot grid pattern */}
        <div className="absolute inset-0 dot-grid" />
        {/* Ambient glow orbs */}
        <div className="ambient-glow w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-500/6 top-[10%] left-[5%]" />
        <div className="ambient-glow w-[400px] h-[400px] bg-purple-400/15 dark:bg-purple-600/5 bottom-[15%] right-[10%]" />
        <div className="ambient-glow w-[350px] h-[350px] bg-indigo-300/10 dark:bg-indigo-500/4 top-[40%] right-[20%]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center lg:text-left flex flex-col justify-center space-y-5"
          >
            {loading ? (
              <div className="space-y-4">
                <div className="h-12 w-3/4 skeleton rounded-lg mx-auto lg:mx-0" />
                <div className="h-8 w-1/2 skeleton rounded-lg mx-auto lg:mx-0" />
                <div className="h-6 w-2/3 skeleton rounded-lg mx-auto lg:mx-0" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Greeting — light weight, understated */}
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm sm:text-base font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400"
                >
                  {heroData.greeting}
                </motion.p>

                {/* Name — bold hero typography */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                  <span className="gradient-text">
                    {heroData.name}
                  </span>
                </h1>

                {/* Bio — medium weight, secondary color */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  {heroData.bio}
                </h2>
              </div>
            )}

            {!loading && (
              <>
                {/* Role badge — monospace, pill style */}
                <div className="min-h-[2.5rem] flex items-center justify-center lg:justify-start">
                  <motion.div
                    key={currentTitle}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-sm font-medium text-blue-700 dark:text-blue-300 tracking-wide">
                      {heroData.jobtitles?.[currentTitle] || "Loading..."}
                    </span>
                  </motion.div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Passionate about creating intelligent solutions and beautiful web experiences. 
                  Let&apos;s build something amazing together!
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-3">
                  <button
                    onClick={downloadResume}
                    className="group px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2.5 justify-center text-sm active:scale-[0.97]"
                  >
                    <HiDownload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    Download Resume
                  </button>

                  <button
                    onClick={scrollToContact}
                    className="group px-7 py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2.5 justify-center text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 active:scale-[0.97]"
                  >
                    <HiMail className="w-4 h-4" />
                    Let&apos;s Connect
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Right Side - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[260px] sm:max-w-xs md:max-w-sm">
              {/* Soft glow behind avatar */}
              <div className="absolute inset-0 scale-110 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-indigo-500/10 rounded-full blur-3xl" />
              <div className="w-full aspect-square relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-indigo-500 rounded-full p-[3px] shadow-2xl shadow-purple-500/15 dark:shadow-purple-500/10">
                  <div className="w-full h-full bg-white dark:bg-[#050A17] rounded-full overflow-hidden relative">
                    <Image 
                      src="/avtar.webp" 
                      alt="Samir - AI/ML Engineer & Full Stack Developer" 
                      width={400}
                      height={400}
                      priority
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
            <div className="w-7 h-12 border-2 border-current rounded-full flex justify-center pt-2.5">
              <div className="w-1 h-2 bg-current rounded-full" />
            </div>
          </motion.div>
        </button>
      </div>

      {/* Bottom section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}

export default Hero