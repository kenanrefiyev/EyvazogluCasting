import  { useState } from 'react';
import type { PageRoute } from '../types';
import { ArrowRight, Play, X, ExternalLink, Film } from 'lucide-react';
import { clientLogos, agencyStats } from '../data/models';
import { useLanguage } from '../context/LanguageContext';
import { translatePartnerDesc } from '../data/translations';
// @ts-ignore
import aslanPhoto from '../assets/images/AslanEyvazoglu.jpeg';
import signature from '../assets/images/signature.png';
interface HomePageProps {
  onNavigate: (route: PageRoute, modelId?: string) => void;
}

const IMG1 = 'https://mediaslide-europe.storage.googleapis.com/modelagentgroup/news_pictures/2025/05/large-1746730635-050a15df37e077c287eb66f3095a0d62.jpg';
const IMG2 = 'https://mediaslide-europe.storage.googleapis.com/modelagentgroup/news_pictures/2025/05/large-1746736206-9d2d58027b7c0156c7df688f3dfdbd3c.jpg';
const IMG3 = 'https://mediaslide-europe.storage.googleapis.com/modelagentgroup/news_pictures/2025/05/large-1746731795-6be5562ddfe19b4fae87363b8353fdb8.jpg';
const IMG4 = 'https://mediaslide-europe.storage.googleapis.com/modelagentgroup/news_pictures/2025/05/large-1746731876-0f03d462a76d7061c1222df026f29269.jpg';
const IMG5 = 'https://mediaslide-europe.storage.googleapis.com/modelagentgroup/news_pictures/2025/05/large-1746731403-16db4dbf1846201ee3801378268c53f3.jpg';

