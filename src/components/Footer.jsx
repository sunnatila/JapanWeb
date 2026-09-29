import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Users, 
  Phone, 
  Mail, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin,
  ArrowRight,
  Heart,
  Sparkles,
  Wheat
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  const { t } = useTranslation()

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/iss_japan/', color: 'hover:text-pink-500', bg: 'hover:bg-pink-50' },
    { icon: FaWhatsapp, href: '+817014010101', color: 'hover:text-green-500', bg: 'hover:bg-green-50' },
  ]

  const quickLinks = [
    { href: '#about', label: t('footer.about') },
    { href: '#services', label: t('footer.services') },
    { href: '#products', label: t('footer.products') },
    { href: '#faq', label: t('footer.faq') },
    { href: '#contact', label: t('footer.contact') },
  ]

  const contactInfo = [
    {
      icon: Phone,
      text: '+81 80-1993-0707',
      href: 'tel:+818019930707',
      bgColor: 'bg-green-500/20',
      hoverColor: 'group-hover:bg-green-500/30',
      iconColor: 'text-green-400'
    },
    {
      icon: Mail,
      text: 'issjapan2023@gmail.com',
      href: 'mailto:issjapan2023@gmail.com',
      bgColor: 'bg-blue-500/20',
      hoverColor: 'group-hover:bg-blue-500/30',
      iconColor: 'text-blue-400'
    },
    {
      icon: MapPin,
      text: "CVCC+7M Kaminokawa, Tochigi, Japan",
      href: 'https://maps.app.goo.gl/3RUnQsGy1h7kWhqn8?g_st=it',
      bgColor: 'bg-purple-500/20',
      hoverColor: 'group-hover:bg-purple-500/30',
      iconColor: 'text-purple-400'
    }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="ISS Japan Logo" className="w-28 scale-[1.5] h-auto" />
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
                {t('footer.companyDesc')}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-400">Follow us:</span>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} ${social.bg} hover:bg-white/20 group`}
                      >
                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Phone className="w-6 h-6 text-blue-400" />
                {t('footer.contactTitle')}
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon
                  return (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : '_self'}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer"
                    >
                      <div className={`w-8 h-8 ${contact.bgColor} rounded-lg flex items-center justify-center ${contact.hoverColor} transition-colors duration-300`}>
                        <IconComponent className={`w-4 h-4 ${contact.iconColor}`} />
                      </div>
                      <span className="text-sm">{contact.text}</span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-purple-400" />
                {t('footer.linksTitle')}
              </h3>
              
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-white group-hover:w-2 transition-all duration-300"></div>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-8"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>© 2021 ISS JAPAN</span>
                <span>{t('footer.rights')}</span>
                <span>{t('footer.madeWith')}</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>{t('footer.inJapan')}</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#privacy" className="hover:text-white transition-colors duration-300">{t('footer.privacy')}</a>
                <a href="#terms" className="hover:text-white transition-colors duration-300">{t('footer.terms')}</a>
                <a href="#cookies" className="hover:text-white transition-colors duration-300">{t('footer.cookies')}</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer