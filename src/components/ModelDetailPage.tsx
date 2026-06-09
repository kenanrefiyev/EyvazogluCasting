import { useState } from 'react';
import type { Model, PageRoute } from '../types';
import { ChevronLeft, Ruler, Award, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ModelDetailPageProps {
  model: Model;
  onNavigate: (route: PageRoute) => void;
  onBook: () => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
}

export default function ModelDetailPage({ model, onNavigate, onBook, shortlistedIds, onToggleShortlist }: ModelDetailPageProps) {
  const [activeImage, setActiveImage] = useState(model.mainImage);
  const isLiked = shortlistedIds.includes(model.id);
  const { lang, t } = useLanguage();

  const tHair = (c: string) => {
    if (lang === 'AZ') return c;
    const lower = c.toLowerCase();
    if (lower.includes('qara')) return lang === 'RU' ? 'Черный' : 'Black';
    if (lower.includes('sar')) return lang === 'RU' ? 'Светлый / Блонд' : 'Blond';
    if (lower.includes('qəhvəyi') || lower.includes('qehveyi')) return lang === 'RU' ? 'Шатен / Каштановый' : 'Brown';
    if (lower.includes('şabalıdı') || lower.includes('sabahidi')) return lang === 'RU' ? 'Каштановый' : 'Chestnut';
    return c;
  };

  const tEye = (c: string) => {
    if (lang === 'AZ') return c;
    const lower = c.toLowerCase();
    if (lower.includes('qəhvəyi') || lower.includes('qehveyi')) return lang === 'RU' ? 'Карие' : 'Brown';
    if (lower.includes('mavi') || lower.includes('göy') || lower.includes('goy')) return lang === 'RU' ? 'Голубые' : 'Blue';
    if (lower.includes('yaşıl') || lower.includes('yasil')) return lang === 'RU' ? 'Зеленые' : 'Green';
    if (lower.includes('ala')) return lang === 'RU' ? 'Серые / Разноцветные' : 'Hazel';
    return c;
  };

  const displayBio = lang === 'AZ' 
    ? model.bio 
    : lang === 'RU' 
      ? `${model.name} — профессиональный артист и талант, представленный в базе Eyvazoğlu Casting для участия в съемках фильмов, сериалов и коммерческих рекламных проектов в Баку.` 
      : `${model.name} is a professional talent featured on the Eyvazoğlu Casting database for cinematic movies, commercials, and TV series production list in Baku.`;

  return (
    <div className="pt-38 md:pt-44 pb-24 max-w-8xl mx-auto px-4 md:px-8 lg:px-12 space-y-16 bg-white text-neutral-800">
      {/* 1. Navigation back button */}
      <div>
        <button
          onClick={() => {
            onNavigate('models');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-2 text-neutral-500 hover:text-black text-xs font-semibold uppercase tracking-widest focus:outline-none cursor-pointer"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {lang === 'AZ' ? 'MODELLƏR SƏHİFƏSİNƏ QAYIT' : lang === 'RU' ? 'ВЕРНУТЬСЯ К КАТАЛОГУ' : 'BACK TO MODELS CATALOG'}
        </button>
      </div>

      {/* 2. Main Profile Display Block (Split grid: Gallery Left, Stats & Booking Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative bg-white">
        {/* Ambient Sensual/Magenta Accent Light Behind Profile */}
        <div className="absolute top-[10%] left-[5%] w-[45%] h-[50%] bg-[#b50e5f]/5 rounded-full blur-[130px] pointer-events-none select-none z-0" />

        {/* Gallery Column (md: 6 columns) */}
        <div className="md:col-span-6 space-y-4 relative z-10">
          <div className="max-h-[70vh] aspect-[4/5] min-h-[420px] bg-neutral-50 border border-neutral-200 overflow-hidden relative group/img shadow-sm">
            <img
              src={activeImage}
              alt={model.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-all duration-750 group-hover/img:scale-[1.015]"
            />
            {/* Overlay badge indicating certified status */}
            <span className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.25em] bg-neutral-900 text-white px-3 py-1.5 uppercase font-bold shadow-lg flex items-center gap-1">
              <Award size={10} /> {lang === 'AZ' ? 'Sertifikatlı Model' : lang === 'RU' ? 'Сертифицирован' : 'Certified Talent'}
            </span>
          </div>

          {/* Inline Gallery Thumbnails selector (horizontal bar with gold border on active profile) */}
          <div className="grid grid-cols-4 gap-3">
            {model.gallery.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(imgUrl)}
                className={`aspect-[4/5] overflow-hidden bg-neutral-50 border transition-all cursor-pointer focus:outline-none ${
                  activeImage === imgUrl ? 'border-[#b50e5f] scale-98 shadow-[0_0_10px_rgba(181,14,95,0.15)]' : 'border-neutral-205 hover:border-neutral-400'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${model.name} p-${index}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column (md: 5 columns) */}
        <div className="md:col-span-5 space-y-8 select-text">
          <div className="space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.25em] text-[#b50e5f] uppercase font-semibold">
                {model.category === 'actors' 
                  ? (lang === 'AZ' ? 'AKTYOR SİMASI' : lang === 'RU' ? 'ПРОФИЛЬ АКТЕРА' : 'ACTOR PROFILE') 
                  : model.category === 'models' 
                    ? (lang === 'AZ' ? 'MODEL SİMASI' : lang === 'RU' ? 'ПРОФИЛЬ МОДЕЛИ' : 'MODEL PROFILE') 
                    : model.category === 'kids' 
                      ? (lang === 'AZ' ? 'UŞAQ SİMASI' : lang === 'RU' ? 'ПРОФИЛЬ РЕБЕНКА' : 'CHILD TALENT') 
                      : (lang === 'AZ' ? 'KÜTLƏVİ SƏHNƏ' : lang === 'RU' ? 'МАССОВКА' : 'EXTRAS')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 tracking-wide uppercase">
              {model.name}
            </h1>

            <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs">
              <span>{model.location.toLowerCase().includes('bakı') || model.location.toLowerCase().includes('baku') ? (lang === 'AZ' ? 'Bakı, Azərbaycan' : lang === 'RU' ? 'Баку, Азербайджан' : 'Baku, Azerbaijan') : model.location}</span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-sans mt-4">
            {displayBio}
          </p>

          {/* Premium stats panel */}
          <div className="border-y border-neutral-200/60 py-8 bg-white">
            <div className="flex items-center gap-2 mb-6 text-neutral-900">
              <Ruler className="text-[#b50e5f]" size={16} />
              <h3 className="font-serif text-base tracking-wide uppercase">
                {lang === 'AZ' ? 'PROFESİONAL ÖLÇÜ PARAMETRLƏRİ' : lang === 'RU' ? 'ФИЗИЧЕСКИЕ ПАРАМЕТРЫ И РАЗМЕРЫ' : 'PROFESSIONAL MEASUREMENT DATA'}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 font-mono text-xs premium-stats">
              <div className="space-y-1">
                <span className="block text-[8px] uppercase text-neutral-400 tracking-[0.15em]">{lang === 'AZ' ? 'BOY' : lang === 'RU' ? 'РОСТ' : 'HEIGHT'}</span>
                <span className="text-neutral-900 text-sm font-bold">{model.height} {lang === 'RU' ? 'см' : 'cm'}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase text-neutral-400 tracking-[0.15em]">{lang === 'AZ' ? 'SİNƏ ÖLÇÜSÜ' : lang === 'RU' ? 'ОБЪЕМ ГРУДИ' : 'CHEST / BUST'}</span>
                <span className="text-neutral-900 text-sm font-bold">{model.chestOrBust} sm</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase text-neutral-400 tracking-[0.15em]">{lang === 'AZ' ? 'YAŞ' : lang === 'RU' ? 'ВОЗРАСТ' : 'AGE'}</span>
                <span className="text-neutral-900 text-sm font-bold">{model.age}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase text-neutral-400 tracking-[0.15em]">{lang === 'AZ' ? 'SAÇ RƏNGİ' : lang === 'RU' ? 'ЦВЕТ ВОЛОС' : 'HAIR COLOR'}</span>
                <span className="text-neutral-900 text-sm font-bold">{tHair(model.hairColor)}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase text-neutral-400 tracking-[0.15em]">{lang === 'AZ' ? 'GÖZ RƏNGİ' : lang === 'RU' ? 'ЦВЕТ ГЛАЗ' : 'EYE COLOR'}</span>
                <span className="text-neutral-900 text-sm font-bold">{tEye(model.eyeColor)}</span>
              </div>
            </div>

            {/* Subtly Sensual Aesthetics parameters */}
            <div className="mt-6 pt-6 border-t border-neutral-200/60 grid grid-cols-2 gap-4 font-mono text-xs bg-white">
              <div className="space-y-0.5">
                <span className="block text-[8px] uppercase text-[#b50e5f] tracking-[0.15em] font-semibold">
                  {lang === 'AZ' ? 'KAMERA SƏMİMİYYƏTİ' : lang === 'RU' ? 'ХАРИЗМА НА КАМЕРУ' : 'CAMERA CHARISMA'}
                </span>
                <span className="text-neutral-800 text-xs font-serif italic">
                  {lang === 'AZ' ? 'Yüksək (Emosional Cəsarət)' : lang === 'RU' ? 'Высокая (Эмоциональная смелость)' : 'Excellent (Emotional Courage)'}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="block text-[8px] uppercase text-[#b50e5f] tracking-[0.15em] font-semibold">
                  {lang === 'AZ' ? 'ESTETİK ÇƏKİLİŞLƏR' : lang === 'RU' ? 'ЭСТЕТИЧЕСКИЕ СЪЕМКИ' : 'AESTHETIC PORTFOLIO'}
                </span>
                <span className="text-neutral-800 text-xs font-serif italic">
                  {lang === 'AZ' ? 'İştirak Edir (Müqaviləli)' : lang === 'RU' ? 'Участвует (По договору)' : 'Available (Agreement-based)'}
                </span>
              </div>
            </div>
          </div>

          {/* Social media connections */}
          <div className="flex flex-col space-y-4 pt-4">
            <button
              onClick={onBook}
              className="w-full bg-neutral-900 hover:bg-[#b50e5f] hover:scale-[1.01] transform cursor-pointer text-white text-xs font-bold tracking-[0.2em] font-sans py-4 text-center transition-all duration-300 outline-none shadow-md rounded-sm"
            >
              {lang === 'AZ' ? 'MODELLƏ RƏSMİ SİFARİŞ / BİZİMLƏ ƏLAQƏ' : lang === 'RU' ? 'СВЯЗАТЬСЯ / ЗАБРОНИРОВАТЬ МОДЕЛЬ' : 'BOOK / CONTACT THIS TALENT'}
            </button>
          </div>

          <div className="flex gap-3 bg-neutral-55 border border-neutral-200 p-4 text-neutral-500">
            <ShieldAlert size={14} className="text-[#b50e5f] shrink-0 mt-0.5" />
            <p className="text-[10px] leading-relaxed">
              {lang === 'AZ' 
                ? '* Modellərimizin gizlilik və fiziki ölçü təhlükəsizliyi Eyvazoğlu agentliyi tərəfindən qorunur. Kasting xarici xüsusi çəkiliş müqavilələri hüquqi xidmətimiz tərəfindən rəsmiləşdirilməlidir.' 
                : lang === 'RU' 
                  ? '* Конфиденциальность и безопасность личных данных наших моделей защищены агентством Eyvazoğlu. Все контракты на съемки вне рамок нашего кастинга должны быть официально оформлены нашей юридической службой.' 
                  : '* Privacy and physical security of our models are fully guarded by Eyvazoğlu Agency. Creative shooting agreements outside of direct casting must be legally mediated by our legal service.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
