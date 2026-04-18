import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useMemo } from 'react'
import {
  Wrench,
  PackageCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Loader2,
  X,
  Calendar,
  Clock,
  User
} from 'lucide-react'

const Services = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const { t, i18n } = useTranslation()
  const [servicesData, setServicesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceDetail, setServiceDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  
  // Ikonlar uchun mapping
  const iconMapping = {
    engineering: Wrench,
    quality: PackageCheck,
    logistics: Truck
  }

  // Ranglar uchun mapping
  const colorMapping = {
    engineering: {
      iconColor: 'text-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      hoverGradient: 'group-hover:from-blue-500 group-hover:to-cyan-500'
    },
    quality: {
      iconColor: 'text-green-500',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      hoverGradient: 'group-hover:from-green-500 group-hover:to-emerald-500'
    },
    logistics: {
      iconColor: 'text-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      hoverGradient: 'group-hover:from-purple-500 group-hover:to-pink-500'
    }
  }

  // Text ni qisqartirish funksiyasi
  const truncateText = (text, wordLimit = 15) => {
    if (!text) return ''
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

     const getCurrentLang = () => {
    const currentLang = i18n.language
    return ['en', 'ru', 'ja'].includes(currentLang) ? currentLang : 'en'
  }

  // API dan barcha xizmatlarni olish
  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Hozirgi tilni olish (en, ru, ja)
      const currentLang = getCurrentLang()
      
      const response = await fetch(`${API_BASE_URL}/${currentLang}/services/get/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data) // Debug uchun
      
      // Ma'lumotlarni formatlab olish
      if (data && Array.isArray(data)) {
        setServicesData(data)
      } else if (data && data.services && Array.isArray(data.services)) {
        setServicesData(data.services)
      } else {
        console.warn('Unexpected API response format:', data)
        setServicesData([])
      }
    } catch (err) {
      console.error('Services fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Bitta xizmat haqida to'liq ma'lumot olish
  const fetchServiceDetail = async (serviceId) => {
    try {
      setDetailLoading(true)
      
      // Hozirgi tilni olish
      const currentLang = i18n.language || 'en'
      
      const response = await fetch(`${API_BASE_URL}/${currentLang}/services/get/${serviceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setServiceDetail(data)
    } catch (err) {
      console.error('Service detail fetch error:', err)
      setServiceDetail(null)
    } finally {
      setDetailLoading(false)
    }
  }

  // Learn More bosilganda
  const handleLearnMore = async (service) => {
    setSelectedService(service)
    setModalOpen(true)
    await fetchServiceDetail(service.id)
  }

  // Modal ni yopish
  const closeModal = () => {
    setModalOpen(false)
    setSelectedService(null)
    setServiceDetail(null)
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return t('services.modal.na')
    return new Date(dateString).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Til o'zgarganda va komponent yuklanganda API ni chaqirish
  useEffect(() => {
    fetchServices()
  }, [i18n.language])

  // Xizmatlarni formatlab berish
  const formattedServices = useMemo(() => {
    if (!servicesData || servicesData.length === 0) return []

    return servicesData.map((service, index) => {
      // Service type ga qarab rang va ikon tanlash
      const serviceTypes = ['engineering', 'quality', 'logistics']
      const serviceType = serviceTypes[index % serviceTypes.length]
      const colors = colorMapping[serviceType]
      const IconComponent = iconMapping[serviceType]

      return {
        id: service.id,
        icon: IconComponent,
        title: service.title || t('services.defaultTitle'),
        desc: service.description || t('services.defaultDescription'),
        shortDesc: truncateText(service.description || t('services.defaultDescription'), 15), // Qisqa tavsif
        ...colors
      }
    })
  }, [servicesData, t])

  // Loading holati
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="services">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t('services.loading')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error holati
  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="services">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">{t('services.error.warning')}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('services.error.title')}</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={fetchServices}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('services.error.tryAgain')}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="services">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {t('services.badge')}
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {t('services.title')}
              </span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {t('services.subtitle')}
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          {formattedServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formattedServices.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <motion.div
                    key={service.id || index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.2, 
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-full">
                      {/* Main Card */}
                      <div className={`h-full p-8 rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:bg-gradient-to-br ${service.hoverGradient} group-hover:text-white overflow-hidden`}>
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                        </div>

                        <div className="relative z-10">
                          {/* Icon Container */}
                          <div className="mb-6">
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.bgGradient} group-hover:bg-white/20 transition-all duration-500 shadow-lg`}>
                              <IconComponent className={`w-8 h-8 ${service.iconColor} group-hover:text-white transition-colors duration-500`} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500">
                              {service.title}
                            </h3>
                            
                            <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                              {service.shortDesc}
                            </p>

                            {/* Learn More Link */}
                            <div 
                              onClick={() => handleLearnMore(service)}
                              className="flex items-center gap-2 text-gray-400 group-hover:text-white/80 transition-all duration-500 hover:gap-3 cursor-pointer mt-6"
                            >
                              <span className="text-sm font-medium">
                                {t('services.learnMore')}
                              </span>
                              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" />
                            </div>
                          </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                          animate={{ 
                            y: [-5, 5, -5],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                          className={`absolute top-6 right-6 w-3 h-3 bg-gradient-to-r ${service.gradient} rounded-full opacity-60`}
                        ></motion.div>
                      </div>

                      {/* Decorative Elements */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`}></div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('services.noServices')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl ring-1 ring-gray-200/50"
          >
            {/* Modal Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedService?.gradient || 'from-blue-400 to-purple-400'} opacity-5 rounded-full blur-3xl -translate-y-32 translate-x-32`}></div>
              <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr ${selectedService?.gradient || 'from-green-400 to-blue-400'} opacity-5 rounded-full translate-y-32 -translate-x-32`}></div>
            </div>

            <div className="relative">
              {/* Modal Header */}
              <div className={`relative p-8 bg-gradient-to-r ${selectedService?.gradient || 'from-blue-600 to-purple-600'} text-white overflow-hidden`}>
                {/* Header Background Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {selectedService && (
                      <>
                        <div className="p-4 bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg">
                          <selectedService.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">
                            {selectedService.title}
                          </h3>
                          <p className="text-white/80 font-medium">{t('services.modal.serviceDetails')}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group backdrop-blur-sm"
                    aria-label={t('services.modal.close')}
                  >
                    <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[65vh] relative">
                {detailLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="relative mb-6">
                      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                      <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-ping"></div>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('services.modal.loading')}</h4>
                    <p className="text-gray-600">{t('services.modal.loadingMessage')}</p>
                  </div>
                ) : serviceDetail ? (
                  <div className="space-y-8">
                    {/* Full Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className={`w-1.5 h-8 bg-gradient-to-b ${selectedService?.gradient} rounded-full`}></div>
                        {t('services.modal.description')}
                      </h4>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 shadow-lg border border-gray-200/50">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {serviceDetail.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Additional Content */}
                    {serviceDetail.content && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                          <div className={`w-1.5 h-8 bg-gradient-to-b ${selectedService?.gradient} rounded-full`}></div>
                          {t('services.modal.additionalInfo')}
                        </h4>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-8 shadow-lg border border-gray-200/50">
                          <div className="text-gray-700 leading-relaxed text-lg">
                            {serviceDetail.content}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Service Information */}
                    {(serviceDetail.created_at || serviceDetail.updated_at || serviceDetail.author) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <div className={`w-1.5 h-8 bg-gradient-to-b ${selectedService?.gradient} rounded-full`}></div>
                          {t('services.modal.serviceInfo')}
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {serviceDetail.created_at && (
                            <div className="group hover:scale-105 transition-transform duration-300">
                              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedService?.bgGradient}`}>
                                  <Calendar className={`w-6 h-6 ${selectedService?.iconColor}`} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">{t('services.modal.created')}</p>
                                  <p className="text-base font-semibold text-gray-700">
                                    {formatDate(serviceDetail.created_at)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {serviceDetail.updated_at && (
                            <div className="group hover:scale-105 transition-transform duration-300">
                              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedService?.bgGradient}`}>
                                  <Clock className={`w-6 h-6 ${selectedService?.iconColor}`} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">{t('services.modal.updated')}</p>
                                  <p className="text-base font-semibold text-gray-700">
                                    {formatDate(serviceDetail.updated_at)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {serviceDetail.author && (
                            <div className="group hover:scale-105 transition-transform duration-300">
                              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedService?.bgGradient}`}>
                                  <User className={`w-6 h-6 ${selectedService?.iconColor}`} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">{t('services.modal.author')}</p>
                                  <p className="text-base font-semibold text-gray-700">{serviceDetail.author}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6">😔</div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">{t('services.modal.unableToLoad')}</h4>
                    <p className="text-gray-600 text-lg mb-8">{t('services.modal.loadError')}</p>
                    <button
                      onClick={() => fetchServiceDetail(selectedService?.id)}
                      className={`bg-gradient-to-r ${selectedService?.gradient || 'from-blue-600 to-purple-600'} text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium`}
                    >
                      {t('services.modal.tryAgain')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Services