import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FaqSection = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const { t, i18n } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get current language, default to 'en' if not supported
  const getCurrentLang = () => {
    const currentLang = i18n.language
    return ['en', 'ru', 'ja'].includes(currentLang) ? currentLang : 'en'
  }

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true)
        const lang = getCurrentLang()
        const response = await fetch(`${API_BASE_URL}/${lang}/faqs/get/`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs')
        }
        
        const data = await response.json()
        setFaqs(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqs()
  }, [i18n.language]) // Refetch when language changes

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-24" id='faq'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('faq.loading')}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-24" id='faq'>
        <div className="text-center bg-white/80 backdrop-blur-lg border border-red-200/50 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-4xl mb-4">{t('faq.error.warning')}</div>
          <h3 className="text-xl font-semibold text-red-700 mb-3">{t('faq.error.title')}</h3>
          <p className="text-red-600 mb-6">{t('faq.error.message')}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            {t('faq.error.tryAgain')}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-24" id='faq'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          {t('faq.title')}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {t('faq.subtitle')}
        </p>
      </motion.div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 group"
              >
                <span className="font-semibold text-lg text-gray-800 group-hover:text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-all duration-300 ${
                      openIndex === index ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </div>
              </button>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                  height: openIndex === index ? 'auto' : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 pt-2">
                  <div className="w-full h-px bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mb-4"></div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">{t('faq.noFaqs')}</p>
        </div>
      )}
    </section>
  )
}

export default FaqSection