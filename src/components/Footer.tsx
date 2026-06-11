import type { PageRoute } from '../types';
import { Mail, Phone, MapPin, Award, ArrowUp } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/images/mainlogo.png'
interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { lang, t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-neutral-200 pt-20 pb-10 text-neutral-600 relative overflow-hidden">
      {/* Editorial Decorative Background Text */}
      <div className="absolute right-0 bottom-10 select-none pointer-events-none opacity-[0.015] font-serif text-[12vw] leading-none tracking-[0.2em] uppercase text-right text-neutral-900">
        EYVAZOĞLU
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Editorial Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center cursor-pointer focus:outline-none" onClick={() => handleNavClick('home')}>
              <img src={logo} alt="Eyvazoglu Casting" className="h-11 hover:scale-[1.02] active:scale-95 duration-300" />
            </div>
            <p className="text-xs leading-relaxed text-neutral-500 max-w-sm">
              {t('footer.desc')}
            </p>
            {/* Social Media Links (Highly prominent, larger, and eye-catching) */}
            <div className="flex items-center gap-5 pt-4 pb-2">
              <a
                href="https://www.instagram.com/eyvazoglucastingmmc/"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] hover:scale-110 hover:shadow-[0_0_25px_rgba(225,48,108,0.3)] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
                title="Instagram"
              >
                <FaInstagram size={24} className="transition-transform duration-300" />
              </a>
              <a
                href="https://www.facebook.com/aslan.memmedeliyev"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110 hover:shadow-[0_0_25px_rgba(24,119,242,0.3)] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
                title="Facebook"
              >
                <FaFacebook size={24} className="transition-transform duration-300 animate-fade-in" />
              </a>
              <a
                href="https://www.youtube.com/@EyvazogluCastingMMC"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] hover:scale-110 hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
                title="YouTube"
              >
                <FaYoutube size={24} className="transition-transform duration-300" />
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-neutral-500 pt-2">
              <Award size={11} className="text-[#b50e5f]" /> {t('footer.title')}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-neutral-900 mb-6 font-semibold">
              {lang === 'AZ' ? 'MENYULAR' : lang === 'RU' ? 'МЕНЮ' : 'MENUS'}
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-neutral-500 hover:text-[#b50e5f] transition-colors uppercase tracking-widest cursor-pointer text-left"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('models')}
                  className="text-neutral-500 hover:text-[#b50e5f] transition-colors uppercase tracking-widest cursor-pointer text-left"
                >
                  {t('nav.models')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-neutral-500 hover:text-[#b50e5f] transition-colors uppercase tracking-widest cursor-pointer text-left"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('blog')}
                  className="text-neutral-500 hover:text-[#b50e5f] transition-colors uppercase tracking-widest cursor-pointer text-left"
                >
                  {t('nav.blog')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('apply')}
                  className="text-neutral-500 hover:text-[#b50e5f] transition-colors uppercase tracking-widest cursor-pointer text-left"
                >
                  {t('nav.apply')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-neutral-500 hover:text-[#b50e5f] transition-colors uppercase tracking-widest cursor-pointer text-left"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-neutral-900 mb-6 font-semibold">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start space-x-3 text-neutral-500">
                <MapPin size={14} className="text-[#b50e5f] shrink-0 mt-0.5" />
                <span>
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-500">
                <Phone size={14} className="text-[#b50e5f] shrink-0" />
                <a href="tel:+994554191902" className="hover:text-[#b50e5f] transition-colors">
                  994 55 419 19 02
                </a>
              </li>
              <li className="flex items-center space-x-3 text-neutral-500">
                <Mail size={14} className="text-[#b50e5f] shrink-0" />
                <a href="mailto:eyvazoglucastingmmc2022@gmail.com" className="hover:text-[#b50e5f] transition-colors">
                  eyvazoglucastingmmc2022@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Submission */}
          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-neutral-900 mb-6 font-semibold">
              {lang === 'AZ' ? 'XƏBƏR BÜLLETENİ' : lang === 'RU' ? 'ПОДПИСКА' : 'NEWSLETTER'}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              {t('blog.newsletter.desc')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={t('blog.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#b50e5f] focus:ring-1 focus:ring-[#b50e5f]/25 transition-all font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-neutral-950 hover:bg-[#b50e5f] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 transition-colors cursor-pointer rounded-sm"
                >
                  {t('blog.newsletter.btn')}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-[#b50e5f] tracking-wider font-mono uppercase font-semibold">
                  {t('blog.newsletter.success')}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Separator and Fine Print */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-[11px] font-mono tracking-wider space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <span>© {new Date().getFullYear()} EYVAZOĞLU CASTING. {t('footer.rights')}</span>
            <div className="flex space-x-4">
              <span className="hover:text-neutral-800 cursor-pointer">PRIVACY POLICY</span>
              <span>/</span>
              <span className="hover:text-neutral-800 cursor-pointer">TERMS OF USE</span>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-neutral-500 hover:text-[#b50e5f] transition-colors focus:outline-none cursor-pointer"
          >
            <span className="text-[9px] uppercase tracking-[0.25em]">
              {lang === 'AZ' ? 'YUXARI QAYIT' : lang === 'RU' ? 'ВВЕРХ' : 'SCROLL UP'}
            </span>
            <span className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-[#b50e5f] transition-colors">
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
