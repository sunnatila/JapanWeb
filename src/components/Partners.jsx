import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Star, Award, Globe, TrendingUp, Users, CheckCircle } from 'lucide-react'

// Partner logos data
const partners = [
  {
    id: 1,
    name: 'Partner 1',
    logo: '/images/1.jpg',
    url: 'https://www.bridgestone.co.jp',
    category: 'Technology',
    since: '2020'
  },
  {
    id: 2,
    name: 'Partner 2',
    logo: '/images/2.jpg',
    url: 'https://www.michelin.co.jp',
    category: 'Automotive',
    since: '2019'
  },
  {
    id: 3,
    name: 'Partner 3',
    logo: '/images/3.jpg',
    url: 'https://tyre.dunlop.co.jp',
    category: 'Manufacturing',
    since: '2021'
  },
  {
    id: 4,
    name: 'Partner 4',
    logo: '/images/4.jpg',
    url: 'http://www.falken.co.jp',
    category: 'Logistics',
    since: '2020'
  },
  {
    id: 5,
    name: 'Partner 5',
    logo: '/images/5.jpg',
    url: 'https://www.goodyear.co.jp',
    category: 'Innovation',
    since: '2022'
  },
  {
    id: 6,
    name: 'Partner 6',
    logo: '/images/6.jpg',
    url: 'https://www.bfgoodrichtires.co.jp',
    category: 'Manufacturing',
    since: '2018'
  },
  {
    id: 7,
    name: 'Partner 7',
    logo: '/images/7.jpg',
    url: 'http://www.yokohamatire.jp/yrc/japan/index.html',
    category: 'Technology',
    since: '2023'
  },
  {
    id: 8,
    name: 'Partner 8',
    logo: '/images/8.jpg',
    url: 'https://www.pirelli.com/tyres/ja-jp/car/homepage',
    category: 'Automotive',
    since: '2021'
  },
  {
    id: 9,
    name: 'Partner 9',
    logo: '/images/9.jpg',
    url: 'https://www.toyotires.jp',
    category: 'Innovation',
    since: '2020'
  },
  {
    id: 10,
    name: 'Partner 10',
    logo: '/images/10.jpg',
    url: 'http://www.nittotire.co.jp',
    category: 'Manufacturing',
    since: '2019'
  },
  {
    id: 11,
    name: 'Partner 11',
    logo: '/images/11.jpg',
    url: 'https://www.continental-tires.com/jp/ja',
    category: 'Technology',
    since: '2022'
  },
  {
    id: 12,
    name: 'Partner 12',
    logo: '/images/12.jpg',
    url: 'https://www.hankooktire.com/jp/ja/home.html',
    category: 'Logistics',
    since: '2021'
  }
]

const stats = [
  {
    icon: Users,
    valueKey: 'partners.stats.partners',
    labelKey: 'partners.stats.partnersLabel',
    value: '50+'
  },
  {
    icon: Globe,
    valueKey: 'partners.stats.countries',
    labelKey: 'partners.stats.countriesLabel',
    value: '25+'
  },
  {
    icon: TrendingUp,
    valueKey: 'partners.stats.growth',
    labelKey: 'partners.stats.growthLabel',
    value: '150%'
  },
  {
    icon: Award,
    valueKey: 'partners.stats.awards',
    labelKey: 'partners.stats.awardsLabel',
    value: '12+'
  }
]

const Partners = () => {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden" id='partners'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold text-sm mb-6"
          >
            <Star className="w-5 h-5" />
            {t('partners.badge') || 'Trusted Partners'}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t('partners.title') || 'Our Partners'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t('partners.subtitle') || 'We collaborate with industry leaders to deliver exceptional automotive solutions worldwide.'}
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {t(stat.valueKey) || stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {t(stat.labelKey) || 'Label'}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">
            {t('partners.gridTitle') || 'Trusted by Industry Leaders'}
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
                    {/* Partner Image */}
                    <div className="w-32 h-20 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-full h-full object-contain bg-gray-50"
                        onError={(e) => {
                          // Fallback agar image load bo'lmasa
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl hidden items-center justify-center"
                      >
                        <span className="text-2xl font-bold text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {t('partners.benefits.title') || 'Partnership Benefits'}
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('partners.benefits.description') || 'Join our network of trusted partners and unlock exclusive opportunities in the automotive industry.'}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t('partners.benefits.cta') || 'Become a Partner'}
                <motion.span
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
                >
                  →
                </motion.span>
              </motion.button>
            </div>
            
            <div className="space-y-6">
              {[
                { key: 'partners.benefits.item1', default: 'Global market access' },
                { key: 'partners.benefits.item2', default: 'Technical support' },
                { key: 'partners.benefits.item3', default: 'Marketing collaboration' },
                { key: 'partners.benefits.item4', default: 'Priority pricing' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-lg">
                    {t(benefit.key) || benefit.default}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Partners