const CAROUSEL_IMAGES = [IMG3, IMG1, IMG2, IMG4, IMG5];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [activeVideoPartner, setActiveVideoPartner] = useState<typeof clientLogos[0] | null>(null);
  const [centerIndex, setCenterIndex] = useState(1);
  const { lang, t } = useLanguage();

  const getOrderedImages = () => {
    const total = CAROUSEL_IMAGES.length;
    const left = (centerIndex - 1 + total) % total;
    const right = (centerIndex + 1) % total;
    return [left, centerIndex, right];
  };

  const [leftIdx, centerIdx, rightIdx] = getOrderedImages();

  return (
    <div className="bg-white text-neutral-800 selection:bg-[#b50e5f] selection:text-white">

      {/* 1. Editorial 3-Image Carousel */}
      <section className="bg-white pt-[32vh] md:pt-[36vh] pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-center gap-4 md:gap-8">

            <div
              className="relative shrink-0 w-[28%] md:w-[26%] mt-16 cursor-pointer group"
              onClick={() => setCenterIndex(leftIdx)}
            >
              <div className="overflow-hidden aspect-[2/3] bg-neutral-100">
                <img
                  src={CAROUSEL_IMAGES[leftIdx]}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                />
              </div>
            </div>

            <div
              className="relative shrink-0 w-[38%] md:w-[36%] cursor-pointer group z-10 transition-all duration-500"
              onClick={() => onNavigate('models')}
            >
              <div className="overflow-hidden aspect-[2/3.2] bg-neutral-100">
                <img
                  src={CAROUSEL_IMAGES[centerIdx]}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div
              className="relative shrink-0 w-[28%] md:w-[26%] mt-16 cursor-pointer group"
              onClick={() => setCenterIndex(rightIdx)}
            >
              <div className="overflow-hidden aspect-[2/3] bg-neutral-100">
                <img
                  src={CAROUSEL_IMAGES[rightIdx]}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-center gap-2 mt-8">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCenterIndex(i)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  i === centerIndex
                    ? 'w-6 h-1.5 bg-[#b50e5f]'
                    : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT Section */}
      <section className="bg-white py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          <div className="lg:col-span-4 space-y-1">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#b50e5f] uppercase block font-semibold">
              EST. 2017
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-[0.03em] text-neutral-900 uppercase font-light">
              {t('nav.about')}
            </h2>
            <div className="w-16 h-[1px] bg-[#b50e5f] mt-4" />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className="text-xl md:text-2xl font-serif text-neutral-800 leading-normal font-light italic">
              {lang === 'AZ'
                ? 'Eyvazoğlu Casting MMC 5 ildən artıqdır ki, peşəkar kasting bazası, təcrübəli heyətimiz və etibarlı tərəfdaşlığımız ilə xidmətinizdədir.'
                : lang === 'RU'
                  ? 'Eyvazoğlu Casting LLC работает уже более 5 лет, предоставляя профессиональные услуги кастинга на самом высоком уровне.'
                  : 'Eyvazoğlu Casting LLC has been officially operating for over 5 years as a premier casting database and talent management agency.'}
            </p>

            <p className="text-sm text-neutral-500 font-sans font-light leading-relaxed">
              {lang === 'AZ'
                ? 'Model Agent Group (Eyvazoğlu) hər bir modelin və istedadın karyerasını fərdi şəkildə inkişaf etdirməyə böyük önəm verir. Portfelimiz reklam kampaniyaları, filmlər, populyar televiziya serialları və moda layihələri üçün fərqli görünüşə və xarakterə malik simaları birləşdirir. Güclü tərəfdaşlıq əlaqələrimizlə yaradıcı vizyonları canlandırırıq.'
                : lang === 'RU'
                  ? 'Model Agent Group (Eyvazoğlu) уделяет особое значение индивидуальному развитию карьеры каждого таланта. Наше портфолио объединяет уникальные лица для рекламных кампаний, фильмов, сериалов и модных проектов.'
                  : "Model Agent Group (Eyvazoğlu) elevates the importance of promoting each model's career individually. We represent models, actors, and talents in different aspects of this profession such as editorial, advertising, commercial, and movie productions. We build strong communities of partners locally and worldwide."}
            </p>

            <div className="pt-6 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
              <div>
                <span className="text-[#b50e5f] block mb-1">{t('home.about.cat1label')}</span>
                <span className="text-neutral-700">{t('home.about.cat1')}</span>
              </div>
              <div>
                <span className="text-[#b50e5f] block mb-1">{t('home.about.cat2label')}</span>
                <span className="text-neutral-700">{t('home.about.cat2')}</span>
              </div>
              <div>
                <span className="text-[#b50e5f] block mb-1">{t('home.about.cat3label')}</span>
                <span className="text-neutral-700">{t('home.about.cat3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOARDS Section */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

          <div className="text-center space-y-2 mb-16">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase block">
              {t('home.boards.sub')}
            </span>
            <h2 className="text-3xl md:text-4xl text-neutral-900 font-serif uppercase tracking-wider font-light">
              {t('home.boards.title')}
            </h2>
            <div className="w-12 h-[1px] bg-[#b50e5f] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div
              onClick={() => onNavigate('models')}
              className="group relative aspect-[3/4.5] overflow-hidden cursor-pointer border border-neutral-100 bg-neutral-50"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                alt="Women Board"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-1">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#b50e5f] block uppercase font-bold">HİSSƏ 01</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wider font-light">{t('home.boards.section1')}</h3>
              </div>
            </div>

            <div
              onClick={() => onNavigate('models')}
              className="group relative aspect-[3/4.5] overflow-hidden cursor-pointer border border-neutral-100 bg-neutral-50"
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600"
                alt="Men Board"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-1">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#b50e5f] block uppercase font-bold">HİSSƏ 02</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wider font-light">{t('home.boards.section2')}</h3>
              </div>
            </div>

            <div
              onClick={() => onNavigate('models')}
              className="group relative aspect-[3/4.5] overflow-hidden cursor-pointer border border-neutral-100 bg-neutral-50"
            >
              <img
                src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600"
                alt="Kids Board"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-1">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#b50e5f] block uppercase font-bold">HİSSƏ 03</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wider font-light">{t('home.boards.section3')}</h3>
              </div>
            </div>

            <div
              onClick={() => onNavigate('models')}
              className="group relative aspect-[3/4.5] overflow-hidden cursor-pointer border border-neutral-100 bg-neutral-50"
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
                alt="Actors Board"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-1">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#b50e5f] block uppercase font-bold">HİSSƏ 04</span>
                <h3 className="text-2xl font-serif text-white uppercase tracking-wider font-light">{t('home.boards.section4')}</h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. GET SCOUTED Section */}
      <section className="py-28 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center space-y-6">
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#b50e5f] uppercase block font-semibold">
            {t('home.scout.sub')}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-wide text-neutral-900 leading-tight font-extralight">
            {t('home.scout.title')}
          </h2>
          <p className="text-neutral-500 font-sans text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            {lang === 'AZ'
              ? 'Əgər siz də peşəkar kasting və model biznesində karyera qurmaq, beynəlxalq brendlərin siması olmaq istəyirsinizsə - bu sizin şansınızdır!'
              : lang === 'RU'
                ? 'Если вы мечтаете построить профессиональную карьеру в кастинге или модельном бизнесе — это ваш шанс!'
                : 'If you dream about becoming a professional in model and casting business – this is your chance! Apply to join our model database today.'}
          </p>
          <div className="pt-6">
            <button
              onClick={() => onNavigate('apply')}
              className="bg-neutral-900 hover:bg-[#b50e5f] text-white py-4 px-10 text-[10px] font-semibold uppercase tracking-[0.25em] transition-all cursor-pointer focus:outline-none inline-flex items-center gap-2 shadow-md"
            >
              {t('apply.header.sub')}
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Client Projects Section */}
      <section className="bg-white py-24 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 space-y-12">

          <div className="text-center space-y-2">
            <span className="text-[9px] font-mono tracking-[0.35em] text-[#b50e5f] uppercase block font-semibold">
              {t('home.collab.sub')}
            </span>
            <h2 className="text-3xl font-serif uppercase tracking-wider font-light text-neutral-900">
              {lang === 'AZ' ? 'RƏSMİ LAYİHƏLƏRİMİZ' : lang === 'RU' ? 'НАШИ ПРОЕКТЫ' : 'OUR PROJECTS'}
            </h2>
            <div className="w-10 h-[1px] bg-[#b50e5f]/50 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientLogos.map((partner) => {
              const { desc, category } = translatePartnerDesc(partner.id, partner.desc, partner.category, lang);
              return (
                <div
                  key={partner.id}
                  onClick={() => partner.videoUrl && setActiveVideoPartner(partner)}
                  className={`group relative border border-neutral-200/60 p-8 bg-neutral-50 hover:bg-neutral-100/50 transition-all duration-300 flex flex-col justify-between ${
                    partner.videoUrl ? 'cursor-pointer hover:border-[#b50e5f]/40' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
                      <span>{category}</span>
                      <span className="text-[#b50e5f] font-bold">{partner.stats}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg text-neutral-900 group-hover:text-[#b50e5f] transition-colors">
                          {partner.name}
                        </h3>
                        {partner.videoUrl && (
                          <span className="w-4 h-4 rounded-full border border-[#b50e5f]/30 text-[#b50e5f] flex items-center justify-center">
                            <Play size={6} fill="currentColor" className="ml-0.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-500 text-xs font-sans leading-relaxed font-light">{desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-neutral-200/50 flex items-center justify-between text-neutral-500 font-mono text-[9px] tracking-wider">
                    <span className="font-semibold text-neutral-600">{partner.logoText}</span>
                    {partner.videoUrl && (
                      <span className="text-[#b50e5f] uppercase text-[8px] flex items-center gap-1 font-bold">
                        <Film size={10} /> {lang === 'AZ' ? 'İZLƏ' : lang === 'RU' ? 'СМОТРЕТЬ' : 'WATCH'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Video Modal */}
          {activeVideoPartner && activeVideoPartner.videoUrl && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
              onClick={() => setActiveVideoPartner(null)}
            >
              <div
                className="relative w-full max-w-sm sm:max-w-md bg-[#050505] border border-white/[0.08] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
                  <h3 className="font-serif text-sm uppercase text-white tracking-wider">
                    {activeVideoPartner.name}
                  </h3>
                  <button onClick={() => setActiveVideoPartner(null)} className="p-1.5 text-neutral-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                <div className="relative aspect-[9/16] max-h-[70vh] w-full bg-black">
                  <iframe
                    src={`${activeVideoPartner.videoUrl.endsWith('/') ? activeVideoPartner.videoUrl : activeVideoPartner.videoUrl + '/'}embed/`}
                    className="absolute inset-0 w-full h-full border-0"
                    scrolling="no"
                    allowTransparency
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`${activeVideoPartner.name} video`}
                  />
                </div>
                <div className="p-4 border-t border-white/[0.05] bg-neutral-950 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                  <span className="uppercase tracking-widest">
                    {lang === 'AZ' ? 'REKLAM KLİPİ' : lang === 'RU' ? 'РЕКЛАМНЫЙ КЛИП' : 'COMMERCIAL REEL'}
                  </span>
                  <a
                    href={activeVideoPartner.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest font-bold"
                  >
                    TikTok / Instagram <ExternalLink size={9} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Agency Stats */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-serif text-neutral-900 tracking-widest font-extralight">
              {agencyStats.years}+
            </h3>
            <p className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              {t('stats.experience')}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-serif text-[#b50e5f] tracking-widest font-bold">
              {agencyStats.activeModels}
            </h3>
            <p className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">
              {t('stats.models')}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-serif text-neutral-900 tracking-widest font-extralight">
              {agencyStats.brandsWorked}+
            </h3>
            <p className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              {t('stats.brands')}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-serif text-[#b50e5f] tracking-widest font-bold">
              {agencyStats.successRate}%
            </h3>
            <p className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">
              {lang === 'AZ' ? 'Uğurlu Layihələr' : lang === 'RU' ? 'Успешность проектов' : 'Success Rate'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. Director Signature Card */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-neutral-200 bg-neutral-50 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b50e5f]/15 to-transparent" />

            <div className="relative shrink-0">
              <div className="absolute inset-0 border border-[#b50e5f]/20 -m-2 pointer-events-none" />
              <div className="w-28 h-36 md:w-32 md:h-40 overflow-hidden border border-neutral-200 relative bg-neutral-100">
                <img
                  src={aslanPhoto}
                  alt="Aslan Eyvazoğlu"
                  className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-[#b50e5f] text-white text-[7px] font-mono font-bold uppercase tracking-[0.2em] px-1.5 py-0.5 whitespace-nowrap">
                  {lang === 'AZ' ? 'MMC DİREKTOR' : lang === 'RU' ? 'ДИРЕКТОР ООО' : 'LLC DIRECTOR'}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#b50e5f] uppercase font-bold">
                  {lang === 'AZ' ? 'KASTİNQ REJİSSORU' : lang === 'RU' ? 'КАСТИНГ-ДИРЕКТОР' : 'CASTING DIRECTOR'}
                </span>
                <h4 className="font-serif text-neutral-900 text-2xl tracking-wider font-light">Aslan Eyvazoğlu</h4>
              </div>

              <div className="relative pt-1">
                <img
                  src={signature}
                  alt="Signature"
                  className="w-40 h-auto object-contain invert"
                />
              </div>

              <div className="font-serif italic text-neutral-500 text-xs tracking-wide">
                {lang === 'AZ'
                  ? 'Hörmətlə və səmimiyyətlə Sizin Kasting Agentliyiniz.'
                  : lang === 'RU'
                    ? 'С уважением, Ваше кастинг-агентство.'
                    : 'With respect and sincerity, Your Casting Agency.'}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}