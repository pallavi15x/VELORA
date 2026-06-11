import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/Product';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import Queries from './pages/Queries';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 20);
    return () => clearTimeout(t);
  }, [pathname, search]);
  return null;
}

function AppInner() {
  const { theme } = useApp();
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem('velora-intro') === 'done');
  const [introExit, setIntroExit] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!introDone) {
      const timer = setTimeout(() => {
        setIntroExit(true);
        setTimeout(() => {
          setIntroDone(true);
          sessionStorage.setItem('velora-intro', 'done');
        }, 900);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [introDone]);

  const letters = 'VELORA'.split('');

  return (
    <>
      {!introDone && (
        <div className={`intro-screen${introExit ? ' exit' : ''}`}>
          {/* A clean, minimal wrapper for the logo */}
          <div className="intro-logo">
            {letters.map((l, i) => {
              if (l === 'O') {
                return (
                  <span key={i} className="intro-letter letter-o" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Advanced 3D Gimbal Rings */}
                    <span className="o-gimbal gimbal-1" />
                    <span className="o-gimbal gimbal-2" />
                    <span className="o-gimbal gimbal-3" />
                    <span className="letter-o-inner">O</span>
                  </span>
                );
              }
              return (
                <span key={i} className={`intro-letter letter-${l.toLowerCase()}`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="letter-glare" />
                  {l}
                </span>
              );
            })}
          </div>

          <div className="intro-line">
            <span className="intro-line-glow" />
          </div>
          <div className="intro-tagline">Discover Fashion That Defines You</div>
        </div>
      )}
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/queries" element={<Queries />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </HashRouter>
  );
}
