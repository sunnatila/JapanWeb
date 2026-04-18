import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Squash as Hamburger } from 'hamburger-react'
import { ArrowRight, Sparkles } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import logo from "../../public/logo.png"

const Navbar = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect with throttling for better performance
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const links = [
    { href: '#about', label: t('about1'), icon: '👋', gradient: 'from-blue-500 to-purple-500' },
    { href: '#services', label: t('services1'), icon: '⚡', gradient: 'from-purple-500 to-pink-500' },
    { href: '#partners', label: t('partners1'), icon: '🤝', gradient: 'from-pink-500 to-red-500' },
    { href: '#products', label: t('products1'), icon: '🎯', gradient: 'from-red-500 to-orange-500' },
    { href: '#faq', label: t('faq1'), icon: '❓', gradient: 'from-orange-500 to-yellow-500' },
    { href: '#contact', label: t('contact1'), icon: '💬', isSpecial: true, gradient: 'from-green-500 to-blue-500' },
  ]

  const handleLinkClick = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`w-full fixed top-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div 
          className={`relative flex justify-between items-center transition-all duration-700 backdrop-blur-2xl ${
            scrolled 
              ? 'bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-purple-900/95 border border-white/20 shadow-2xl py-3 px-6 sm:px-8 rounded-2xl' 
              : 'bg-gradient-to-r from-slate-900/90 via-blue-900/90 to-purple-900/90 border border-white/30 shadow-xl py-4 px-6 sm:px-8 rounded-3xl'
          }`}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-inherit" />
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ padding: '1px' }}>
            <div className="w-full h-full bg-slate-900/90 rounded-inherit" />
          </div>

          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 group relative z-10"
            aria-label="Homepage"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <img 
                src={logo} 
                alt="Company Logo" 
                className="relative w-16 sm:w-20 h-auto scale-[1.2] sm:scale-[1.5] object-contain filter drop-shadow-lg"
                loading="eager"
              />
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 relative z-10">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {link.isSpecial ? (
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 xl:px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    
                    {/* Sparkle effect */}
                    <Sparkles className="relative w-4 h-4 animate-pulse" />
                    <span className="relative text-sm xl:text-base font-semibold">{link.label}</span>
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => handleLinkClick(link.href)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-2 text-white/90 hover:text-white px-4 xl:px-5 py-3 rounded-2xl font-medium transition-all duration-300 group overflow-hidden"
                  >
                    {/* Hover background with gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`} />
                    
                    {/* Icon with glow */}
                    <span className="relative text-sm opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      {link.icon}
                    </span>
                    <span className="relative text-sm xl:text-base">{link.label}</span>
                    
                    {/* Bottom border effect */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${link.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side - Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <LanguageSwitcher />
            </motion.div>
            
            <div className="lg:hidden">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/30 shadow-lg"
              >
                <Hamburger 
                  toggled={isOpen} 
                  toggle={setIsOpen} 
                  size={22} 
                  color="white"
                  duration={0.3}
                  hideOutline={false}
                  label="Toggle menu"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Enhanced Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 bg-gradient-to-br from-black/40 via-blue-900/20 to-purple-900/40 backdrop-blur-md z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="lg:hidden absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-4 bg-white/95 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl py-8 px-6 z-50 overflow-hidden"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
                
                <div className="relative space-y-3">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      {link.isSpecial ? (
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="relative flex items-center justify-between w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-5 rounded-2xl font-bold shadow-lg group active:scale-95 transition-all duration-200 overflow-hidden"
                        >
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 translate-y-full group-active:translate-y-0 transition-transform duration-200" />
                          
                          <div className="relative flex items-center gap-3">
                            <span className="text-xl animate-bounce">{link.icon}</span>
                            <span className="text-lg">{link.label}</span>
                          </div>
                          <ArrowRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="relative flex items-center gap-4 w-full text-slate-700 hover:text-white px-6 py-5 rounded-2xl transition-all duration-300 font-semibold group active:scale-95 overflow-hidden"
                        >
                          {/* Hover background with gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl`} />
                          
                          <span className="relative text-xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                            {link.icon}
                          </span>
                          <span className="relative text-lg">{link.label}</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar