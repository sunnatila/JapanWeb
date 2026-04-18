import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Info, Star, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import swiper1 from '../../public/images/swiper1.jpg'
import swiper2 from '../../public/images/swiper2.jpg'

const CarPartsSwiper = () => {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef(null)

  // Create parts array from translation data
  const parts = [
    {
      id: 1,
      image: swiper1,
      name: t('swiper.part1.name'),
      model: t('swiper.part1.model'),
      description: t('swiper.part1.description'),
      price: t('swiper.part1.price'),
      rating: 4.8,
      category: 'Brake System',
      availability: 'In Stock',
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-900/20 to-pink-900/20'
    },
    {
      id: 2,
      image: swiper2,
      name: t('swiper.part2.name'),
      model: t('swiper.part2.model'),
      description: t('swiper.part2.description'),
      price: t('swiper.part2.price'),
      rating: 4.9,
      category: 'Engine Parts',
      availability: 'In Stock',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-900/20 to-cyan-900/20'
    },
  ]

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex(prev => (prev + 1) % parts.length)
      }, 4000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isAutoPlay, parts.length])

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % parts.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + parts.length) % parts.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  // Navigation functions
  const handleViewDetails = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleAddToCart = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',  
      opacity: 0.8,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  }

  const currentPart = parts[currentIndex]

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 relative mt-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl"
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          {t('swiper.badge')}
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black mb-6">
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            {t('swiper.title')}
          </span>
        </h2>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('swiper.subtitle')}
        </p>
      </motion.div>

      {/* Main Swiper Container */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] rounded-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] rounded-3xl"></div>

        {/* Slide Container */}
        <div className="relative h-[900px] rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl backdrop-blur-xl">
          <AnimatePresence custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {/* Background Image with Parallax */}
              <div className="absolute inset-0">
                <motion.img
                  src={currentPart.image}
                  alt={currentPart.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${currentPart.bgColor}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-8 lg:px-16">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div 
                      className="space-y-8 text-white"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {/* Category Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="inline-block"
                      >
                        <span className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r ${currentPart.color} shadow-xl`}>
                          {currentPart.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h1 
                        className="text-4xl lg:text-6xl font-black leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        {currentPart.name}
                      </motion.h1>

                      {/* Model */}
                      <motion.h2 
                        className="text-2xl lg:text-3xl text-blue-300 font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        {currentPart.model}
                      </motion.h2>

                      {/* Rating */}
                      <motion.div
                        className="flex items-center gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                            >
                              <Star 
                                className={`w-6 h-6 ${
                                  i < Math.floor(currentPart.rating) 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-400'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-2xl font-bold">{currentPart.rating}</span>
                        <span className="text-gray-300 text-lg">({Math.floor(Math.random() * 300) + 100} reviews)</span>
                      </motion.div>

                      {/* Description */}
                      <motion.p 
                        className="text-xl text-gray-200 leading-relaxed max-w-2xl"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        {currentPart.description}
                      </motion.p>

                      {/* Price & Availability */}
                      <motion.div
                        className="flex items-center gap-6 flex-col"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <div className="text-4xl font-black">
                          {currentPart.price}
                        </div>
                        <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                          currentPart.availability === 'In Stock' 
                            ? 'bg-green-500/20 text-green-300 border border-green-400/40' 
                            : 'bg-orange-500/20 text-orange-300 border border-orange-400/40'
                        }`}>
                          {currentPart.availability}
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        className="flex flex-col sm:flex-row gap-4 pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <motion.button
                          onClick={handleAddToCart}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center justify-center gap-3 bg-gradient-to-r ${currentPart.color} text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group`}
                        >
                          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          {t('swiper.addToCart')}
                        </motion.button>
                        
                        <motion.button
                          onClick={handleViewDetails}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 group"
                        >
                          <Info className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          {t('swiper.viewDetails')}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Right Content - 3D Visual */}
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
                          whileHover={{ rotateY: 10, rotateX: 5 }}
                          transition={{ duration: 0.6 }}
                        >
                          <img 
                            src={currentPart.image}
                            alt={currentPart.name}
                            className="w-full h-full object-cover rounded-3xl"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${currentPart.bgColor} rounded-3xl`}></div>
                        </motion.div>
                        
                        {/* Floating Elements */}
                        <motion.div
                          className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl flex items-center justify-center"
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <span className="text-white font-black text-lg">NEW</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          </div>
          
          <div className="absolute inset-y-0 right-4 flex items-center">
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Autoplay Control */}
          <div className="absolute top-6 right-6">
            <motion.button
              onClick={toggleAutoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Dots Navigation */}
        <motion.div 
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {parts.map((part, index) => (
            <motion.button
              key={part.id}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}></div>
              
              {currentIndex === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 w-4 h-4 rounded-full border-2 border-blue-500"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${currentPart.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / parts.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{currentIndex + 1} of {parts.length}</span>
            <span>{Math.round(((currentIndex + 1) / parts.length) * 100)}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarPartsSwiper