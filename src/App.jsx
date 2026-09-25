import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import CartPage from './pages/CartPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'

// Al cambiar de página, volvemos al inicio del scroll
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App
