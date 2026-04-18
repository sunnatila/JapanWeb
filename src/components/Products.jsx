import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  Eye, 
  Loader2, 
  X,
  ShoppingCart,
  Info
} from 'lucide-react'

const ProductsSection = () => {
  const { t, i18n } = useTranslation()
  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetail, setProductDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // Image URL ni to'g'ri formatga keltirish
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    // Agar URL allaqachon to'liq bo'lsa
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    // Agar nisbiy yo'l bo'lsa, base URL qo'shish
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${API_BASE_URL}${cleanPath}`
  }

  // Ranglar uchun mapping
  const colorMapping = [
    {
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-500'
    },
    {
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-500'
    },
    {
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      iconColor: 'text-orange-500'
    },
    {
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      iconColor: 'text-green-500'
    },
    {
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      iconColor: 'text-indigo-500'
    },
    {
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
      iconColor: 'text-pink-500'
    }
  ]

  // Kategoriyalar uchun mapping
  const categoryMapping = ['Premium', 'Popular', 'New', 'Trending', 'Best Seller', 'Limited']


   const getCurrentLang = () => {
    const currentLang = i18n.language
    return ['en', 'ru', 'ja'].includes(currentLang) ? currentLang : 'en'
  }
  // API dan barcha mahsulotlarni olish
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const currentLang = getCurrentLang()
      
      const response = await fetch(`${API_BASE_URL}/${currentLang}/products/get/`, {
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
      console.log('Products API Response:', data) // Debug uchun
      
      // Ma'lumotlarni formatlab olish
      if (data && Array.isArray(data)) {
        setProductsData(data)
      } else if (data && data.products && Array.isArray(data.products)) {
        setProductsData(data.products)
      } else {
        console.warn('Unexpected API response format:', data)
        setProductsData([])
      }
    } catch (err) {
      console.error('Products fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Bitta mahsulot haqida to'liq ma'lumot olish
  const fetchProductDetail = async (productId) => {
    try {
      setDetailLoading(true)
      
      // Hozirgi tilni olish
      const currentLang = i18n.language || 'en'
      
      const response = await fetch(`${API_BASE_URL}/${currentLang}/products/get/${productId}`, {
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
      setProductDetail(data)
    } catch (err) {
      console.error('Product detail fetch error:', err)
      setProductDetail(null)
    } finally {
      setDetailLoading(false)
    }
  }

  // View Details bosilganda
  const handleViewDetails = async (product) => {
    setSelectedProduct(product)
    setModalOpen(true)
    await fetchProductDetail(product.id)
  }

  // Modal ni yopish
  const closeModal = () => {
    setModalOpen(false)
    setSelectedProduct(null)
    setProductDetail(null)
  }

  // Price ni formatlash
  const formatPrice = (price) => {
    if (!price) return t('products.priceNA')
    // String bo'lsa number ga aylantirish
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return new Intl.NumberFormat(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice)
  }

  // Rating uchun yulduzlar generatsiya qilish
  const generateRating = (index) => {
    return (4.5 + (index * 0.1)).toFixed(1)
  }

  // Til o'zgarganda va komponent yuklanganda API ni chaqirish
  useEffect(() => {
    fetchProducts()
  }, [i18n.language])

  // Mahsulotlarni formatlab berish
  const formattedProducts = useMemo(() => {
    if (!productsData || productsData.length === 0) return []

    return productsData.map((product, index) => {
      const colors = colorMapping[index % colorMapping.length]
      const category = categoryMapping[index % categoryMapping.length]
      const rating = generateRating(index)

      return {
        id: product.id,
        title: product.title || t('products.defaultTitle'),
        description: product.description || t('products.defaultDescription'),
        image: getImageUrl(product.image), // Image URL ni to'g'ri formatga keltirish
        price: product.price || 0,
        category: category,
        rating: rating,
        ...colors
      }
    })
  }, [productsData, t])

  // Loading holati
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="products">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t('products.loading')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error holati
  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="products">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">{t('products.error.warning')}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('products.error.title')}</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={fetchProducts}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('products.error.tryAgain')}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-32 overflow-hidden" id="products">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
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
              {t('products.badge')}
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {t('products.title')}
              </span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {t('products.subtitle')}
            </motion.p>
          </motion.div>

          {/* Products Grid */}
          {formattedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formattedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                        {/* Image or Placeholder */}
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                            onError={(e) => {
                              console.error('Image load error:', e.target.src)
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                            onLoad={() => {
                              console.log('Image loaded successfully:', product.image)
                            }}
                          />
                        ) : null}
                        
                        {/* Fallback Placeholder */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient} opacity-80 ${product.image ? 'hidden' : 'flex'} items-center justify-center`}>
                          <div className={`w-20 h-20 bg-gradient-to-r ${product.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                            <Eye className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        
                        {/* Overlay on hover */}
                        <div 
                          onClick={() => handleViewDetails(product)}
                          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center cursor-pointer"
                        >
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <span className="text-gray-800 font-semibold text-sm flex items-center gap-2">
                              {t('products.viewDetails')}
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`bg-gradient-to-r ${product.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                          {t(`products.categories.${product.category.toLowerCase().replace(' ', '')}`)}
                        </div>
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold text-gray-800">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {product.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Price and Action Row */}
                        <div className="flex items-center justify-between pt-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 bg-gradient-to-r ${product.gradient} rounded-full`}></div>
                              <span className="text-sm text-gray-500 font-medium">{t('products.availableNow')}</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewDetails(product)
                            }}
                            className={`p-3 bg-gradient-to-r ${product.gradient} text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110`}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl ring-1 ring-gray-200/50"
          >
            {/* Modal Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedProduct?.gradient || 'from-blue-400 to-purple-400'} opacity-5 rounded-full blur-3xl -translate-y-32 translate-x-32`}></div>
              <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr ${selectedProduct?.gradient || 'from-green-400 to-blue-400'} opacity-5 rounded-full translate-y-32 -translate-x-32`}></div>
            </div>

            <div className="relative">
              {/* Modal Header */}
              <div className={`relative p-8 bg-gradient-to-r ${selectedProduct?.gradient || 'from-blue-600 to-purple-600'} text-white overflow-hidden`}>
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg">
                      <Info className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {selectedProduct.title}
                      </h3>
                      <p className="text-white/80 font-medium">{t('products.modal.productDetails')}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 group backdrop-blur-sm"
                    aria-label={t('products.modal.close')}
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
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('products.modal.loading')}</h4>
                    <p className="text-gray-600">{t('products.modal.loadingMessage')}</p>
                  </div>
                ) : productDetail ? (
                  <div className="space-y-8">
                    {/* Product Image and Basic Info */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        {/* Product Image */}
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden relative">
                          {getImageUrl(productDetail.image) ? (
                            <img 
                              src={getImageUrl(productDetail.image)} 
                              alt={productDetail.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                console.error('Modal image load error:', e.target.src)
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                          ) : null}
                          
                          <div className={`absolute inset-0 bg-gradient-to-br ${selectedProduct?.bgGradient} opacity-80 ${getImageUrl(productDetail.image) ? 'hidden' : 'flex'} items-center justify-center`}>
                            <div className={`w-24 h-24 bg-gradient-to-r ${selectedProduct?.gradient} rounded-3xl flex items-center justify-center shadow-xl`}>
                              <Eye className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-3xl font-bold text-gray-900 mb-2">{productDetail.title}</h4>
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`px-3 py-1 bg-gradient-to-r ${selectedProduct?.gradient} text-white rounded-full text-sm font-semibold`}>
                              {t(`products.categories.${selectedProduct?.category.toLowerCase().replace(' ', '') || 'premium'}`)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-semibold text-gray-700">{selectedProduct?.rating}</span>
                            </div>
                          </div>
                          <div className="text-4xl font-bold text-gray-900 mb-4">
                            {formatPrice(productDetail.price)}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl p-6 shadow-lg border border-gray-200/50">
                          <h5 className="text-lg font-bold text-gray-900 mb-3">{t('products.modal.description')}</h5>
                          <p className="text-gray-700 leading-relaxed">
                            {productDetail.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6">😔</div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">{t('products.modal.unableToLoad')}</h4>
                    <p className="text-gray-600 text-lg mb-8">{t('products.modal.loadError')}</p>
                    <button
                      onClick={() => fetchProductDetail(selectedProduct?.id)}
                      className={`bg-gradient-to-r ${selectedProduct?.gradient || 'from-blue-600 to-purple-600'} text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium`}
                    >
                      {t('products.modal.tryAgain')}
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

export default ProductsSection