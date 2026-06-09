import React, { useState, useMemo, useEffect } from 'react';
import type { PageRoute, Model, ModelCategory, ModelGender } from '../types';
import {  Search, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ModelsPageProps {
  models: Model[];
  onAddModel: (model: Model) => void;
  onNavigate: (route: PageRoute, id?: string) => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
}

export default function ModelsPage({ models, onAddModel, onNavigate, shortlistedIds, onToggleShortlist }: ModelsPageProps) {
  const { lang, t } = useLanguage();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtering states
  const [selectedGender, setSelectedGender] = useState<'all' | 'female' | 'male'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ModelCategory>('all');
  const [selectedHeightRange, setSelectedHeightRange] = useState<string>('all');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Admin panel expand state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Admin form state
  const [adminForm, setAdminForm] = useState({
    name: '',
    gender: 'female' as ModelGender,
    category: 'actors' as ModelCategory,
    height: 178,
    chestOrBust: 84,
    waist: 60,
    hips: 89,
    shoe: 38,
    hairColor: 'Qara',
    eyeColor: 'Qəhvəyi',
    age: 22,
    location: 'Bakı',
    bio: '',
    instagram: '',
    mainImageKey: 'f1', // default placeholder choice
  });

  const [adminSuccess, setAdminSuccess] = useState(false);

  // Preset premium fashion images for model creator placeholder support
  const presetImages: Record<string, string> = {
    f1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    f2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600',
    f3: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    m1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    m2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    m3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.name.trim()) return;

    const chosenImage = presetImages[adminForm.mainImageKey] || presetImages.f1;

    const newModel: Model = {
      id: `m-custom-${Date.now()}`,
      name: adminForm.name,
      gender: adminForm.gender,
      category: adminForm.category,
      height: Number(adminForm.height),
      chestOrBust: Number(adminForm.chestOrBust),
      waist: Number(adminForm.waist),
      hips: Number(adminForm.hips),
      shoe: Number(adminForm.shoe),
      hairColor: adminForm.hairColor,
      eyeColor: adminForm.eyeColor,
      age: Number(adminForm.age),
      location: adminForm.location,
      bio: adminForm.bio || `${adminForm.name} peşəkar kasting və çəkiliş heyətidir. Eyvazoğlu Casting agentliyinin yeni ulduz simalarındandır.`,
      instagram: adminForm.instagram.startsWith('@') ? adminForm.instagram : `@${adminForm.instagram || 'eyvazoglucasting'}`,
      mainImage: chosenImage,
      gallery: [chosenImage, presetImages.f2, presetImages.m2, presetImages.f3], // populate some premium backups
      featured: false,
    };

    onAddModel(newModel);
    setAdminSuccess(true);
    
    // reset some state
    setAdminForm({
      name: '',
      gender: 'female',
      category: 'actors',
      height: 178,
      chestOrBust: 84,
      waist: 60,
      hips: 89,
      shoe: 38,
      hairColor: 'Qara',
      eyeColor: 'Qəhvəyi',
      age: 22,
      location: 'Bakı',
      bio: '',
      instagram: '',
      mainImageKey: 'f1',
    });

    setTimeout(() => {
      setAdminSuccess(false);
      setIsAdminOpen(false);
    }, 2000);
  };

  // Model filtration logic
  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      // 1. Search term (case insensitive name or location)
      const matchesSearch =
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.category.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Gender filter
      const matchesGender = selectedGender === 'all' ? true : model.gender === selectedGender;

      // 3. Category filter
      const matchesCategory = selectedCategory === 'all' ? true : model.category === selectedCategory;

      // 4. Height range filter
      let matchesHeight = true;
      if (selectedHeightRange !== 'all') {
        const h = model.height;
        if (selectedHeightRange === 'under175') matchesHeight = h < 175;
        else if (selectedHeightRange === '175-180') matchesHeight = h >= 175 && h <= 180;
        else if (selectedHeightRange === '180-185') matchesHeight = h >= 180 && h <= 185;
        else if (selectedHeightRange === 'above185') matchesHeight = h > 185;
      }

      return matchesSearch && matchesGender && matchesCategory && matchesHeight;
    });
  }, [models, searchTerm, selectedGender, selectedCategory, selectedHeightRange]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGender, selectedCategory, selectedHeightRange]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredModels.length / itemsPerPage));
  }, [filteredModels.length, itemsPerPage]);

  // Slice models for current page
  const paginatedModels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredModels.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredModels, currentPage, itemsPerPage]);

  const heightLabels = {
    all: lang === 'AZ' ? 'Bütün Boylar' : lang === 'RU' ? 'Все размеры' : 'All Heights',
    under175: '< 175 sm',
    '175-180': '175 - 180 sm',
    '180-185': '180 - 185 sm',
    above185: '> 185 sm',
  };

  return (
    <div className="pt-38 md:pt-44 pb-24 max-w-8xl mx-auto px-4 md:px-8 lg:px-12 space-y-12 bg-white text-neutral-800">
      {/* Editorial Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#b50e5f] uppercase block font-semibold">
          {t('models.header.sub')}
        </span>
        <h1 className="text-4xl md:text-5xl text-neutral-900 font-serif leading-tight">{t('models.header.title')}</h1>
        <div className="w-12 h-[1px] bg-[#b50e5f]/60 mx-auto mt-4" />
      </div>

      {/* 2. Live Filters & Search Bars Panel */}
      <section className="bg-neutral-50/80 border border-neutral-200/60 p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 text-neutral-400" size={14} />
            <input
              type="text"
              placeholder={lang === 'AZ' ? 'Model adı və ya məkan üzrə axtar...' : lang === 'RU' ? 'Поиск по имени или городу...' : 'Search by name or city...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-xs text-neutral-800 pl-10 pr-4 py-2.5 placeholder-neutral-450 focus:outline-none focus:border-neutral-400/80 transition-all font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-black"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto items-center justify-end">
            {/* Gender filter */}
            <div className="flex bg-neutral-200/50 p-0.5 border border-neutral-200 rounded-sm">
              {(['all', 'female', 'male'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-4 py-1.5 text-[10px] tracking-wider uppercase font-medium transition-all cursor-pointer focus:outline-none ${
                    selectedGender === g ? 'bg-[#b50e5f] text-white font-bold' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {g === 'all' 
                    ? (lang === 'AZ' ? 'HAMI' : lang === 'RU' ? 'ВСЕ' : 'ALL') 
                    : g === 'female' 
                      ? (lang === 'AZ' ? 'QADIN' : lang === 'RU' ? 'ЖЕНЩИНЫ' : 'FEMALE') 
                      : (lang === 'AZ' ? 'KİŞİ' : lang === 'RU' ? 'МУЖЧИНЫ' : 'MALE')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Extended Category & Height Filters */}
        <div className="border-t border-neutral-200/60 pt-5 flex flex-col md:flex-row gap-6 justify-between">
          {/* Category choices */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest sm:mr-2 flex-shrink-0">
              {lang === 'AZ' ? 'Kateqoriya:' : lang === 'RU' ? 'Категория:' : 'Category:'}
            </span>
            <div className="flex overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none gap-2 w-full max-w-full sm:flex-wrap">
              {(['all', 'actors', 'models', 'kids', 'extras'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-[10px] tracking-wider border rounded-full transition-all cursor-pointer focus:outline-none flex-shrink-0 ${
                    selectedCategory === cat
                      ? 'border-[#b50e5f] bg-[#b50e5f]/10 text-[#b50e5f] font-semibold'
                      : 'border-neutral-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                  }`}
                >
                  {cat === 'all' 
                    ? (lang === 'AZ' ? 'HAMI' : lang === 'RU' ? 'ВСЕ' : 'ALL') 
                    : cat === 'actors' 
                      ? (lang === 'AZ' ? 'AKTYORLAR' : lang === 'RU' ? 'АКТЕРЫ' : 'ACTORS') 
                      : cat === 'models' 
                        ? (lang === 'AZ' ? 'MODELLƏR' : lang === 'RU' ? 'МОДЕЛИ' : 'MODELS') 
                        : cat === 'kids' 
                          ? (lang === 'AZ' ? 'UŞAQLAR' : lang === 'RU' ? 'ДЕТИ' : 'KIDS') 
                          : (lang === 'AZ' ? 'KÜTLƏVİ SƏHNƏ' : lang === 'RU' ? 'МАССОВКА' : 'EXTRAS')}
                </button>
              ))}
            </div>
          </div>

          {/* Height Range Choice */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mr-2">
              {lang === 'AZ' ? 'Boy ölçüsü:' : lang === 'RU' ? 'Рост:' : 'Height range:'}
            </span>
            <select
              value={selectedHeightRange}
              onChange={(e) => setSelectedHeightRange(e.target.value)}
              className="bg-white border border-neutral-200 text-[10px] text-neutral-700 font-mono tracking-wider px-3 py-1.5 focus:outline-none focus:border-neutral-400 cursor-pointer"
            >
              {Object.entries(heightLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. Final Filtered Grid of Models */}
      <section className="space-y-6">
        <div className="flex justify-between items-center text-xs text-neutral-500 font-mono tracking-wider">
          <span>
            {lang === 'AZ' 
              ? `${filteredModels.length} model siması tapıldı` 
              : lang === 'RU' 
                ? `Найдено ${filteredModels.length} моделей` 
                : `${filteredModels.length} talent profiles found`}
          </span>
          {(searchTerm || selectedGender !== 'all' || selectedCategory !== 'all' || selectedHeightRange !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGender('all');
                setSelectedCategory('all');
                setSelectedHeightRange('all');
              }}
              className="text-[#b50e5f] hover:text-[#b50e5f]/80 transition-colors cursor-pointer focus:outline-none underline underline-offset-4"
            >
              {lang === 'AZ' ? 'FİLTRLƏRİ SIFIRLA' : lang === 'RU' ? 'СБРОСИТЬ ФИЛЬТРЫ' : 'RESET FILTERS'}
            </button>
          )}
        </div>

        {filteredModels.length === 0 ? (
          <div className="py-24 text-center space-y-4 border border-neutral-200/60 bg-neutral-50">
            <p className="font-serif italic text-lg text-neutral-500">
              {lang === 'AZ' ? 'Axtarış kriteriyanıza uyğun model tapılmadı.' : lang === 'RU' ? 'Модели по вашему запросу не найдены.' : 'No talent models match your search criteria.'}
            </p>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto font-sans leading-relaxed">
              {lang === 'AZ' 
                ? 'Zəhmət olmasa digər kateqoriya və ya boy variantlarını sınayın, yaxud kasting üçün birbaşa bizimlə əlaqə saxlayın.' 
                : lang === 'RU' 
                  ? 'Пожалуйста, попробуйте другие параметры фильтра или свяжитесь с нами напрямую для координирования.' 
                  : 'Please try selecting different categories or height options, or contact our agency directly.'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-sans bg-white">
              {paginatedModels.map((model) => (
                <div
                  key={model.id}
                  onClick={() => {
                    onNavigate('model-detail', model.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col justify-between cursor-pointer border border-neutral-200/60 p-3 bg-white hover:border-neutral-400 shadow-sm hover:shadow-md transition-all duration-300 relative"
                >
                  <div className="aspect-[3/4] overflow-hidden relative border border-neutral-100 bg-[#0e0e0e]">
                    <img
                      src={model.mainImage}
                      alt={model.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle dark layout covers */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent duration-300 opacity-80 group-hover:opacity-90" />
                    
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.2em] bg-neutral-900 text-white px-2.5 py-1.5 uppercase border border-white/10 rounded-none">
                      {model.category === 'actors' 
                        ? (lang === 'AZ' ? 'Aktyor' : lang === 'RU' ? 'Актер' : 'Actor') 
                        : model.category === 'models' 
                          ? (lang === 'AZ' ? 'Model' : lang === 'RU' ? 'Модель' : 'Model') 
                          : model.category === 'kids' 
                            ? (lang === 'AZ' ? 'Uşaq' : lang === 'RU' ? 'Ребенок' : 'Kid') 
                            : (lang === 'AZ' ? 'Kütləvi Səhnə' : lang === 'RU' ? 'Массовка' : 'Extras')}
                    </span>

                    {/* Eye look focus badge on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border border-neutral-300 bg-white/85 flex items-center justify-center text-neutral-800 backdrop-blur-sm shadow-md">
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Model short summary details below block */}
                  <div className="pt-4 pb-1 flex flex-col justify-between bg-white text-neutral-800">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-base text-neutral-900 group-hover:text-[#b50e5f] transition-colors uppercase tracking-wide">
                        {model.name}
                      </h3>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {model.location.toLowerCase().includes('bakı') || model.location.toLowerCase().includes('baku') ? (lang === 'AZ' ? 'Bakı' : lang === 'RU' ? 'Баку' : 'Baku') : model.location}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-neutral-500 font-mono text-[9px] tracking-wider uppercase border-t border-neutral-100 pt-2.5 mt-2.5">
                      <div>
                        <span className="block text-[8px] text-neutral-400">{lang === 'AZ' ? 'Boy:' : lang === 'RU' ? 'Рост:' : 'Height:'}</span>
                        <span className="text-neutral-900 font-semibold">{model.height} {lang === 'RU' ? 'см' : 'cm'}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-neutral-400">{lang === 'AZ' ? 'Yaş:' : lang === 'RU' ? 'Возраст:' : 'Age:'}</span>
                        <span className="text-neutral-900 font-semibold">{model.age}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-neutral-400">{lang === 'AZ' ? 'Ölçü:' : lang === 'RU' ? 'Обувь:' : 'Shoe:'}</span>
                        <span className="text-neutral-900 font-semibold">{model.shoe}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Pagination Dashboard */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center bg-neutral-50 border border-neutral-200/60 p-4 gap-4">
                <span className="text-[11px] text-neutral-500 font-mono tracking-wider uppercase">
                  {lang === 'AZ' ? 'GÖSTƏRİLİR: ' : lang === 'RU' ? 'ПОКАЗАНО: ' : 'SHOWING: '}
                  <span className="text-neutral-800 font-semibold">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredModels.length)}</span> / <span className="text-[#b50e5f] font-bold">{filteredModels.length}</span>
                  {lang === 'AZ' ? ' MODEL' : lang === 'RU' ? ' МОДЕЛЕЙ' : ' TALENTS'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 border border-neutral-200 flex items-center justify-center text-neutral-500 rounded-none transition-all duration-200 focus:outline-none ${
                      currentPage === 1
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:border-neutral-400 hover:text-black hover:bg-neutral-100 cursor-pointer'
                    }`}
                    aria-label="Əvvəlki"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 350, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 border flex items-center justify-center transition-all duration-200 focus:outline-none rounded-none cursor-pointer ${
                            currentPage === pageNum
                              ? 'bg-[#b50e5f] border-[#b50e5f] text-white font-bold'
                              : 'border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-black hover:bg-neutral-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 border border-neutral-200 flex items-center justify-center text-neutral-500 rounded-none transition-all duration-200 focus:outline-none ${
                      currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:border-neutral-400 hover:text-black hover:bg-neutral-100 cursor-pointer'
                    }`}
                    aria-label="Növbəti"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <span className="text-[11px] text-neutral-500 font-mono tracking-wider uppercase">
                  {lang === 'AZ' ? 'SƏHİFƏ: ' : lang === 'RU' ? 'СТРАНИЦА: ' : 'PAGE: '}
                  <span className="text-neutral-800 font-bold">{currentPage}</span> / <span className="text-neutral-500">{totalPages}</span>
                </span>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
