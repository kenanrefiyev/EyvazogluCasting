import type { Model, TeamMember, Testimonial, AgencyStats } from '../types.ts';

export const agencyStats: AgencyStats = {
  years: 10,
  activeModels: 1450,
  brandsWorked: 230,
  successRate: 99
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Eyvazoğlu Casting ilə işləmək bizim yeni tarixi filmimizin çəkilişlərinə böyük peşəkarlıq gətirdi. Həm baş rol aktyorları, həm də kütləvi səhnə təminatı qüsursuz idi.",
    author: "Rüstəm Şərifov",
    roleOrBrand: "Baku Media Center - Rejissor Assistent"
  },
  {
    id: 't2',
    quote: "Reytinqli serial çəkilişlərimiz üçün ssenaridəki xarakterlərə 100% uyğun gələn aktyor və uşaq simaları çox qısa müddətdə bizə təqdim etdilər. Bakının ən böyük bazasıdır.",
    author: "Kamil Əlizadə",
    roleOrBrand: "Azərbaycan Televiziyası (AzTV) - Baş Prodüser"
  },
  {
    id: 't3',
    quote: "Reklam layihəmiz üçün tələb olunan model və aktyor simalarını saniyələr içində seçib kasting turlarını mükəmməl təşkil etdilər. Peşəkarlıqları heyranedicidir.",
    author: "Zemfira Həsənova",
    roleOrBrand: "Caspian Media Group - Kast-Koordinator"
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: "Rüfət Eyvazoğlu",
    role: "Təsisçi & Baş Direktor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 'tm2',
    name: "Nigar Vəliyeva",
    role: "Kasting Direktor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 'tm3',
    name: "Eşqin Məmmədov",
    role: "Kütləvi Səhnə Meneceri (Extras Lead)",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600"
  }
];

export interface ModernPartner {
  id: string;
  name: string;
  category: string;
  logoText: string;
  desc: string;
  stats: string;
  videoUrl?: string;
}

export const clientLogos: ModernPartner[] = [
  { 
    id: "l1", 
    name: "Bravo Supermarket", 
    category: "Retail & Reklam", 
    logoText: "BRAVO", 
    desc: "Ölkənin ən iri supermarketlər şəbəkəsinin rəsmi reklam çarxları, promo kampaniyaları və brend simaları üçün kasting tərəfdaşı.",
    stats: "bravo.az",
    videoUrl: "https://www.instagram.com/p/CMNSkKrlbeL/"
  },
  { 
    id: "l2", 
    name: "İrşad Electronics", 
    category: "Texnologiya & Retail", 
    logoText: "İRŞAD", 
    desc: "Müasir texnologiya reklamları, təqdimat çarxları və rəqəmsal brend kampaniyaları üçün peşəkar model təminatı tərəfdaşı.",
    stats: "irshad.az",
    videoUrl: "https://www.instagram.com/p/CPEM891FsQx/"
  },
   { 
    id: "l3", 
    name: "ABB (Azərbaycan Beynəlxalq Bankı)", 
    category: "Maliyyə & Reklam", 
    logoText: "ABB", 
    desc: "Ölkənin aparıcı rəqəmsal bankı olan ABB-nin böyük video çarxları, korporativ təqdimatları və sosial kampaniyaları üçün kasting tərəfdaşı.",
    stats: "abb-bank.az",
    videoUrl: "https://www.instagram.com/p/CMShC8Kl_dp/"
  }
];

