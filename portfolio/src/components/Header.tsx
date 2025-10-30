// 'use client';
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { HiMenu, HiX, HiUser, HiCode, HiBriefcase, HiPhone, HiSun, HiMoon } from 'react-icons/hi';
// import { GrProjects } from "react-icons/gr";
// import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import Link from 'next/link';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useState(true)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   useEffect(() => {
//     // Check for saved theme preference or default to dark mode
//     const savedTheme = localStorage.getItem('theme')
//     if (savedTheme) {
//       setIsDarkMode(savedTheme === 'dark')
//     } else {
//       setIsDarkMode(true)
//     }
//   }, [])

//   useEffect(() => {
//     // Apply theme to document
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [isDarkMode])

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode)
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const navigationLinks = [
//     { name: 'About ', href: '#hero', icon: HiUser },
//     { name: 'Projects ', href: '#projects', icon: GrProjects },
//     { name: 'Skills ', href: '#skills', icon: HiCode },
//     { name: 'Experience ', href: '#internships', icon: HiBriefcase },
//     { name: 'Contact ', href: '#contact', icon: HiPhone }
//   ]


//   const socialLinks = [
//     { name: 'GitHub', url: 'https://github.com/msamir-17', icon: FaGithub },
//     { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammad-samir-khan-199a7b266', icon: FaLinkedin }
//   ]



//   const handleMobileLinkClick = (href: string) => {
//     // Step 1: Menu ko band kar do
//     setIsMenuOpen(false);

//     // Step 2: Manually scroll karo
//     const elementId = href.replace('#', '');
//     const element = document.getElementById(elementId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };


//   return (
//     <motion.header
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
//           ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50 dark:border-gray-700/30'
//           : 'bg-transparent'
//         }`}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* Logo */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center"
//           >
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.6 }}
//             >
//               <span className="text-white font-bold text-lg">S</span>
//             </motion.div>
//           </motion.div>

//           {/* Desktop Navigation */}

//           <nav className="hidden lg:flex items-center gap-8">
//             {navigationLinks.map((link, index) => (
//               <motion.a
//                 key={link.name}
//                 href={link.href}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 + 0.3 }}
//                 whileHover={{ y: -2, scale: 1.05 }}
//                 className="relative group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
//               >
//                 <link.icon className="w-4 h-4" />
//                 {link.name}
//                 <motion.div
//                   className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
//                 />
//               </motion.a>
//             ))}
//           </nav>

//           {/* Desktop Social Links & Theme Toggle */}

//           <div className="hidden lg:flex items-center gap-4">
//             {socialLinks.map((social) => (
//               <motion.a
//                 key={social.name}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.2, y: -2 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//               >
//                 <social.icon className="w-5 h-5" />
//               </motion.a>
//             ))}

//             {/* Theme Toggle */}
//             <motion.button
//               onClick={toggleTheme}
//               whileHover={{ scale: 1.1, y: -2 }}
//               whileTap={{ scale: 0.9 }}
//               className="ml-4 p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
//               aria-label="Toggle theme"
//             >
//               <motion.div
//                 initial={{ rotate: 0 }}
//                 animate={{ rotate: isDarkMode ? 180 : 0 }}
//                 transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
//                 className="relative w-5 h-5"
//               >
//                 {isDarkMode ? (
//                   <HiSun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
//                 ) : (
//                   <HiMoon className="w-5 h-5 text-blue-600 group-hover:text-blue-500" />
//                 )}
//               </motion.div>
//             </motion.button>
//           </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//           >
//             {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{
//             opacity: isMenuOpen ? 1 : 0,
//             height: isMenuOpen ? 'auto' : 0
//           }}
//           transition={{ duration: 0.3 }}
//           className="lg:hidden overflow-hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg rounded-2xl mt-2 shadow-xl border border-gray-200/50 dark:border-gray-700/30"
//         >
//           <div className="p-6 space-y-4">
//             {navigationLinks.map((link) => (
//               <motion.button
//                 key={link.name}
//                 onClick={() => handleMobileLinkClick(link.href)}
//                 whileHover={{ x: 10, scale: 1.02 }}
//                 // onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2"
//               >
//                 <link.icon className="w-5 h-5" />
//                 {link.name}
//               </motion.button>
//             ))}

//             <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-4">
//                 {socialLinks.map((social) => (
//                   <motion.a
//                     key={social.name}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                   >
//                     <social.icon className="w-5 h-5" />
//                   </motion.a>
//                 ))}
//               </div>

//               {/* Mobile Theme Toggle */}
//               <motion.button
//                 onClick={toggleTheme}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl shadow-lg transition-all duration-300 group"
//                 aria-label="Toggle theme"
//               >
//                 <motion.div
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: isDarkMode ? 180 : 0 }}
//                   transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
//                   className="relative w-5 h-5"
//                 >
//                   {isDarkMode ? (
//                     <HiSun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
//                   ) : (
//                     <HiMoon className="w-5 h-5 text-blue-600 group-hover:text-blue-500" />
//                   )}
//                 </motion.div>
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.header>
//   )
// }

// export default Header;


'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiUser, HiCode, HiBriefcase, HiPhone, HiSun, HiMoon } from 'react-icons/hi';
import { GrProjects } from "react-icons/gr";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
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

  const navigationLinks = [
    { name: 'About', href: '#hero', icon: HiUser },
    { name: 'Projects', href: '#projects', icon: GrProjects },
    { name: 'Skills', href: '#skills', icon: HiCode },
    { name: 'Experience', href: '#internships', icon: HiBriefcase },
    { name: 'Contact', href: '#contact', icon: HiPhone }
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/msamir-17', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mohammad-samir-khan-199a7b266', icon: FaLinkedin }
  ]

  const handleMobileLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex items-center"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-blue-600" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-blue-600" />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-1">
            {navigationLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleMobileLinkClick(link.href)}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </motion.button>
            ))}

            {/* Mobile Social Links */}
            <div className="flex items-center gap-4 px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header;