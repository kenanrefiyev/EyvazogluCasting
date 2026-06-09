import { motion } from 'framer-motion';
import { Home, Users, MessageCircle, Phone, Send } from 'lucide-react';
import type { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomNavProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export default function MobileBottomNav({
  currentRoute,
  onNavigate,
}: MobileBottomNavProps) {
  const { lang } = useLanguage();

  const labels = {
    AZ: {
      home: 'Səhifə',
      models: 'Simalar',
      contact: 'Əlaqə',
      blog: 'Blog',
      apply: 'Qeydiyyat',
    },
    RU: {
      home: 'Главная',
      models: 'База',
      contact: 'Контакты',
      blog: 'Блог',
      apply: 'Кастинг',
    },
    ENG: {
      home: 'Home',
      models: 'Talents',
      contact: 'Contact',
      blog: 'Blog',
      apply: 'Join App',
    },
  };

  const t = labels[lang] || labels.AZ;

  const navItems = [
    {
      id: 'home',
      label: t.home,
      icon: Home,
      type: 'route' as const,
      route: 'home' as PageRoute,
      isActive: currentRoute === 'home',
    },
    {
      id: 'models',
      label: t.models,
      icon: Users,
      type: 'route' as const,
      route: 'models' as PageRoute,
      isActive: currentRoute === 'models' || currentRoute === 'model-detail',
    },
    {
      id: 'contact',
      label: t.contact,
      icon: Phone,
      type: 'route' as const,
      route: 'contact' as PageRoute,
      isActive: currentRoute === 'contact',
    },
    {
      id: 'blog',
      label: t.blog,
      icon: MessageCircle,
      type: 'route' as const,
      route: 'blog' as PageRoute,
      isActive: currentRoute === 'blog',
    },
    {
      id: 'apply',
      label: t.apply,
      icon: Send,
      type: 'route' as const,
      route: 'apply' as PageRoute,
      isActive: currentRoute === 'apply',
    },
  ];

  return (
    <div className="md:hidden id-mobile-tab-bar fixed bottom-0 left-0 right-0 z-50 bg-[#070707]/95 backdrop-blur-xl border-t border-white/6 shadow-[0_-8px_30px_rgba(0,0,0,0.85)] pb-safe-bottom">
      <div id="mobile-nav-container" className="grid grid-cols-5 h-16 items-center px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;

          const content = (
            <>
              {/* Highlight active dot on top */}
              {item.isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute top-0 w-8 h-0.5 bg-gold-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon Container with state styled colors */}
              <div className="relative p-1">
                <IconComponent
                  size={19}
                  className={`transition-colors duration-300 ${
                    item.isActive
                      ? 'text-gold-500 scale-105 filter drop-shadow-[0_0_8px_rgba(212,163,89,0.4)]'
                      : 'text-neutral-500 group-hover:text-neutral-300'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                id={`tab-label-${item.id}`}
                className={`text-[9px] font-semibold tracking-wide mt-1 transition-colors duration-250 font-sans truncate max-w-full ${
                  item.isActive
                    ? 'text-gold-400'
                    : 'text-neutral-500 group-hover:text-neutral-400'
                }`}
              >
                {item.label}
              </span>
            </>
          );

          return (
            <button
              id={`tab-btn-${item.id}`}
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className="flex flex-col items-center justify-center h-full relative focus:outline-none select-none cursor-pointer group active:scale-90 transition-transform duration-100"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
