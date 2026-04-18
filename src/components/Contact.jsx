import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, User, UserCheck } from 'lucide-react'

const ContactSection = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone_number: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/contact/create/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      await response.json()
      setSubmitted(true)
      setForm({ name: '', phone_number: '', message: '' })
    } catch (err) {
      console.error('Submission error:', err)
      setError(err.message || t('contact.error.message'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.officeLabel'),
      value: '0285-37-8703',
      gradient: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      link: 'tel:0285378703',
    },
    {
      icon: User,
      label: t('contact.ceoLabel'),
      value: '+81 90-4384-9090',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      link: 'tel:+819043849090',
    },
    {
      icon: UserCheck,
      label: t('contact.managerLabel'),
      value: '+81 80-1993-0707',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      link: 'tel:+818019930707',
    },
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: t('contact.emailValue'),
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      link: 'mailto:issjapan2023@gmail.com',
    },
    {
      icon: MapPin,
      label: t('contact.locationLabel'),
      value: t('contact.locationValue'),
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50',
      link: 'https://maps.app.goo.gl/3RUnQsGy1h7kWhqn8?g_st=it',
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="contact">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            {t('contact.badge')}
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group"
                  >
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${info.bgGradient} border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${info.gradient} shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{info.label}</h3>
                            <p className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">{info.value}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                )
              })}
            </div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.descriptionCardTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('contact.descriptionCardText')}</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.success.title')}</h3>
                  <p className="text-gray-600 mb-6">{t('contact.success.message')}</p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setError(null)
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                  >
                    {t('contact.success.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <div className="flex items-center gap-2 text-red-700">
                        <span className="text-lg">⚠️</span>
                        <div>
                          <h4 className="font-semibold">{t('contact.error.title')}</h4>
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.form.name')}</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('contact.form.namePlaceholder')}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.form.phone')}</label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder={t('contact.form.phonePlaceholder')}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.form.message')}</label>
                      <textarea
                        name="message"
                        rows="6"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t('contact.form.messagePlaceholder')}
                        required
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection