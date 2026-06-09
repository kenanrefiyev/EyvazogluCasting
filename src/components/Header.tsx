import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import type { PageRoute } from '../types';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/images/mainlogo.png';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, modelId?: string) => void;
  isScrolled: boolean;
}

export default function Header({ currentRoute, onNavigate, isScrolled }: HeaderProps) {
  const { lang: currentLang, setLang: setCurrentLang, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = currentRoute === 'home';
  const isOverDarkBackground = isHome && !isScrolled;

  const navItems: { label: string; route: PageRoute }[] = [
    { label: t('nav.home') || 'HOME', route: 'home' },
    { label: t('nav.models') || 'MODELS', route: 'models' },
    { label: t('nav.about') || 'ABOUT', route: 'about' },
    { label: t('nav.blog') || 'BLOG', route: 'blog' },
    { label: t('nav.contact') || 'CONTACT', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/50 py-3 shadow-sm text-neutral-900'
            : isHome
              ? 'bg-transparent py-5 border-b border-transparent text-white'
              : 'bg-white border-b border-neutral-100 py-4 text-neutral-900'
        }`}
        id="main-app-header"
      >
        <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between relative h-12 md:h-14">

          {/* Logo — sticky / non-home */}
          <div className="flex items-center min-w-[160px]">
            {(!isHome || isScrolled) && (
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center cursor-pointer focus:outline-none group active:scale-95 transition-transform"
                id="header-logo-button-sticky"
              >
                <motion.img
                  layoutId="agency-logo"
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  src={logo}
                  alt="Eyvazoğlu Casting Logo"
                  className="h-10 sm:h-12 object-contain"
                />
              </button>
            )}
          </div>

          {/* Centered Large Logo — home, not scrolled */}
          {isHome && !isScrolled && (
            <div className="absolute top-[10vh] sm:top-[11vh] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center justify-center pointer-events-auto">
              <button
                onClick={() => handleNavClick('home')}
                className="flex flex-col items-center cursor-pointer focus:outline-none"
                id="header-logo-button-center"
              >
                <motion.img
                  layoutId="agency-logo"
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1.7 }}
                  transition={{
                    opacity: { duration: 1 },
                    scale: { type: 'spring', stiffness: 80, damping: 18 },
                    layout: { type: 'spring', stiffness: 100, damping: 20 },
                  }}
                  src={logo}
                  alt="Eyvazoğlu Casting Logo"
                  className="h-12 sm:h-14 object-contain"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.65 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-[8px] sm:text-[9.5px] font-mono tracking-[0.4em] text-white uppercase mt-5 text-center whitespace-nowrap"
                >
                  {currentLang === 'AZ'
                    ? 'PEŞƏKAR MODEL AGENTLİYİ'
                    : currentLang === 'RU'
                    ? 'ПРОФЕССИОНАЛЬНОЕ МОДЕЛЬНОЕ АГЕНТСТВО'
                    : 'PRESTIGIOUS MODEL DIRECTORY'}
                </motion.p>
              </button>
            </div>
          )}

          {/* Desktop Nav */}
          <motion.nav
            layout="position"
            className={`hidden md:flex items-center transition-all duration-700 ${
              isHome && !isScrolled
                ? 'absolute top-[24vh] left-1/2 -translate-x-1/2 space-x-16 justify-center'
                : 'space-x-12'
            }`}
            id="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className="relative text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium transition-colors hover:text-[#b50e5f] cursor-pointer focus:outline-none py-2"
                  style={{ color: isActive ? '#b50e5f' : isOverDarkBackground ? '#6b6b6b' : '#4b5563' }}
                  id={`nav-item-${item.route}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#b50e5f]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.nav>

          {/* Right side: Lang + Mobile hamburger */}
          <div
            className={`flex items-center space-x-3 ${
              isHome && !isScrolled ? 'absolute top-0 right-0 pt-1.5' : ''
            }`}
          >
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 border px-4 py-2 text-[11px] font-mono tracking-widest transition-all cursor-pointer focus:outline-none rounded-none ${
                  isOverDarkBackground
                    ? 'border-white/10 bg-white/5 text-[#6b6b6b] hover:text-[#a3a3a3] hover:border-white/20 hover:bg-white/8'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:text-black hover:border-neutral-400 shadow-sm'
                }`}
                id="lang-select-button"
              >
                <Globe size={13} className="text-[#b50e5f]" />
                <span className="font-bold tracking-[0.2em]">{currentLang}</span>
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.12 }}
                    className={`absolute right-0 mt-2 w-28 border shadow-lg backdrop-blur-sm p-1 z-50 rounded-none ${
                      isOverDarkBackground
                        ? 'bg-[#080808] border-white/10 text-neutral-400'
                        : 'bg-white border-neutral-200 text-neutral-800'
                    }`}
                    id="lang-dropdown-menu"
                  >
                    {(['AZ', 'RU', 'ENG'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left font-mono text-[11px] tracking-widest px-3 py-2 transition-colors cursor-pointer ${
                          currentLang === lang
                            ? 'text-[#b50e5f] font-bold'
                            : isOverDarkBackground
                            ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                            : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                        }`}
                        id={`lang-option-${lang}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger — visible only on mobile (md altında) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex md:hidden p-2 cursor-pointer focus:outline-none ${
                isOverDarkBackground
                  ? 'text-neutral-300 hover:text-white'
                  : 'text-neutral-800 hover:text-black'
              }`}
              id="mobile-menu-hamburger"
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col justify-between p-8 text-neutral-900"
            id="mobile-fullscreen-overlay"
          >
            <div className="flex items-center justify-between">
              <img src={logo} alt="Eyvazoglu Casting Logo" className="h-10 sm:h-12" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-50 rounded-full cursor-pointer focus:outline-none"
                id="mobile-menu-close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col space-y-8 my-auto pl-4">
              {navItems.map((item, idx) => {
                const isActive = currentRoute === item.route;
                return (
                  <motion.button
                    key={item.route}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => handleNavClick(item.route)}
                    className="text-left text-3xl sm:text-4xl font-serif tracking-widest uppercase focus:outline-none transition-colors"
                    style={{ color: isActive ? '#b50e5f' : '#262626' }}
                    id={`mobile-nav-item-${item.route}`}
                  >
                    <span className="font-sans text-[10px] font-mono tracking-widest text-[#b50e5f] mr-4">
                      0{idx + 1}
                    </span>
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            <div className="border-t border-neutral-200 pt-6 flex flex-col space-y-3">
              <span className="text-[9px] font-mono text-neutral-500 tracking-[0.2em]">
                EYVAZOĞLU CASTING OFFICIAL
              </span>
              <p className="text-[10px] font-sans text-neutral-600 font-light leading-relaxed">
                Port Baku Towers, Neftçilər prospekti 153, Bakı
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}