export const modelsData: Model[] = [
  {
    id: 'm1',
    name: 'Aylin Qasımova',
    category: 'models',
    gender: 'female',
    height: 179,
    chestOrBust: 84,
    waist: 60,
    hips: 89,
    shoe: 39,
    hairColor: 'Tünd Şabalıdı',
    eyeColor: 'Yaşıl',
    age: 21,
    location: 'Bakı',
    bio: 'Aylin ölkənin aparıcı podiumlarında və dəb jurnallarının üz qabığında yer alan yüksək klassifikasiyalı profesional modeldir. Minimalist ifadələri və fotogenikliyi ilə brendlərin sevimlidir.',
    instagram: '@aylin.qasimova',
    mainImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm2',
    name: 'Fərid Məmmədov',
    category: 'actors',
    gender: 'male',
    height: 188,
    chestOrBust: 98,
    waist: 78,
    hips: 96,
    shoe: 43,
    hairColor: 'Qara',
    eyeColor: 'Qəhvəyi',
    age: 24,
    location: 'Bakı',
    bio: 'Professional teatr və kino aktyorudur. Bir çox dövlət dram seriallarında və bədii filmlərdə baş rolları canlandırmışdır. Kəskin xarizmatik cizgiləri və dərin diksiyası ilə tanınır.',
    instagram: '@farid.mammadov',
    mainImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm3',
    name: 'Leyla Əliyeva',
    category: 'actors',
    gender: 'female',
    height: 174,
    chestOrBust: 88,
    waist: 64,
    hips: 92,
    shoe: 38,
    hairColor: 'Qəhvəyi',
    eyeColor: 'Ela',
    age: 23,
    location: 'Bakı',
    bio: 'Milli Konservatoriya nəzdində aktyorluq sənətini bitirmişdir. Səmimi siması və güclü mimikası ilə televiziya reklamlarının, serialların və musiqi çarxlarının favorit aktrisalarındandır.',
    instagram: '@leyla.aliyeva',
    mainImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm4',
    name: 'Murad Sadıqov',
    category: 'actors',
    gender: 'male',
    height: 184,
    chestOrBust: 96,
    waist: 80,
    hips: 95,
    shoe: 42,
    hairColor: 'Tünd Qonur',
    eyeColor: 'Yaşıl',
    age: 25,
    location: 'Bakı',
    bio: 'Reklam çarxları və kommersiya çəkilişləri üzrə yüksək təcrübəli bədii aktyor və modeldir. Kamera qarşısında mükəmməl sərbəstlik nümayiş etdirərək fərqli rəngarəng obrazları canlandırır.',
    instagram: '@murad.sadiqov',
    mainImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm5',
    name: 'Nəzrin İsmayılova',
    category: 'models',
    gender: 'female',
    height: 177,
    chestOrBust: 86,
    waist: 61,
    hips: 90,
    shoe: 38,
    hairColor: 'Açıq Şabalıdı',
    eyeColor: 'Mavi',
    age: 22,
    location: 'Bakı',
    bio: 'Sərgilər, gözəllik markaları və yüksək moda brendləri üçün modellik edən unikal kadr. İncə daxili estetika, zərif plastika və fotoqraflarla asan sürətli işləmə bacarığı var.',
    instagram: '@nazrin.models',
    mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm6',
    name: 'Kamran Rzayev',
    category: 'models',
    gender: 'male',
    height: 190,
    chestOrBust: 104,
    waist: 82,
    hips: 100,
    shoe: 44,
    hairColor: 'Qara',
    eyeColor: 'Açıq Qəhvəyi',
    age: 26,
    location: 'Bakı',
    bio: 'Atletik bədən quruluşuna malik geyim və idman brendlərinin rəsmi kataloq modelidir. İdman geyimlərinin çəkilişi, video çarxlar və podium nümayişləri üçün təcrübəli namizəddir.',
    instagram: '@kamran.rzayev',
    mainImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm7',
    name: 'Aysel Həsənova',
    category: 'models',
    gender: 'female',
    height: 180,
    chestOrBust: 82,
    waist: 59,
    hips: 88,
    shoe: 39,
    hairColor: 'Açıq Kürən',
    eyeColor: 'Yaşıl',
    age: 20,
    location: 'Bakı',
    bio: 'Kürən saçları və unikal siması ilə dərhal diqqət çəkir. Müasir rəsm layihələri, kreativ sərgi geyimləri və High-Fashion moda kataloqları üçün axtarılan vizuallardan biridir.',
    instagram: '@aysel.hasan',
    mainImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm8',
    name: 'Tural Əliyev',
    category: 'extras',
    gender: 'male',
    height: 185,
    chestOrBust: 100,
    waist: 81,
    hips: 98,
    shoe: 43,
    hairColor: 'Qara',
    eyeColor: 'Qonur',
    age: 27,
    location: 'Bakı',
    bio: 'Kütləvi səhnə aktyoru və fon personajıdır. Otuzdan çox bədii film, televiziya serialı və tarixi döyüş səhnələrində köməkçi aktyor rollarında mütəmadi olaraq iştirak etmişdir.',
    instagram: '@tural.alievv',
    mainImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm9',
    name: 'Dəniz Quliyeva',
    category: 'kids',
    gender: 'female',
    height: 128,
    chestOrBust: 62,
    waist: 58,
    hips: 64,
    shoe: 32,
    hairColor: 'Qəhvəyi Buruq',
    eyeColor: 'Ala',
    age: 8,
    location: 'Bakı',
    bio: 'Uşaq geyim markalarının və şirniyyat reklam çarxlarının gənc və olduqca aktiv, sevimli simasıdır. Yeni dərslik, məktəbli ləvazimatı və oyuncaq brendlərinin siması olaraq çəkilib.',
    instagram: '@deniz_kids_models',
    mainImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1496674205429-ca0441d40294?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm10',
    name: 'Ömər Babayev',
    category: 'kids',
    gender: 'male',
    height: 140,
    chestOrBust: 68,
    waist: 62,
    hips: 70,
    shoe: 35,
    hairColor: 'Sarışın',
    eyeColor: 'Mavi',
    age: 10,
    location: 'Bakı',
    bio: 'Çox şən və emosional uşaq modeldir. Meyvə şirələri, iaşə xidmətləri və bank ailə kartı reklamlarının çəkilişlərində özünəməxsus performansı ilə böyükləri valeh edir.',
    instagram: '@omer_casting_baku',
    mainImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm11',
    name: 'Lalə Kərimova',
    category: 'models',
    gender: 'female',
    height: 178,
    chestOrBust: 85,
    waist: 62,
    hips: 91,
    shoe: 38,
    hairColor: 'Qara',
    eyeColor: 'Qəhvəyi',
    age: 22,
    location: 'Gəncə',
    bio: 'Aparıcı kosmetika brendlərinin reklam siması. Zərif təbii üz cizgiləri və peşəkar çəkiliş təcrübəsi sayəsində beynəlxalq sərgilərin rəsmi nümayəndəsidir.',
    instagram: '@lale.kerimova',
    mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm12',
    name: 'Elnur Qasımov',
    category: 'actors',
    gender: 'male',
    height: 182,
    chestOrBust: 101,
    waist: 84,
    hips: 99,
    shoe: 42,
    hairColor: 'Qəhvəyi',
    eyeColor: 'Yaşıl',
    age: 28,
    location: 'Bakı',
    bio: 'Teatrın və bədii filmlərin sevilən aktyoru. Gərgin dramatik rolları bənzərsiz emosionallıqla ifadə edərək tamaşaçı sevgisini qazanmışdır.',
    instagram: '@elnur.gasimov.actor',
    mainImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm13',
    name: 'Nərmin Məmmədova',
    category: 'models',
    gender: 'female',
    height: 176,
    chestOrBust: 84,
    waist: 60,
    hips: 89,
    shoe: 37,
    hairColor: 'Sarı',
    eyeColor: 'Mavi',
    age: 19,
    location: 'Bakı',
    bio: 'Möhtəşəm moda gecələrinin və xarici butik kataloqlarının göz oxşayan gənc modeli. Kameraya qarşı olduqca sərbəst və fərqli pozlar verməkdə peşəkardır.',
    instagram: '@narmin.mammadova',
    mainImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm14',
    name: 'Ramil Əliyev',
    category: 'extras',
    gender: 'male',
    height: 180,
    chestOrBust: 95,
    waist: 80,
    hips: 96,
    shoe: 41,
    hairColor: 'Qara',
    eyeColor: 'Qonur',
    age: 33,
    location: 'Sumqayıt',
    bio: 'Çoxsaylı hərbi seriallarda, döyüş layihələrində və kütləvi səhnələrdə mütəkkəm tərəfdaşlıq. Peşəkar fəallığı və verilən rola sürətli adaptasiyası ilə seçilir.',
    instagram: '@ramil.aliev.extras',
    mainImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm15',
    name: 'Zəhra Bağırova',
    category: 'kids',
    gender: 'female',
    height: 115,
    chestOrBust: 58,
    waist: 54,
    hips: 60,
    shoe: 29,
    hairColor: 'Açıq Qəhvəyi',
    eyeColor: 'Yaşıl',
    age: 6,
    location: 'Bakı',
    bio: 'Zərif geyim markalarının və uşaq qida məhsullarının rəsmi reklam siması. Çox şirin, ləvazimatları sevən və kasting rəhbərlərinin təlimatlarına asanlıqla tabe olan istedadlı uşaq.',
    instagram: '@zahra_bagirova_kids',
    mainImage: 'https://images.unsplash.com/photo-1510210119931-1833d717f863?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1510210119931-1833d717f863?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm16',
    name: 'Orxan Səlimov',
    category: 'models',
    gender: 'male',
    height: 187,
    chestOrBust: 99,
    waist: 80,
    hips: 97,
    shoe: 43,
    hairColor: 'Qonur',
    eyeColor: 'Mavi',
    age: 23,
    location: 'Bakı',
    bio: 'Klassik kostyum və gənc dəbi markalarının siması. Parlaq mavi gözləri və peşəkar gəzinti xüsusiyyəti ilə Bakı moda agentliklərinin diqqət mərkəzindədir.',
    instagram: '@orxan.selimov',
    mainImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm17',
    name: 'Səbinə Rəsulova',
    category: 'actors',
    gender: 'female',
    height: 172,
    chestOrBust: 89,
    waist: 65,
    hips: 92,
    shoe: 37,
    hairColor: 'Qara',
    eyeColor: 'Qəhvəyi',
    age: 25,
    location: 'Bakı',
    bio: 'Müasir daxili seriallar və televiziya tamaşalarında canlandırdığı fərqli rollarla tanınır. Kamera önündə təbii səmimiyyəti və dərin empatiya hissi ilə xarakterləri canlandırır.',
    instagram: '@sabina.rasulova.actress',
    mainImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm18',
    name: 'Tərlan Əhmədov',
    category: 'models',
    gender: 'male',
    height: 189,
    chestOrBust: 102,
    waist: 81,
    hips: 99,
    shoe: 43,
    hairColor: 'Qara',
    eyeColor: 'Yaşıl',
    age: 24,
    location: 'Bakı',
    bio: 'Azərbaycanın və Türkiyənin premium geyim kataloqlarında iştirak etmiş, beynəlxalq podium səviyyəli təcrübəli bəy model.',
    instagram: '@terlan.ahmedov',
    mainImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm19',
    name: 'Fidan Əliyeva',
    category: 'models',
    gender: 'female',
    height: 181,
    chestOrBust: 83,
    waist: 59,
    hips: 89,
    shoe: 39,
    hairColor: 'Qızılı',
    eyeColor: 'Mavi',
    age: 21,
    location: 'Bakı',
    bio: 'Müasir geyim kolleksiyalarının və qlobal brendlərin dəb nümayişlərinin aparıcı simalarından biri. Olduqca fotogenik və xarizmatik duruşu var.',
    instagram: '@fidan.aliyeva.model',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm20',
    name: 'Cavidan Həsənov',
    category: 'actors',
    gender: 'male',
    height: 180,
    chestOrBust: 99,
    waist: 82,
    hips: 97,
    shoe: 41,
    hairColor: 'Şabalıdı',
    eyeColor: 'Qəhvəyi',
    age: 30,
    location: 'Bakı',
    bio: 'Teatr tamaşalarında, dram seriallarında və bədii bədii ekran əsərlərində güclü plastikası və dərin emosional oyunu ilə fərqlənən professional aktyor.',
    instagram: '@cavidan.hasanov',
    mainImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm21',
    name: 'Ayan Muradova',
    category: 'models',
    gender: 'female',
    height: 175,
    chestOrBust: 86,
    waist: 61,
    hips: 91,
    shoe: 38,
    hairColor: 'Tünd Şabalıdı',
    eyeColor: 'Ela',
    age: 18,
    location: 'Sumqayıt',
    bio: 'Milli parfümeriya və moda butiklərinin çəkilişlərində fəal iştirak edən, gənc və parlaq gələcəyi olan modern xanım model.',
    instagram: '@ayan.muradova',
    mainImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm22',
    name: 'Mikayıl Rəhimov',
    category: 'extras',
    gender: 'male',
    height: 182,
    chestOrBust: 100,
    waist: 83,
    hips: 98,
    shoe: 42,
    hairColor: 'Qara',
    eyeColor: 'Qəhvəyi',
    age: 35,
    location: 'Bakı',
    bio: 'Böyük miqyaslı kino çarxlarında, kütləvi aksiya və tarixi döyüş səhnələrində professional köməkçi aktyorluq təcrübəsi.',
    instagram: '@mikail.rehimov',
    mainImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm23',
    name: 'Nihad Qasımov',
    category: 'kids',
    gender: 'male',
    height: 120,
    chestOrBust: 59,
    waist: 55,
    hips: 61,
    shoe: 30,
    hairColor: 'Qəhvəyi',
    eyeColor: 'Yaşıl',
    age: 7,
    location: 'Bakı',
    bio: 'Bankların reklam kampaniyalarında, uşaq şirniyyat və meyvə şirələri reklamlarında şirinliyi və bacarıqlılığı ilə tez-tez dəvət alan uşaq sima.',
    instagram: '@nihad.casting',
    mainImage: 'https://images.unsplash.com/photo-1510210119931-1833d717f863?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1510210119931-1833d717f863?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm24',
    name: 'Fatimə Bağırlı',
    category: 'models',
    gender: 'female',
    height: 177,
    chestOrBust: 85,
    waist: 60,
    hips: 90,
    shoe: 38,
    hairColor: 'Qara',
    eyeColor: 'Qara',
    age: 20,
    location: 'Gəncə',
    bio: 'Fərqli şərq cizgilərinə malik, yerli modelyerlərin kolleksiyalarında və gəlinlik çəkilişlərində çox bəyənilən gənc model.',
    instagram: '@fatima.bagirli',
    mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
    ],
    featured: true
  },
  {
    id: 'm25',
    name: 'Murad Məmmədrzayev',
    category: 'actors',
    gender: 'male',
    height: 185,
    chestOrBust: 101,
    waist: 81,
    hips: 98,
    shoe: 42,
    hairColor: 'Tünd Qəhvəyi',
    eyeColor: 'Qəhvəyi',
    age: 26,
    location: 'Bakı',
    bio: 'Köməkçi və əsas rolların professional ifaçısı, dramatik aktyor, maraqlı mimik və jestika sənətinə malik kadr.',
    instagram: '@muradzade.actor',
    mainImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  },
  {
    id: 'm26',
    name: 'Selcan Rzayeva',
    category: 'models',
    gender: 'female',
    height: 179,
    chestOrBust: 84,
    waist: 61,
    hips: 90,
    shoe: 38,
    hairColor: 'Açıq Şabalıdı',
    eyeColor: 'Yaşıl',
    age: 22,
    location: 'Bakı',
    bio: 'Yerli moda jurnallarının rəsmi kataloq nümayəndəsi, incə səsli, zərif gəzinti və fərqli pozlar üzrə peşəkar model.',
    instagram: '@selcan.rzayva',
    mainImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
    ],
    featured: false
  }
];
