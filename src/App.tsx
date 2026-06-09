import { useState, useEffect } from 'react';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ModelsPage from './components/ModelsPage';
import ModelDetailPage from './components/ModelDetailPage';
import ApplyPage from './components/ApplyPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import BookingModal from './components/BookingModal';
import MobileBottomNav from './components/MobileBottomNav';
import type { Model, PageRoute } from './types.ts';
import { modelsData } from './data/models';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [models, setModels] = useState<Model[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingModel, setBookingModel] = useState<Model | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 55);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('aura_models');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setModels(Array.isArray(parsed) ? parsed : modelsData);
      } catch (err) {
        setModels(modelsData);
      }
    } else {
      setModels(modelsData);
    }
  }, []);

  useEffect(() => {
    const storedShortlist = localStorage.getItem('aura_shortlisted_ids');
    if (storedShortlist) {
      try {
        const parsedIds = JSON.parse(storedShortlist);
        setShortlistedIds(Array.isArray(parsedIds) ? parsedIds : []);
      } catch {
        setShortlistedIds([]);
      }
    }
  }, []);

  const currentRoute: PageRoute = location.pathname === '/about'
    ? 'about'
    : location.pathname === '/models'
      ? 'models'
      : location.pathname.startsWith('/models/')
        ? 'model-detail'
        : location.pathname === '/blog'
          ? 'blog'
          : location.pathname === '/apply'
            ? 'apply'
            : location.pathname === '/contact'
              ? 'contact'
              : 'home';

  const modelDetailMatch = location.pathname.match(/^\/models\/([^/]+)$/);
  const selectedModelId = modelDetailMatch?.[1] ?? null;
  const activeModel = models.length > 0 && selectedModelId
    ? models.find((m) => m.id === selectedModelId) ?? null
    : null;

  const handleAddModel = (newModel: Model) => {
    const updated = [newModel, ...models];
    setModels(updated);
    localStorage.setItem('aura_models', JSON.stringify(updated));
  };

  const handleToggleShortlist = (id: string) => {
    const updated = shortlistedIds.includes(id)
      ? shortlistedIds.filter((current) => current !== id)
      : [...shortlistedIds, id];

    setShortlistedIds(updated);
    localStorage.setItem('aura_shortlisted_ids', JSON.stringify(updated));
  };

 const handleNavigate = (route: PageRoute, modelId?: string) => {
  const path = route === 'home'
    ? '/'
    : route === 'about'
      ? '/about'
      : route === 'models'
        ? '/models'
        : route === 'model-detail' && modelId
          ? `/models/${modelId}`
          : route === 'blog'
            ? '/blog'
            : route === 'contact'
              ? '/contact'
              : route === 'apply'
                ? '/apply'
                : '/';

  navigate(path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleBookModel = (model: Model) => {
    setBookingModel(model);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#e5e5e5] font-sans selection:bg-gold-50c0 selection:text-black flex flex-col justify-between">
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} isScrolled={isScrolled} />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onNavigate={handleNavigate}
              />
            }
          />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
          <Route
            path="/models"
            element={
              <ModelsPage
                models={models}
                onAddModel={handleAddModel}
                onNavigate={handleNavigate}
                shortlistedIds={shortlistedIds}
                onToggleShortlist={handleToggleShortlist}
              />
            }
          />
          <Route
            path="/models/:modelId"
            element={
              models.length === 0 ? null : activeModel ? (
                <ModelDetailPage
                  model={activeModel}
                  onNavigate={handleNavigate}
                  onBook={() => handleBookModel(activeModel)}
                  shortlistedIds={shortlistedIds}
                  onToggleShortlist={handleToggleShortlist}
                />
              ) : (
                <Navigate to="/models" replace />
              )
            }
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer onNavigate={handleNavigate} />
      <MobileBottomNav currentRoute={currentRoute} onNavigate={handleNavigate} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        model={bookingModel}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}