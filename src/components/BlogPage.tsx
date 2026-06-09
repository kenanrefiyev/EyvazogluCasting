import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Search, ArrowLeft, X, ChevronRight, BookOpen, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogPost {
  id: string;
  title: Record<string, string>;
  category: 'casting' | 'acting' | 'kids' | 'set-life';
  categoryLabel: Record<string, string>;
  date: Record<string, string>;
  readTime: Record<string, string>;
  summary: Record<string, string>;
  content: Record<string, string[]>;
  image: string;
  author: Record<string, string>;
}

export default function BlogPage() {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'casting' | 'acting' | 'kids' | 'set-life'>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const posts: BlogPost[] = [
    {
      id: 'p1',
      title: {
        AZ: 'Eyvazoğlu Casting MMC ilə Əməkdaşlıq: Rəsmi Kastinq Bazasına Necə Qoşulmalı?',
        RU: 'Сотрудничество с Eyvazoğlu Casting: Как попасть в официальную кастинг-базу?',
        ENG: 'Partnering with Eyvazoğlu Casting: How to Join Our Official Talent Database?'
      },
      category: 'casting',
      categoryLabel: {
        AZ: 'Qeydiyyat Təlimatı',
        RU: 'Руководство регистрации',
        ENG: 'Registration Guide'
      },
      date: { AZ: '04 İyun 2026', RU: '04 июня 2026', ENG: '04 June 2026' },
      readTime: { AZ: '4 dəq', RU: '4 мин', ENG: '4 min' },
      summary: {
        AZ: 'Bizim rəsmi layihələrimizdə iştirak etmək və böyük ekranda görünmək istəyirsinizsə, bazamıza qoşulmalısınız. Eyvazoğlu Casting rəsmi qeydiyyat prosesinin bütün mərhələləri və daxili qiymətləndirmə sirləri.',
        RU: 'Если вы хотите участвовать в наших официальных проектах и появиться на большом экране, вам необходимо присоединиться к нашей базе. Все этапы регистрации и секреты отбора.',
        ENG: 'If you want to appear in our official projects and stand in front of the big screens, you should register on our database. Here is the ultimate guide to the submission process.'
      },
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
      author: {
        AZ: 'Aslan Eyvazoğlu (Kastinq Rejissoru)',
        RU: 'Аслан Эйвазоглу (Кастинг-директор)',
        ENG: 'Aslan Eyvazoglu (Casting Director)'
      },
      content: {
        AZ: [
          'Eyvazoğlu Casting MMC olaraq 5 ildən artıqdır ki, Azərbaycanda peşəkar film, serial, reklam, klip və tanıtım layihələri ilə yeni simaları, model və aktyorları bir araya gətirən rəsmi və güvənli platformayıq. Bizim çəkilişlərimizdə yer almaq, serial və filmlərimizdə rol qazanmaq üçün ilk və ən vacib addım bizim rəsmi aktyor bazamıza daxil olmaqdır.',
          'Bizə müraciət edib qeydiyyatdan keçmək tamamilə ödənişsizdir. İstənilən 5 - 85 yaş aralığında olan məsuliyyətli xanımlar və bəylər saytımızdakı müraciət formasını dolduraraq rəsmi kasting anketini tamamlaya bilərlər. Bizim daxili komandamız daxil olan müraciətləri peşəkar şəkildə analiz edərək uyğun layihələr üçün seçimlərdə canlandırılacaq rollara görə dəyərləndirir.',
          'Qeydiyyat zamanı ən çox diqqət yetirilməli olan məqamlar əlaqə nömrələri və fiziki göstəricilərdir. Boy, çəki, yaş və saç rəngi gibi parametrlərin tam dəqiq və dürüst yazılması tələb olunur. Rejissor tərəfindən müəyyən edilmiş spesifik obraz filtrlərində axtarış edilərkən məhz bu daxil etdiyiniz parametrlər əsas götürülür.',
          'Qeydiyyata əlavə olaraq, özünüz haqqında sadə bir video təqdimat hazırlayıb bizə göndərmək şanslarınızı çox yüksəldir. Müasir ekran mədəniyyətində layihə rəhbərləri aktyorun səsinin tonunu, diksiyasını və kamera qarşısındakı səmimi rahatlığını vizual olaraq əvvəlcədən duymaq istəyirlər. Siz də bu gün bizə qoşularaq böyük çəkiliş mühitinin rəsmi bir parçası olun!'
        ],
        RU: [
          'Eyvazoğlu Casting является ведущей платформой в Азербайджане, которая на протяжении более 5 лет собирает новые лица, профессиональных актеров и моделей для съемок в кино, популярных сериалах, рекламных и музыкальных клипах. Первым шагом к участию является появление в базе данных.',
          'Подача заявки и регистрация у нас абсолютно бесплатны. Ответственные мужчины и женщины в возрасте от 5 до 85 лет могут заполнить форму на нашем сайте, чтобы завершить анкету. Наша внутренняя команда анализирует каждую заявку.',
          'Особое внимание при регистрации следует уделить контактным телефонам и физическим параметрам. Данные о росте, весе, возрасте и цвете волос должны быть точными.',
          'В дополнение к анкете, подготовка простого видеовизитки значительно повышает шансы. Присоединяйтесь к нам сегодня!'
        ],
        ENG: [
          'As Eyvazoğlu Casting, we have been the official and trusted casting agency for over 5 years. We connect rising talents, background actors, top-tier models, and lead actors with international film productions, TV dramas, commercial clips, and video productions in Azerbaijan.',
          'Submitting your profile to our database is completely free of charge. Well-behaved talents aged 5 to 85 are eligible to fill out the registration form. Our team will index your parameters for casting opportunities.',
          'Honesty in your biometric metrics is extremely vital. Accurate measures of hair color, age, weight, and height are required.',
          'Additionally, preparing a short video introduction card will dramatically increase your rating. Join us today and become a registered part of the screen history!'
        ]
      }
    },
    {
      id: 'p2',
      title: {
        AZ: 'Polaroid (Snap) Nədir? Filtrsiz Və Makiyajsız Şəkillərin Kastinqdəki Həlledici Rolu',
        RU: 'Что такое полароиды (снапы)? Решающая роль снимков без фильтров и макияжа',
        ENG: 'What are Polaroids (Snaps)? The Golden Standard of Natural Acting Portfolio'
      },
      category: 'acting',
      categoryLabel: {
        AZ: 'Portfel Sirləri',
        RU: 'Секреты портфолио',
        ENG: 'Acting Portfolio'
      },
      date: { AZ: '29 May 2026', RU: '29 мая 2026', ENG: '29 May 2026' },
      readTime: { AZ: '3 dəq', RU: '3 мин', ENG: '3 min' },
      summary: {
        AZ: 'Rejissorların sizi seçməsində ən həlledici rol oynayan foto formatı — Polaroid çəkilişləridir. Polaroid şəkillərinin düzgün çəkilməsi qaydaları və beynəlxalq standartlar.',
        RU: 'Полароидные снимки — важнейший фотоформат для прохождения кастингов. Как правильно делать снапы, соответствующие международным стандартам.',
        ENG: 'The absolute deciding visual formats for global directors to evaluate cast is Polaroid snapshots. Learn how to take proper acting snaps according to global standards.'
      },
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
      author: {
        AZ: 'Aslan Eyvazoğlu (Yaradıcı Rəhbər)',
        RU: 'Аслан Эйвазоглу (Креативный директор)',
        ENG: 'Aslan Eyvazoglu (Creative Director)'
      },
      content: {
        AZ: [
          'Kastinq dünyasında ən çox qarşılaşılan xətalardan biri peşəkar şəkillər yerinə yanlış materialların göndərilməsidir. Bir çox namizəd müraciət edərkən mobil telefon filtri ilə düzəldilmiş selfilər, böyük toy-nişan məclis şəkilləri yaxud da studiyada ağır bədii effektlərlə çəkilmiş fotoları təqdim edir. Lakin peşəkar rejissora və kasting rəhbərinə lazım olan tək vacib vizual material Polaroid şəkillərdir.',
          'Polaroid — heç bir filtr, makiyaj, Photoshop düzəlişi və diqqət dağıdıcı arka fon olmadan, təbii gün işığı qarşısında çəkilən sadə, lakin dürüst şəkillərdir. Bu fotoların əsas məqsədi sizin real üz sümüklərinizin quruluşunu, göz rənginizi, saçlarınızın təbii uzunluğunu və bədən quruluşunuzu tam təbii vəziyyətdə nümayiş etdirməkdir.',
          'Snap çəkilişləri zamanı geyim olduqca minimalist və sadə olmalıdır: bədən quruluşunu örtməyən, dar oturan neytral rəngli cins şalvar və sadə qara/ağ t-shirt tövsiyə edilir. Şəkillər 6 təməl bucaq altında lentə alınır: tam qarşıdan portret, sağ profil, sol profil, sağ 3/4 bucağı, sol 3/4 bucağı və ayaqüstü tam bədən fotosu.',
          'Eyvazoğlu Casting MMC-yə təqdim etdiyiniz snapların ən geci son 3-6 ay ərzində çəkilmiş olduğuna mütləq diqqət edin. Əgər saç rənginizi dəyişmisinizsə və ya bədən çəkinizdə ciddi dəyişiklik olubsa dərhal yeni şəkilləri göndərin.'
        ],
        RU: [
          'Одна из самых распространенных ошибок в мире кастинга — отправка неподходящих визуальных материалов. Режиссерам нужны только полароиды.',
          'Полароиды или снапы — это простые, честные фотографии, сделанные при естественном освещении без макияжа, Photoshop или отвлекающего заднего фона.',
          'Одежда для снапов должна быть нейтральной. Снимки делаются с 6 ракурсов: лицо крупным планом, два профиля, три четверти и полный рост.',
          'Следите, чтобы снапшоты были сделаны в течение последних месяцев. Если вы изменили прическу или вес, обязательно обновите материалы.'
        ],
        ENG: [
          'Using filtered selfies or group family photos is the most common mistake made by new talents. Directors require Polaroid snapshots.',
          'Polaroids are raw, honest photos captured in soft natural light, without makeup, filtering, or distracting backdrops.',
          'Keep your outfit as plain as possible. Snaps include 6 angles: full face, left profile, right profile, three-quarter views, and a full-height body shot.',
          'Make sure your snapshots are updated every 3 months. Submit new snaps if you change hair or experience major physical shifts.'
        ]
      }
    },
    {
      id: 'p3',
      title: {
        AZ: 'Uşaq Aktyor və Modellər üçün Kasting Sirləri: Valideynlərin Bilməli Olduğu Mövzular',
        RU: 'Секреты кастинга для детей-актеров: Что нужно знать родителям',
        ENG: 'Acting Secrets for Child Talents & Kids: Guide for Parents'
      },
      category: 'kids',
      categoryLabel: {
        AZ: 'Uşaq Kastingləri',
        RU: 'Детские кастинги',
        ENG: 'Kids Casting'
      },
      date: { AZ: '18 May 2026', RU: '18 мая 2026', ENG: '18 May 2026' },
      readTime: { AZ: '5 dəq', RU: '5 мин', ENG: '5 min' },
      summary: {
        AZ: '5-15 yaşlı balaca istedadların yerli serial, reklam və dəb layihələrində iştirakı zamanı diqqət yetirilməsi vacib olan psixoloji və təşkilati nizam-intizam qaydaları.',
        RU: 'Организационные и психологические аспекты участия детей в возрасте от 5 до 15 лет в съемках сериалов и показов детской моды.',
        ENG: 'Psychological and behavior guidelines required for kids aged 5 to 15 when casting for national commercials, TV series, and fashion shows.'
      },
      image: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&q=80&w=800',
      author: {
        AZ: 'Aslan Eyvazoğlu (Direktor)',
        RU: 'Аслан Эйвазоглу (Директор)',
        ENG: 'Aslan Eyvazoglu (Director)'
      },
      content: {
        AZ: [
          'Uşaq modellər və uşaq aktyorlar rəsmi reklam çarxlarının və yerli bədii serialların ən parlaq, sevilən qəhrəmanlarıdır. Eyvazoğlu Casting MMC olaraq ölkəmizin ən böyük rəsmi uşaq aktyor bazalarından birinə sahibik. Lakin övladını kasting sınaqlarına gətirən valideynlər dərk etməlidir ki, bu sahə sadəcə əyləncə deyil, yüksək məsuliyyət tələb edən rəsmi iş prosesidir.',
          'Birincisi, valideynlər sərbəstlik faktoruna diqqət yetirməlidirlər. Kasting otağına sınaq çəkilişi zamanı uşağa kənardan müdaxilə etmək uşağın bütün təbii hisslərini məhv edir. Qoyun aktyor təlimçisi uşaqla tam sərbəst şəkildə ünsiyyət qursun.',
          'İkincisi, çəkiliş saatları və intizam olduqca böyük rola malikdir. Heç vaxt uşağı onun daxili istəyi olmadan zorla sınaqlara gətirməyin.',
          'Üçüncüsü, uşaqların fiziki dəyişiklikləri barədə kasting rəhbərimizə qısa zaman ərzində məlumat verilməlidir ki, çəkiliş meydançasında sürpriz yaranmasın.'
        ],
        RU: [
          'Дети на съемочной площадке — источник радости и тепла. Eyvazoğlu Casting располагает одной из крупнейших официально зарегистрированных детских баз.',
          'Родителям не стоит вмешиваться в работу режиссера во время прослушивания. Предоставьте тренерам возможность направлять процесс.',
          'Мы следим за графиком и утомляемостью детей, подстраиваясь под школьное расписание.',
          'Будьте готовы присылать обновленные данные по росту и изменению внешности у детей.'
        ],
        ENG: [
          'Child models and teenage actors are the bright sparks of modern cinema. Eyvazoğlu Casting operates the largest child registry database in the country.',
          'Respect child independence. Directing your kid in front of the camera destroys organic reactions. Let the casting coach build a natural bond.',
          'We balance shift times tightly with school assignments and rest hours. Never force acting on your kids.',
          'Quickly report physical changes like losing primary teeth, hair extensions, and sudden height jumps.'
        ]
      }
    },
    {
      id: 'p4',
      title: {
        AZ: 'Kütləvi Səhnələr (Extras) Nədir? Setdə Peşəkar Davranış və İntizam',
        RU: 'Что такое массовка (эпизоды)? Профессиональное поведение на съемочной площадке',
        ENG: 'What are Background Scenes (Extras)? Set Etiquette & Mass Group Acting Protocol'
      },
      category: 'set-life',
      categoryLabel: {
        AZ: 'Çəkiliş Həyatı',
        RU: 'Жизнь на съёмках',
        ENG: 'Set Life'
      },
      date: { AZ: '05 May 2026', RU: '05 мая 2026', ENG: '05 May 2026' },
      readTime: { AZ: '3 dəq', RU: '3 мин', ENG: '3 min' },
      summary: {
        AZ: 'Serial və filmlərdəki kütləvi səhnələrdə iştirak zamanı riayət edilməsi məcburi olan qızıl qaydalar: Call-time, geyim təlimatları və icazəsiz hərəkətlərin qarşısının alınması.',
        RU: 'Золотые правила участия в массовых сценах: время явки, дресс-код и соблюдение соглашений о конфиденциальности.',
        ENG: 'The ultimate rules for extra actors casting in group movie scenes: Call-time rules, wardrobe limits, and non-disclosure privacy agreements.'
      },
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
      author: {
        AZ: 'Aslan Eyvazoğlu (Kastinq Rejissoru)',
        RU: 'Аслан Эйвазоглу (Кастинг-директор)',
        ENG: 'Aslan Eyvazoglu (Casting Director)'
      },
      content: {
        AZ: [
          'Filmlərin və genişmiqyaslı ekran sənətlərinin rəngarəngliyini formalaşdıran ən əsas qüvvələrdən biri kütləvi səhnə iştirakçıları və epizodik aktyorlardır. Eyvazoğlu Casting komandası olaraq hər bir üzvümüzə çəkiliş meydançasında davranış etiketlərinə riayət etməyin vacibliyini öyrədirik.',
          '1. Toplaşma Vaxtı (Call-Time): Əgər kasting menecerimiz sizə toplaşma saatını 07:00 təyin edibsə, siz set nöqtəsində saat 06:45-də tam hazır durumda olmalısınız.',
          '2. Dress-code: Göndərilən geyim siyahısına hərfiyən riayət edin. Parıldayan materiallar, böyük marka loqoları olan geyimlər qadağan silsiləsinə aiddirsə, onları setə gətirməyin.',
          '3. Kameraya baxmamaq və Məxfilik Qaydaları (NDA): Çəkiliş vaxtı dərhal kameraya baxmamaq vacibdir. Çəkiliş mühitində baş rol aktyorlarını icazəsiz çəkib sosial şəbəkələrdə paylaşmaq qanuni məsuliyyət daşıyır.'
        ],
        RU: [
          'Реалистичную атмосферу любого фильма создают актеры второго плана. Мы обучаем этикету, ведь дисциплина — основа киноиндустрии.',
          '1. Время сбора (Call-Time): Если сбор назначен на 7:00, будьте готовы на месте к 6:45.',
          '2. Дресс-код: Четко следуйте инструкциям костюмеров.',
          '3. Конфиденциальность (NDA): Строго соблюдайте запрет на съемку съемочного процесса на личные телефоны.'
        ],
        ENG: [
          'Background actors form the realistic world of screen productions. Eyvazoğlu Casting is famous for its massive extras casting logistics.',
          '1. Call-Time: If your manager registers call hours as 07:00 AM, arrive at location by 06:45 AM.',
          '2. Wardrobe & Dresscode: Stick to wardrobe instructions. Do not wear heavy logotypes or neon designs.',
          '3. Privacy (NDA): Never stare direct at camera lens unless instructed. Leaks or posting actors footage can lead to legal penalties.'
        ]
      }
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => setEmail(''), 3000);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        post.title.AZ.toLowerCase().includes(term) ||
        post.title.RU.toLowerCase().includes(term) ||
        post.title.ENG.toLowerCase().includes(term) ||
        post.summary.AZ.toLowerCase().includes(term) ||
        post.summary.RU.toLowerCase().includes(term) ||
        post.summary.ENG.toLowerCase().includes(term);
      const matchesCat = selectedCategory === 'all' ? true : post.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="pt-32 pb-24 max-w-8xl mx-auto px-4 md:px-8 lg:px-12 space-y-16 bg-white text-neutral-900">

      {/* Blog Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#b50e5f] uppercase">
          {lang === 'AZ' ? 'KASTİNQ DÜNYASI MƏTBUATI' : lang === 'RU' ? 'ПРЕССА МИРА КАСТИНГА' : 'CASTING JOURNAL'}
        </span>
        <h1 className="text-4xl md:text-5xl text-neutral-900 font-serif uppercase tracking-wider">
          {lang === 'AZ' ? 'KASTİNG BLOG' : lang === 'RU' ? 'КАСТИНГ БЛОГ' : 'CASTING BLOG'}
        </h1>
        <div className="w-12 h-[1px] bg-[#b50e5f]/60 mx-auto mt-4" />
        <p className="text-neutral-600 text-xs md:text-sm font-sans max-w-lg mx-auto leading-relaxed pt-2">
          {lang === 'AZ'
            ? 'Peşəkar aktyor olmaq üçün praktiki sirlər, çəkiliş meydançasının daxili etiket qaydaları və kasting xəbərləri.'
            : lang === 'RU'
              ? 'Практические советы о том, как стать актером, правила этикета на площадке и новости кастингов.'
              : 'Practical advice on joining film sets, modeling portfolio guides, and core casting industry news.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-neutral-200 pb-8">
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
          {[
            { id: 'all', label: lang === 'AZ' ? 'Bütün Məqalələr' : lang === 'RU' ? 'Все статьи' : 'All Posts' },
            { id: 'casting', label: lang === 'AZ' ? 'Kasting Məsləhətləri' : lang === 'RU' ? 'Советы' : 'Casting Tips' },
            { id: 'acting', label: lang === 'AZ' ? 'Portfel Sirləri' : lang === 'RU' ? 'Секреты портфолио' : 'Portfolio Secrets' },
            { id: 'kids', label: lang === 'AZ' ? 'Uşaq Kastingləri' : lang === 'RU' ? 'Детский кастинг' : 'Kids Acting' },
            { id: 'set-life', label: lang === 'AZ' ? 'Çəkiliş Həyatı' : lang === 'RU' ? 'Съёмки' : 'Set Life' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 border text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer outline-none ${
                selectedCategory === cat.id
                  ? 'border-[#b50e5f] bg-[#b50e5f]/5 text-[#b50e5f] font-bold'
                  : 'border-neutral-200 bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'AZ' ? 'Məqalələrdə axtarış...' : lang === 'RU' ? 'Поиск статей...' : 'Search posts...'}
            className="w-full bg-neutral-100 border border-neutral-200 text-xs text-neutral-900 pl-10 pr-4 py-2.5 placeholder-neutral-500 focus:outline-none focus:border-[#b50e5f] font-sans transition-all"
          />
          <Search size={14} className="absolute left-3.5 top-3.5 text-neutral-500" />
        </div>
      </div>

      {/* Grid of Blog Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-neutral-200">
          <BookOpen className="mx-auto text-neutral-400 mb-4" size={32} />
          <h3 className="text-neutral-700 text-sm font-semibold tracking-wide font-mono uppercase">
            {lang === 'AZ' ? 'MƏQALƏ TAPILMADI' : lang === 'RU' ? 'СТАТЬЯ НЕ НАЙДЕНА' : 'NO POSTS FOUND'}
          </h3>
          <p className="text-neutral-500 text-xs font-sans mt-1">
            {lang === 'AZ' ? 'Daxil etdiyiniz axtarış meyarlarına uyğun yazı yoxdur.' : lang === 'RU' ? 'Совпадения отсутствуют.' : 'No entries align with the filter rules.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              className="group flex flex-col justify-between border border-neutral-200 p-4 bg-white hover:border-[#b50e5f]/30 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-100 relative">
                  <img
                    src={post.image}
                    alt={post.title[lang] || post.title.AZ}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                  />
                  <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.2em] bg-white/90 backdrop-blur-sm text-[#b50e5f] px-2.5 py-1 uppercase border border-[#b50e5f]/20">
                    {post.categoryLabel[lang] || post.categoryLabel.AZ}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-500 tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-[#b50e5f]/60" />
                    {post.date[lang] || post.date.AZ}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-[#b50e5f]/60" />
                    {post.readTime[lang] || post.readTime.AZ} {lang === 'AZ' ? 'oxu' : lang === 'RU' ? 'чтения' : 'read'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg md:text-xl text-neutral-900 group-hover:text-[#b50e5f] transition-colors leading-snug">
                    {post.title[lang] || post.title.AZ}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed font-sans line-clamp-3">
                    {post.summary[lang] || post.summary.AZ}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
                  {lang === 'AZ' ? 'Yazar' : lang === 'RU' ? 'Автор' : 'Author'}: {(post.author[lang] || post.author.AZ).split(' (')[0]}
                </span>
                <button
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] text-neutral-800 hover:text-[#b50e5f] uppercase transition-all duration-300 group/btn outline-none cursor-pointer"
                >
                  {lang === 'AZ' ? 'ƏTRAFLI OXU' : lang === 'RU' ? 'ПОДРОБНЕЕ' : 'READ MORE'}
                  <ChevronRight size={13} className="text-[#b50e5f] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="bg-neutral-50 border border-neutral-200 p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden text-center space-y-6">
        <div className="absolute left-0 bottom-0 top-0 w-1 bg-[#b50e5f]" />
        <span className="text-[9px] font-mono tracking-[0.3em] text-[#b50e5f] uppercase block">
          {lang === 'AZ' ? 'YENİLİKLƏRƏ ABUNƏ OLUN' : lang === 'RU' ? 'ПОДПИСАТЬСЯ НА ОПОВЕЩЕНИЯ' : 'SUBSCRIBE TO NEWSLETTER'}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 uppercase tracking-wide leading-tight">
          {lang === 'AZ' ? (<>AKTİV REKLAM VƏ SINAQLARDAN <br /> Məlumatlı Olun</>) : lang === 'RU' ? (<>БУДЬТЕ В КУРСЕ ОТКРЫТЫХ <br /> ПРОЕКТОВ И КАСТИНГОВ</>) : (<>BE FIRST TO KNOW OVER <br /> NEW CASTS & SHOOTINGS</>)}
        </h2>
        <p className="text-neutral-600 text-xs max-w-lg mx-auto font-sans leading-relaxed">
          {lang === 'AZ'
            ? 'E-poçt ünvanınızı daxil edərək həftəlik elan edilən böyük kino, serial, reklam kastingləri haqqında ilk məlumatı siz alın.'
            : lang === 'RU'
              ? 'Введите вашу электронную почту, чтобы еженедельно получать анонсы главных съемок и кинопрослушиваний.'
              : 'Submit your email and get premium weekly notification alerts about upcoming cinema hearings and TV series shootings.'}
        </p>

        {isSubscribed ? (
          <div className="p-4 bg-[#b50e5f]/5 border border-[#b50e5f]/20 text-[#b50e5f] text-xs inline-flex items-center gap-2 max-w-md mx-auto">
            <Check size={16} />
            <span className="font-mono text-[9px] tracking-wider uppercase">
              {lang === 'AZ' ? 'TƏŞƏKKÜR EDİRİK! ABUNƏLİYİNİZ ALINDI.' : lang === 'RU' ? 'СПАСИБО! ВЫ УСПЕШНО ПОДПИСАЛИСЬ!' : 'THANK YOU! SUBSCRIPTION CONFIRMED.'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'AZ' ? 'E-poçt ünvanınız' : lang === 'RU' ? 'Ваш эл. адрес' : 'Your email address'}
              className="w-full bg-white border border-neutral-300 text-xs text-neutral-900 px-4 py-3 placeholder-neutral-400 focus:outline-none focus:border-[#b50e5f] font-sans rounded-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-neutral-900 hover:bg-[#b50e5f] text-white text-xs font-bold font-sans tracking-[0.15em] px-6 py-3 transition-all shrink-0 outline-none cursor-pointer"
            >
              {lang === 'AZ' ? 'ABUNƏ OL' : lang === 'RU' ? 'ПОДПИСАТЬСЯ' : 'SUBSCRIBE'}
            </button>
          </form>
        )}
      </section>

      {/* Article Read Modal — WHITE */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white border border-neutral-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-10 text-left relative space-y-8 select-text shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute right-6 top-6 text-neutral-500 hover:text-neutral-900 border border-neutral-200 p-2 hover:bg-neutral-100 transition-all duration-300 cursor-pointer outline-none"
              >
                <X size={16} />
              </button>

              {/* Back trigger */}
              <button
                onClick={() => setActivePost(null)}
                className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-neutral-500 hover:text-[#b50e5f] uppercase cursor-pointer transition-colors"
              >
                <ArrowLeft size={12} />
                {lang === 'AZ' ? 'GERİ QAYIT' : lang === 'RU' ? 'НАЗАД' : 'GO BACK'}
              </button>

              {/* Metadata */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-[0.2em] bg-[#b50e5f]/8 text-[#b50e5f] px-3 py-1.5 uppercase border border-[#b50e5f]/20 inline-block">
                  {activePost.categoryLabel[lang] || activePost.categoryLabel.AZ}
                </span>

                <h2 className="text-2xl md:text-3xl text-neutral-900 font-serif leading-tight">
                  {activePost.title[lang] || activePost.title.AZ}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-neutral-500 tracking-wider pt-2 border-b border-neutral-100 pb-4">
                  <span>
                    {lang === 'AZ' ? 'Yazar' : lang === 'RU' ? 'Автор' : 'Author'}:{' '}
                    <strong className="text-neutral-800">{activePost.author[lang] || activePost.author.AZ}</strong>
                  </span>
                  <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span>{lang === 'AZ' ? 'Tarix' : lang === 'RU' ? 'Дата' : 'Date'}: {activePost.date[lang] || activePost.date.AZ}</span>
                  <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span>{lang === 'AZ' ? 'Oxu vaxtı' : lang === 'RU' ? 'Чтение' : 'Read time'}: {activePost.readTime[lang] || activePost.readTime.AZ}</span>
                </div>
              </div>

              {/* Image */}
              <div className="aspect-[21/9] w-full bg-neutral-100 overflow-hidden border border-neutral-200">
                <img
                  src={activePost.image}
                  alt={activePost.title[lang] || activePost.title.AZ}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale duration-700 hover:grayscale-0"
                />
              </div>

              {/* Body */}
              <div className="space-y-6 font-sans text-xs md:text-sm text-neutral-700 leading-relaxed">
                {(activePost.content[lang] || activePost.content.AZ).map((p, i) => (
                  <p key={i} className="first-letter:text-2xl first-letter:font-serif first-letter:text-[#b50e5f] first-letter:mr-1.5 first-letter:float-left">
                    {p}
                  </p>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-neutral-400">
                  © {new Date().getFullYear()} EYVAZOĞLU CASTING
                </span>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 border border-neutral-200 text-neutral-700 hover:border-[#b50e5f] hover:text-[#b50e5f] text-xs font-semibold tracking-widest font-sans transition-all cursor-pointer outline-none"
                >
                  {lang === 'AZ' ? 'MƏQALƏNİ BAĞLA' : lang === 'RU' ? 'ЗАКРЫТЬ СТАТЬЮ' : 'CLOSE ARTICLE'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}