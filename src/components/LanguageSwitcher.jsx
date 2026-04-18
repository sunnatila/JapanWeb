import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe, Check, Sparkles } from 'lucide-react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { 
      code: 'en', 
      label: 'English', 
      flag: '🇺🇸', 
      nativeName: 'English',
      gradient: 'from-blue-500 to-indigo-600',
      accent: 'blue'
    },
    { 
      code: 'ru', 
      label: 'Русский', 
      flag: '🇷🇺', 
      nativeName: 'Русский',
      gradient: 'from-red-500 to-pink-600',
      accent: 'red'
    },
    { 
      code: 'ja', 
      label: '日本語', 
      flag: '🇯🇵', 
      nativeName: '日本語',
      gradient: 'from-purple-500 to-violet-600',
      accent: 'purple'
    },
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode) => {
    if (langCode !== i18n.language) {
      i18n.changeLanguage(langCode)
      // Note: localStorage is not used in Claude artifacts, using in-memory storage instead
      // In real implementation, you can use: localStorage.setItem('preferred-language', langCode)
    }
    setIsOpen(false)
  }

  // In real implementation, load saved language preference on mount
  // useEffect(() => {
  //   const savedLanguage = localStorage.getItem('preferred-language')
  //   if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
  //     i18n.changeLanguage(savedLanguage)
  //   }
  // }, [i18n])

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsOpen(!isOpen)
        }
      }}
    >
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 px-4 py-3 bg-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group min-w-[120px] sm:min-w-[140px] focus:outline-none focus:ring-2 focus:ring-white/50 overflow-hidden"
        aria-label={`Current language: ${currentLanguage.nativeName}. Click to change language`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Animated background */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentLanguage.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <Globe className="relative w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-300 flex-shrink-0 group-hover:rotate-12" />
        
        <div className="relative flex items-center gap-2 flex-1 min-w-0">
          <motion.span 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-lg leading-none flex-shrink-0 filter drop-shadow-lg"
          >
            {currentLanguage.flag}
          </motion.span>
          <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300 hidden sm:block truncate">
            {currentLanguage.code.toUpperCase()}
          </span>
        </div>

        <ChevronDown 
          className={`relative w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-full right-0 mt-3 w-72 bg-white/95 max-md:-left-4 max-md:top-15 max-md:w-56 rounded-3xl shadow-2xl py-4 z-50 overflow-hidden"
              role="listbox"
              aria-label="Language options"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50" />
              
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative px-6 py-3 border-b border-gray-200/50"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                  <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wide">
                    Choose Language
                  </p>
                </div>
              </motion.div>

              {/* Language Options */}
              <div className="relative py-2">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`relative w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 group focus:outline-none overflow-hidden ${
                      currentLanguage.code === language.code ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'hover:bg-gray-50/80'
                    }`}
                    role="option"
                    aria-selected={currentLanguage.code === language.code}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleLanguageChange(language.code)
                      }
                    }}
                  >
                    {/* Hover gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${language.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Flag with glow effect */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${language.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                      <span className="relative text-2xl leading-none flex-shrink-0 filter drop-shadow-lg">
                        {language.flag}
                      </span>
                    </motion.div>
                    
                    <div className="relative flex-1 text-left min-w-0">
                      <motion.p 
                        className={`text-lg font-semibold transition-colors duration-200 truncate ${
                          currentLanguage.code === language.code 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                            : 'text-gray-800 group-hover:text-gray-900'
                        }`}
                      >
                        {language.nativeName}
                      </motion.p>
                      <p className={`text-sm transition-colors duration-200 truncate ${
                        currentLanguage.code === language.code 
                          ? 'text-blue-500' 
                          : 'text-gray-500 group-hover:text-gray-600'
                      }`}>
                        {language.label}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    {currentLanguage.code === language.code && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className={`relative w-8 h-8 bg-gradient-to-r ${language.gradient} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}
                        aria-hidden="true"
                      >
                        <Check className="w-4 h-4 text-white" />
                        
                        {/* Pulse effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${language.gradient} rounded-full animate-ping opacity-30`} />
                      </motion.div>
                    )}

                    {/* Side indicator line */}
                    {currentLanguage.code === language.code && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${language.gradient}`} />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default LanguageSwitcher