import About from './components/About'
import CarPartsSwiper from './components/CarSwiper'
import ContactSection from './components/Contact'
import FAQSection from './components/Faq'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Partners from './components/Partners'
import ProductsSection from './components/Products'
import Services from './components/Services'
import Video from './components/Video'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Video/>
      <CarPartsSwiper/>
      <About/>
      <Services/>
      <Partners/>
      <ProductsSection/>
      <FAQSection/>
      <ContactSection/>
      <Footer/>
    </div>
  )
}

export default App