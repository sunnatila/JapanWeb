import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Play,
  Video,
  Film,
  PlayCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
  Eye,
  Sparkles
} from 'lucide-react'

const VideoComponent = () => {
  
  const { t, i18n } = useTranslation()
  const [videosData, setVideosData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // Video ikonlari uchun mapping
  const iconMapping = [Video, Film, PlayCircle]

  // Ranglar uchun mapping
  const colorMapping = [
    {
      iconColor: 'text-red-500',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50'
    },
    {
      iconColor: 'text-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      iconColor: 'text-purple-500',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      iconColor: 'text-green-500',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      iconColor: 'text-orange-500',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      iconColor: 'text-indigo-500',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50'
    }
  ]

  // Tillar uchun matnlar
  const translations = {
    en: {
      badge: 'Our Videos',
      title: 'Video Gallery',
      subtitle: 'Watch our latest videos and stay updated with our content',
      loading: 'Loading videos...',
      noVideos: 'No videos available',
      noVideosDesc: 'Currently there are no videos available. Please check back later.',
      watchNow: 'Watch now',
      external: 'External',
      videoFile: 'Video File',
      notSupported: 'Your browser does not support video playback',
      unavailable: 'Video unavailable',
      errorTitle: 'Error occurred',
      tryAgain: 'Try again',
      close: 'Close',
      loadingDesc: 'Videos are being loaded...'
    },
    ru: {
      badge: 'Наши Видео',
      title: 'Видео Галерея',
      subtitle: 'Смотрите наши последние видео и будьте в курсе наших новостей',
      loading: 'Загрузка видео...',
      noVideos: 'Видео недоступны',
      noVideosDesc: 'В настоящее время видео недоступны. Пожалуйста, проверьте позже.',
      watchNow: 'Смотреть',
      external: 'Внешнее',
      videoFile: 'Видео файл',
      notSupported: 'Ваш браузер не поддерживает воспроизведение видео',
      unavailable: 'Видео недоступно',
      errorTitle: 'Произошла ошибка',
      tryAgain: 'Повторить',
      close: 'Закрыть',
      loadingDesc: 'Видео загружаются...'
    },
    ja: {
      badge: '私たちのビデオ',
      title: 'ビデオギャラリー',
      subtitle: '最新のビデオをご覧いただき、コンテンツの最新情報をお受け取りください',
      loading: 'ビデオを読み込み中...',
      noVideos: 'ビデオがありません',
      noVideosDesc: '現在利用可能なビデオがありません。後でもう一度確認してください。',
      watchNow: '今見る',
      external: '外部',
      videoFile: 'ビデオファイル',
      notSupported: 'お使いのブラウザはビデオ再生をサポートしていません',
      unavailable: 'ビデオが利用できません',
      errorTitle: 'エラーが発生しました',
      tryAgain: 'もう一度試す',
      close: '閉じる',
      loadingDesc: 'ビデオが読み込まれています...'
    }
  }

  // Hozirgi til uchun matnni olish
  const getText = (key) => {
    const currentLang = i18n?.language || 'en'
    return translations[currentLang]?.[key] || translations.en[key] || key
  }

  // YouTube URL dan video ID olish
  const getYouTubeVideoId = (url) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }


  
  // Video embed URL yaratish
  const getEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null
  }


      const getCurrentLang = () => {
    const currentLang = i18n.language
    return ['en', 'ru', 'ja'].includes(currentLang) ? currentLang : 'en'
  }

  // API dan videolarni olish
  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const currentLang = getCurrentLang()

      const response = await fetch(`${API_BASE_URL}/${currentLang}/videos/get/`, {
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
      
      if (data && Array.isArray(data) && data.length > 0) {
        setVideosData(data)
      } else {
        // Videolar mavjud bo'lmasa bo'sh array
        setVideosData([])
      }
    } catch (err) {
      console.error('Videos fetch error:', err)
      setError(err.message)
      setVideosData([])
    } finally {
      setLoading(false)
    }
  }

  // Komponent yuklanganda API ni chaqirish
  useEffect(() => {
    fetchVideos()
  }, [i18n?.language])

  // Videoni formatlab berish
  const currentVideo = useMemo(() => {
    if (!videosData || videosData.length === 0) return null

    const video = videosData[0] // Birinchi videoni olish
    const colors = colorMapping[0] // Birinchi rangni ishlatish
    const IconComponent = iconMapping[0] // Birinchi ikonni ishlatish

    // Faqat video_url bilan ishlash
    const hasVideoUrl = video.video_url && video.video_url !== null && video.video_url.trim() !== ''
    
    if (!hasVideoUrl) {
      return null // Agar video_url yo'q bo'lsa, hech narsa qaytarmaslik
    }

    const isYouTube = video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be')
    let embedUrl = null
    let videoSource = video.video_url
    let videoType = 'url'

    if (isYouTube) {
      embedUrl = getEmbedUrl(video.video_url)
      videoType = 'youtube'
    }

    console.log('Video data:', {
      hasVideoUrl,
      videoSource,
      embedUrl,
      isYouTube,
      videoType,
      originalUrl: video.video_url
    })

    return {
      id: video.id,
      title: video.title || 'Video Title',
      videoSource,
      isYouTube,
      embedUrl,
      videoType,
      icon: IconComponent,
      ...colors
    }
  }, [videosData])

  // Loading holati
  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-32 overflow-hidden" id="videos">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="relative mb-6">
                <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{getText('loading')}</h3>
              <p className="text-gray-600">{getText('loadingDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error holati
  if (error) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-32 overflow-hidden" id="videos">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{getText('errorTitle')}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
              <button 
                onClick={fetchVideos}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                {getText('tryAgain')}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-32 overflow-hidden" id="videos">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="w-5 h-5" />
            {getText('badge')}
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
              {getText('title')}
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {getText('subtitle')}
          </motion.p>
        </motion.div>

        {/* Video Content or No Videos Message */}
        {currentVideo ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="max-w-5xl w-full">
              {/* Video Player */}
              <div className="relative">
                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative">
                  {currentVideo.isYouTube && currentVideo.embedUrl ? (
                    <iframe
                      src={currentVideo.embedUrl}
                      title={currentVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : currentVideo.videoSource ? (
                    <video
                      src={currentVideo.videoSource}
                      controls
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Video playback error:', e)
                      }}
                    >
                      <p className="text-white p-4">{getText('notSupported')}</p>
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-medium mb-2">{getText('unavailable')}</p>
                        <p className="text-gray-400">Video manbasi topilmadi</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Decorative gradient border */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${currentVideo.gradient} rounded-3xl opacity-20 blur-xl -z-10`}></div>
              </div>

              {/* Video Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  {currentVideo.title}
                </h3>
                
                <div className="flex items-center justify-center gap-8 text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${currentVideo.bgGradient}`}>
                      <currentVideo.icon className={`w-5 h-5 ${currentVideo.iconColor}`} />
                    </div>
                    <span className="font-medium">
                      {currentVideo.videoType === 'youtube' ? 'YouTube Video' : 'Video Link'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                      <ExternalLink className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="font-medium">{getText('external')}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                      <Eye className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="font-medium">{getText('watchNow')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* No Videos Available Message */
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-8xl mb-8">🎬</div>
              <h3 className="text-4xl font-bold text-gray-800 mb-6">
                {getText('noVideos')}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {getText('noVideosDesc')}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoComponent