import type { PageRoute } from '../types';
import { Sparkles, Eye, } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import aslan from  "../assets/images/AslanEyvazoglu.jpeg"

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { lang, t } = useLanguage();

  return (
    <div className="relative bg-white text-neutral-900 pt-32 pb-24 overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute left-10 top-24 select-none pointer-events-none opacity-[0.04] font-serif text-[15vw] leading-none tracking-[0.2em] uppercase text-neutral-900">
        EST. 2018
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-12 relative z-10 space-y-24">
        {/* 1. Header Hero Title */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-gold-500 uppercase">
            {lang === 'AZ' ? 'HEKAYƏMİZ VƏ DƏYƏRLƏRİMİZ' : lang === 'RU' ? 'НАША ИСТОРИЯ И ЦЕННОСТИ' : 'OUR STORY & CORE VALUES'}
          </span>
          <h1 className="text-4xl md:text-6xl text-neutral-900 font-serif leading-tight">
            {lang === 'AZ' ? (
              <>
                MODA ALƏMİNDƏ <br />
                <span className="font-serif italic font-light text-gold-400">YENİ STANDARTLAR</span> QURURUQ
              </>
            ) : lang === 'RU' ? (
              <>
                МЫ СОЗДАЕМ <br />
                <span className="font-serif italic font-light text-gold-400">НОВЫЕ СТАНДАРТЫ</span> В ИНДУСТРИИ
              </>
            ) : (
              <>
                SETTING <br />
                <span className="font-serif italic font-light text-gold-400">NEW STANDARDS</span> IN CASTING
              </>
            )}
          </h1>
          <div className="w-12 h-[1px] bg-gold-500 mx-auto mt-8" />
        </section>

        {/* 2. Agency Story (Two columns layout with stylish left vertical golden line) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 border-l border-gold-500/20 pl-6 md:pl-10">
            <h3 className="font-serif text-2xl text-neutral-900 tracking-wide">
              {t('about.story.title')}
            </h3>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-sans">
              {t('about.story.desc1')}
            </p>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-sans">
              {t('about.story.desc2')}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-neutral-900 tracking-wide">
              {t('about.why.title')}
            </h3>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-sans">
              {t('about.why.desc1')}
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 border-b border-gold-500 pb-1.5 text-xs font-semibold tracking-widest text-gold-500 hover:text-neutral-900 hover:border-neutral-900 transition-colors cursor-pointer"
              >
                {t('about.story.contactBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Image Layout (luxury editorial visual composition) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden grayscale hover:grayscale-0 duration-500 transition-all">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600"
              alt="High fashion portrait shoot"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden grayscale hover:grayscale-0 duration-500 transition-all md:-translate-y-6">
            <img
              src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600"
              alt="Runway high design"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] bg-neutral-100 border border-neutral-200 overflow-hidden grayscale hover:grayscale-0 duration-500 transition-all">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
              alt="Backstage editorial fashion"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 4. Mission & Vision */}
        <section className="bg-neutral-50 border border-neutral-200 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-radial from-gold-500/5 to-transparent rounded-full blur-2xl" />

          <div className="space-y-4">
            <div className="w-10 h-10 border border-gold-500/20 bg-gold-950/10 rounded-full flex items-center justify-center text-gold-500">
              <Sparkles size={16} />
            </div>
            <h3 className="font-serif text-xl text-neutral-900 tracking-wide">{t('about.mission.title')}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
              {t('about.mission.desc')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 border border-gold-500/20 bg-gold-950/10 rounded-full flex items-center justify-center text-gold-500">
              <Eye size={16} />
            </div>
            <h3 className="font-serif text-xl text-neutral-900 tracking-wide">{t('about.vision.title')}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
              {t('about.vision.desc')}
            </p>
          </div>
        </section>

        {/* 5. Team Section - Founder */}
        <section className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
              {lang === 'AZ' ? 'KOMANDAMIZLA TANIŞ OLUN' : lang === 'RU' ? 'НАША КОМАНДА' : 'MEET OUR TEAM'}
            </span>
            <h2 className="text-3xl md:text-4xl text-neutral-900 font-serif tracking-wide uppercase">
              {lang === 'AZ' ? 'REZYUT RƏHBƏRi' : lang === 'RU' ? 'РУКОВОДСТВО ПО РЕЗУЛЬТАТАМ' : 'PROFESSIONAL DIRECTOR'}
            </h2>
            <div className="w-12 h-[1px] bg-gold-500 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Aslan Image */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="w-full max-w-sm group">
                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden border-2 border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                  <img
                    src={aslan}
                    alt="Aslan Eyvazoğlu"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Decorative line under image */}
                <div className="h-[1px] bg-gradient-to-r from-gold-500 via-gold-500 to-transparent mt-6" />
              </div>
            </div>

            {/* Biography */}
            <div className="md:col-span-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-gold-500" />
                  <h3 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-wide">
                    Aslan Eyvazoğlu
                  </h3>
                </div>
                <p className="text-gold-500 text-xs font-mono tracking-[0.3em] uppercase">
                  {lang === 'AZ' ? 'Təsisçi & Casting Direktoru' : lang === 'RU' ? 'Основатель & Кастинг-директор' : 'Founder & Casting Director'}
                </p>
              </div>

              <div className="space-y-6 border-l-2 border-gold-500/30 pl-8 py-4">
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-sans font-light">
                  Eyvazoğlu Casting MMC-nin təsisçisi Aslan Eyvazoğlu Baki Şəhərində 1991-10-02 Tarixində Anadan Olmuşdur. Əslən Qərbi Azərbaycanlidir.
                </p>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-sans font-light">
                  Təhsilini 13 Sayli Orta Məktəbdə Bitirmişdir. Ali Təhsilini isə Naxcivan Dovlət Universiteti Umumi İqtisadiyyat Biznesin Təşkili Fakultəsində Bitirmişdir.
                </p>
              </div>

              {/* Stats or highlights */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <p className="text-2xl font-serif text-gold-500">2018</p>
                  <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
                    {lang === 'AZ' ? 'Təsis Ili' : lang === 'RU' ? 'Год основания' : 'Founded'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-serif text-gold-500">Baki</p>
                  <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
                    {lang === 'AZ' ? 'Mərkəz' : lang === 'RU' ? 'Центр' : 'Headquarters'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}