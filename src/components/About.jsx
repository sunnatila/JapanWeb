"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Award, Heart, Target, Sparkles } from "lucide-react"

const AboutSection = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: Award,
      titleKey: "about.historyTitle",
      descKey: "about.historyDesc",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      titleKey: "about.valuesTitle",
      descKey: "about.valuesDesc",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Target,
      titleKey: "about.missionTitle",
      descKey: "about.missionDesc",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section
      className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden"
      id="about"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                About Us
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  {t("about.title")}
                </span>
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed mb-12"
            >
              {t("about.subtitle")}
            </motion.p>

            <div className="space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className="group"
                  >
                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100 hover:bg-white/90 hover:shadow-xl transition-all duration-300">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                          {t(feature.titleKey)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{t(feature.descKey)}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side - Enhanced Realistic Car Wheel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg flex items-center justify-center">
              {/* Brake Disc (behind wheel) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute w-64 h-64 z-0"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 shadow-2xl">
                  {/* Brake disc holes */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-gray-800 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) translateY(-80px) rotate(${i * 30}deg) translateY(80px)`,
                      }}
                    />
                  ))}
                  {/* Brake disc grooves */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-8 rounded-full border border-gray-700/50"
                      style={{
                        transform: `rotate(${i * 15}deg)`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Main rotating wheel */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="relative w-80 h-80 z-10"
              >
                {/* Tire outer wall */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl">
                  {/* Tire sidewall details */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900">
                    {/* Tire brand text effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-gray-700/30"></div>
                    <div className="absolute inset-1 rounded-full border border-gray-600/20"></div>

                    {/* Tire tread pattern */}
                    {[...Array(32)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-3 bg-gray-700 rounded-sm"
                        style={{
                          left: "50%",
                          top: "2px",
                          transformOrigin: "0 156px",
                          transform: `translateX(-50%) rotate(${i * 11.25}deg)`,
                        }}
                      />
                    ))}

                    {/* Inner tire wall */}
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner">
                      {/* Alloy Rim */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 shadow-xl">
                        {/* Rim outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-slate-200/50"></div>
                        <div className="absolute inset-1 rounded-full border-2 border-slate-600/30"></div>

                        {/* Spoke design - 5 spoke alloy wheel */}
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="absolute inset-0">
                            {/* Main spoke */}
                            <div
                              className="absolute bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 shadow-lg"
                              style={{
                                width: "8px",
                                height: "45%",
                                left: "50%",
                                top: "50%",
                                transformOrigin: "0 0",
                                transform: `translate(-0%, -0%) rotate(${i * 72}deg)`,
                                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                              }}
                            />
                            {/* Spoke highlight */}
                            <div
                              className="absolute bg-gradient-to-r from-white/60 to-transparent"
                              style={{
                                width: "3px",
                                height: "40%",
                                left: "50%",
                                top: "50%",
                                transformOrigin: "0 0",
                                transform: `translate(-0%, -0%) rotate(${i * 72}deg)`,
                              }}
                            />
                          </div>
                        ))}

                        {/* Center hub cap */}
                        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 shadow-2xl">
                          {/* Hub cap rings */}
                          <div className="absolute inset-1 rounded-full border-2 border-slate-500/30"></div>
                          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-100 to-slate-300">
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 shadow-inner">
                              {/* Center logo area */}
                              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg">
                                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                                  {/* Shine effect */}
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rim bolts */}
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full shadow-lg border border-slate-500"
                            style={{
                              left: "43%",
                              top: "80%",
                              transform: `translate(70%, 88%) translateY(-78px) rotate(${i * 70}deg) translateY(48px)`,
                            }}
                          >
                            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-slate-400 to-slate-500"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced speed lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30, scaleX: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: [0, 60],
                      scaleX: [0, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.15,
                      ease: "easeOut",
                    }}
                    className="absolute h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent rounded-full"
                    style={{
                      width: `${20 + i * 4}px`,
                      top: `${35 + i * 6}%`,
                      right: "85%",
                    }}
                  />
                ))}
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className={`absolute w-${2 + (i % 3)} h-${2 + (i % 3)} bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg opacity-60`}
                  style={{
                    top: `${20 + i * 12}%`,
                    right: `${10 + i * 8}%`,
                  }}
                />
              ))}

              {/* Enhanced glowing effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-2xl scale-125 animate-pulse"></div>

              {/* Ground shadow */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-lg"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
