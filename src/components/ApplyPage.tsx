import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, ArrowLeft, UploadCloud, UserCheck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const buildApplySchema = (lang: string) => z.object({
  fullName: z.string().min(3, { 
    message: lang === 'AZ' ? 'Ad və soyad ən azı 3 simvol olmalıdır.' : lang === 'RU' ? 'Имя и фамилия должны содержать не менее 3 символов.' : 'Min 3 characters is required for your full name.' 
  }),
  email: z.string().email({ 
    message: lang === 'AZ' ? 'Düzgün e-poçt ünvanı daxil edin.' : lang === 'RU' ? 'Введите корректный адрес электронной почты.' : 'Please enter a valid email address.' 
  }),
  phone: z.string().min(9, { 
    message: lang === 'AZ' ? 'Telefon nömrəsi ən azı 9 rəqəmdən ibarət olmalıdır.' : lang === 'RU' ? 'Номер телефона должен состоять минимум из 9 цифр.' : 'Phone number must have at least 9 digits.' 
  }),
  age: z.coerce.number().min(5, { 
    message: lang === 'AZ' ? 'Yaş müsbət rəqəm olmalı və ən azı 5 olmalıdır.' : lang === 'RU' ? 'Возраст должен быть положительным числом не менее 5.' : 'Age must be a positive number of at least 5.' 
  }).max(85, { 
    message: lang === 'AZ' ? 'Maksimum yaş limitimiz 85-dir.' : lang === 'RU' ? 'Максимальный возраст 85 лет.' : 'Maximum age limit is 85.' 
  }),
  location: z.string().min(2, { 
    message: lang === 'AZ' ? 'Yaşadığınız şəhər doldurulmalıdır.' : lang === 'RU' ? 'Укажите город проживания.' : 'Please enter your current city.' 
  }),
  instagram: z.string().min(2, { 
    message: lang === 'AZ' ? 'Instagram profili daxil edilməlidir.' : lang === 'RU' ? 'Укажите ваш профиль Instagram.' : 'Please enter your Instagram username.' 
  }),
  
  height: z.coerce.number().min(50, { 
    message: lang === 'AZ' ? 'Boyunuz müsbət rəqəm və minimum 50 sm olmalıdır.' : lang === 'RU' ? 'Рост должен быть положительным числом не менее 50 см.' : 'Height must be positive and at least 50 cm.' 
  }).max(225, { 
    message: lang === 'AZ' ? 'Maksimum boy 225 sm-dir.' : lang === 'RU' ? 'Максимальный рост 225 см.' : 'Maximum height is 225 cm.' 
  }),
  chest: z.coerce.number().min(30, { 
    message: lang === 'AZ' ? 'Sinə ölçüsü minimum 30 sm-dir.' : lang === 'RU' ? 'Объем груди минимум 30 см.' : 'Min chest is 30 cm.' 
  }).max(150, { 
    message: lang === 'AZ' ? 'Maksimum sinə 150 sm-dir.' : lang === 'RU' ? 'Максимальный объем груди 150 см.' : 'Max chest limit is 150 cm.' 
  }),
  waist: z.coerce.number().min(30, { 
    message: lang === 'AZ' ? 'Bel ölçüsü minimum 30 sm-dir.' : lang === 'RU' ? 'Объем талии минимум 30 см.' : 'Min waist limit is 30 cm.' 
  }).max(130, { 
    message: lang === 'AZ' ? 'Maksimum bel 130 sm-dir.' : lang === 'RU' ? 'Максимальный объем талии 130 см.' : 'Max waist limit is 130 cm.' 
  }),
  hips: z.coerce.number().min(30, { 
    message: lang === 'AZ' ? 'Omba ölçüsü minimum 30 sm-dir.' : lang === 'RU' ? 'Объем бедер минимум 30 см.' : 'Min hips measure is 30 cm.' 
  }).max(150, { 
    message: lang === 'AZ' ? 'Maksimum omba 150 sm-dir.' : lang === 'RU' ? 'Максимальный объем бедер 150 см.' : 'Max hips measure is 150 cm.' 
  }),
  shoe: z.coerce.number().min(15, { 
    message: lang === 'AZ' ? 'Minimum ayaqqabı ölçüsü 15.' : lang === 'RU' ? 'Размер обуви не менее 15.' : 'Min shoe size is 15.' 
  }).max(50, { 
    message: lang === 'AZ' ? 'Maksimum ayaqqabı ölçüsü 50.' : lang === 'RU' ? 'Размер обуви не более 50.' : 'Max shoe size is 50.' 
  }),
  
  hairColor: z.string().min(2, { 
    message: lang === 'AZ' ? 'Saç rəngini daxil edin.' : lang === 'RU' ? 'Укажите цвет волос.' : 'Hair color is required.' 
  }),
  eyeColor: z.string().min(2, { 
    message: lang === 'AZ' ? 'Göz rəngini daxil edin.' : lang === 'RU' ? 'Укажите цвет глаз.' : 'Eye color is required.' 
  }),
  category: z.enum(['actors', 'models', 'kids', 'extras']),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: lang === 'AZ' ? 'Şərtləri və məlumatların saxlanmasını təsdiq etməlisiniz.' : lang === 'RU' ? 'Вы должны принять условия обработки данных.' : 'You must accept the terms & conditions.'
  }),
});

export default function ApplyPage() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState('');

  const currentSchema = useMemo(() => buildApplySchema(lang), [lang]);

  const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      age: undefined,
      location: 'Bakı',
      instagram: '',
      height: undefined,
      chest: undefined,
      waist: undefined,
      hips: undefined,
      shoe: undefined,
      hairColor: 'Qara',
      eyeColor: 'Qəhvəyi',
      category: 'actors',
      termsAccepted: undefined,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: string[] = [];
    
    if (step === 1) {
      fieldsToValidate = ['fullName', 'email', 'phone', 'age', 'location', 'instagram'];
    } else if (step === 2) {
      fieldsToValidate = ['height', 'chest', 'waist', 'hips', 'shoe', 'hairColor', 'eyeColor'];
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handlePhotoSimulation = () => {
    if (photos.length >= 4) {
      setUploadError(
        lang === 'AZ' 
          ? 'Maksimum 4 ədəd foto yerləşdirə bilərsiniz.' 
          : lang === 'RU' 
            ? 'Вы можете загрузить максимум 4 фотографии.' 
            : 'Maximum of 4 snaps can be uploaded.'
      );
      return;
    }
    const simulatedUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200'
    ];
    const nextPhoto = simulatedUrls[photos.length];
    setPhotos((prev) => [...prev, nextPhoto]);
    setUploadError('');
  };

  const clearPhotos = () => {
    setPhotos([]);
  };

  const onSubmit = (data: any) => {
    if (photos.length === 0) {
      setUploadError(
        lang === 'AZ' 
          ? 'Müraciətin təsdiqi üçün ən azı 1 ədəd portret fotosu yükləməlisiniz.' 
          : lang === 'RU' 
            ? 'Для подтверждения заявки загрузите хотя бы 1 портретное фото.' 
            : 'You must upload at least 1 portrait snapshot to confirm.'
      );
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleReset = () => {
    reset();
    setPhotos([]);
    setStep(1);
    setIsSuccess(false);
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Dynamic Background decor */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-radial from-gold-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 1. Page Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-[10px] font-mono tracking-[0.3em] text-gold-500 uppercase">
          {lang === 'AZ' ? 'MODEL REZERVASIYA SƏNƏDİ' : lang === 'RU' ? 'АНКЕТА РЕГИСТРАЦИИ ТАЛАНТОВ' : 'TALENT REGISTRATION FILE'}
        </span>
        <h1 className="text-4xl md:text-5xl text-white font-serif uppercase tracking-wide">
          {lang === 'AZ' ? 'KASTİNQƏ MÜRACİƏT' : lang === 'RU' ? 'ПОДАТЬ ЗАЯВКУ' : 'CASTING APPLICATION'}
        </h1>
        <p className="text-xs text-neutral-400 font-sans tracking-[0.1em] max-w-lg mx-auto leading-relaxed">
          {lang === 'AZ' 
            ? 'Sənin də fashion, kommersiya və ya aktiv idman sahəsində parlaq karyera qurmaq şansın var. Anketi tam doldur və ailəmizə qatıl!' 
            : lang === 'RU' 
              ? 'У вас тоже есть шанс построить яркую карьеру в модной индустрии или киносъёмках. Заполните анкету полностью и присоединяйтесь к нашей семье!' 
              : 'You also have a brilliant chance to build a sparkling career in fashion, commercial acting, or modeling. Complete the form and join our family!'}
        </p>
        <div className="w-12 h-[1px] bg-gold-500/60 mx-auto mt-4" />
      </div>

      {isSuccess ? (
        /* Success Screen */
        <div className="bg-neutral-950 border border-gold-500/30 p-12 text-center space-y-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gold-950/15 border border-gold-500/50 flex items-center justify-center text-gold-500">
            <UserCheck size={32} className="animate-pulse" />
          </div>
          <div className="space-y-3 max-w-md">
            <h2 className="font-serif text-2xl tracking-wide text-white uppercase">
              {lang === 'AZ' ? 'MÜRACİƏTİNİZ SƏNƏDLƏŞDİRİLDİ' : lang === 'RU' ? 'ВАША ЗАЯВКА УСПЕШНО ПРИНЯТА' : 'APPLICATION REGISTERED'}
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {lang === 'AZ' 
                ? 'Hörmətli namizəd, müraciət anketiniz uğurla rəsmiləşdirildi. Ekspert komandamız fotoşəkillərinizi və bədən göstəricilərinizi yoxlayaraq ən qısa müddətdə (əgər parametrlərə uyğun gələrsə) sizinlə əlaqə saxlayacaq.' 
                : lang === 'RU' 
                  ? 'Уважаемый кандидат, ваша анкета успешно зарегистрирована. Наша экспертная команда рассмотрит ваши фотографии и параметры в кратчайшие сроки и (в случае соответствия) свяжется с вами.' 
                  : 'Dear candidate, your application has been successfully submitted. Our evaluation team will review your snapshots and body parameters, and if you match our requirements, we will contact you.'}
            </p>
          </div>
          <div className="p-4 border border-white/[0.03] bg-[#0c0c0c] flex gap-3 text-neutral-500 text-xs text-left max-w-sm rounded-sm">
            <ShieldCheck size={18} className="text-gold-500 shrink-0 mt-0.5" />
            <p className="text-[10px]">
              {lang === 'AZ' 
                ? 'Qeyd: Məlumatlarınızın gizliliyi fərdi məlumatların qorunması prinsipləri üzrə agentliyimizin serverlərində etibarlı saxlanılacaq.' 
                : lang === 'RU' 
                  ? 'Примечание: Конфиденциальность ваших данных будет надежно защищена на наших серверах в соответствии с правилами защиты личных данных.' 
                  : 'Note: The absolute privacy of your information will be safely secured on our servers according to data protection principles.'}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-8 py-3.5 bg-gold-600 hover:bg-gold-500 text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer"
          >
            {lang === 'AZ' ? 'YENİ ANKET DOLDUR' : lang === 'RU' ? 'ЗАПОЛНИТЬ ЕЩЕ РАЗ' : 'SUBMIT ANOTHER APPLICATION'}
          </button>
        </div>
      ) : (
        /* Stepper Multi-step Form */
        <div className="bg-neutral-950 border border-white/[0.04] p-8 md:p-12 relative">
          
          {/* Step visual indicator */}
          <div className="flex justify-between items-center mb-10 text-xs font-mono tracking-widest text-neutral-500 border-b border-white/[0.03] pb-6">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-gold-600 text-black font-bold' : step > 1 ? 'bg-neutral-800 text-gold-500' : 'bg-neutral-900'}`}>1</span>
              <span className={step === 1 ? 'text-white font-medium' : 'text-neutral-500'}>
                {lang === 'AZ' ? 'ŞƏXSİ MƏLUMAT' : lang === 'RU' ? 'ЛИЧНЫЕ ДАННЫЕ' : 'PERSONAL INFO'}
              </span>
            </div>
            <div className="w-12 h-[1px] bg-neutral-800" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-gold-600 text-black font-bold' : step > 2 ? 'bg-neutral-800 text-gold-500' : 'bg-neutral-900'}`}>2</span>
              <span className={step === 2 ? 'text-white font-medium' : 'text-neutral-500'}>
                {lang === 'AZ' ? 'FİZİKİ ÖLÇÜLƏR' : lang === 'RU' ? 'ПАРАМЕТРЫ РОСТА' : 'MEASUREMENTS'}
              </span>
            </div>
            <div className="w-12 h-[1px] bg-neutral-800" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-gold-600 text-black font-bold' : 'bg-neutral-900'}`}>3</span>
              <span className={step === 3 ? 'text-white font-medium' : 'text-neutral-500'}>
                {lang === 'AZ' ? 'FOTOLAR & TƏSDİQ' : lang === 'RU' ? 'ФОТО И ПОДТВЕРЖДЕНИЕ' : 'PHOTOS & CONFIRM'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'Ad və Soyadınız *' : lang === 'RU' ? 'Имя и Фамилия *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="Məs. Fəridə Sultanova"
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                  />
                  {errors.fullName && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'E-poçt Ünvanınız *' : lang === 'RU' ? 'Адрес эл. почты *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="ferida@example.com"
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                  />
                  {errors.email && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'Telefon Nömrəniz *' : lang === 'RU' ? 'Номер телефона *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Məs. +994 50 123 45 67"
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                  />
                  {errors.phone && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'Yaş *' : lang === 'RU' ? 'Возраст *' : 'Age *'}
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="85"
                    onKeyDown={preventNegativeInput}
                    {...register('age')}
                    placeholder="Məs. 20"
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                  />
                  {errors.age && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.age.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'Yaşadığınız Şəhər *' : lang === 'RU' ? 'Город проживания *' : 'Current City *'}
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    placeholder="Məs. Bakı"
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                  />
                  {errors.location && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.location.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'Instagram Profili *' : lang === 'RU' ? 'Профиль Instagram *' : 'Instagram Username *'}
                  </label>
                  <input
                    type="text"
                    {...register('instagram')}
                    placeholder="Məs. @feridas"
                    className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                  />
                  {errors.instagram && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.instagram.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: Measurements */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Boy (sm) *' : lang === 'RU' ? 'Рост (см) *' : 'Height (cm) *'}
                    </label>
                    <input
                      type="number"
                      min="50"
                      onKeyDown={preventNegativeInput}
                      {...register('height')}
                      placeholder="sm"
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.height && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.height.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Sinə ölçüsü (sm) *' : lang === 'RU' ? 'Объем груди (см) *' : 'Chest Size (cm) *'}
                    </label>
                    <input
                      type="number"
                      min="30"
                      onKeyDown={preventNegativeInput}
                      {...register('chest')}
                      placeholder="sm"
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.chest && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.chest.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Bel ölçüsü (sm) *' : lang === 'RU' ? 'Объем талии (см) *' : 'Waist Size (cm) *'}
                    </label>
                    <input
                      type="number"
                      min="30"
                      onKeyDown={preventNegativeInput}
                      {...register('waist')}
                      placeholder="sm"
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.waist && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.waist.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Omba ölçüsü (sm) *' : lang === 'RU' ? 'Объем бедер (см) *' : 'Hips Size (cm) *'}
                    </label>
                    <input
                      type="number"
                      min="30"
                      onKeyDown={preventNegativeInput}
                      {...register('hips')}
                      placeholder="sm"
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.hips && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.hips.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Ayaqqabı (EU) *' : lang === 'RU' ? 'Размер обуви *' : 'Shoe Size (EU) *'}
                    </label>
                    <input
                      type="number"
                      min="15"
                      onKeyDown={preventNegativeInput}
                      {...register('shoe')}
                      placeholder="EU"
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.shoe && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.shoe.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Saç Rənginiz *' : lang === 'RU' ? 'Цвет волос *' : 'Hair Color *'}
                    </label>
                    <input
                      type="text"
                      {...register('hairColor')}
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.hairColor && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.hairColor.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Göz Rənginiz *' : lang === 'RU' ? 'Цвет глаз *' : 'Eye Color *'}
                    </label>
                    <input
                      type="text"
                      {...register('eyeColor')}
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500"
                    />
                    {errors.eyeColor && <p className="text-[10.5px] text-red-500 font-mono mt-1">{errors.eyeColor.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Kateqoriya *' : lang === 'RU' ? 'Категория *' : 'Category *'}
                    </label>
                    <select
                      {...register('category')}
                      className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-3 py-3 focus:outline-none focus:border-gold-500 cursor-pointer"
                    >
                      <option value="actors">
                        {lang === 'AZ' ? 'Aktyorlar' : lang === 'RU' ? 'Актеры' : 'Actors'}
                      </option>
                      <option value="models">
                        {lang === 'AZ' ? 'Modellər' : lang === 'RU' ? 'Модели' : 'Models'}
                      </option>
                      <option value="kids">
                        {lang === 'AZ' ? 'Uşaqlar' : lang === 'RU' ? 'Дети' : 'Kids'}
                      </option>
                      <option value="extras">
                        {lang === 'AZ' ? 'Kütləvi Səhnə' : lang === 'RU' ? 'Массовка' : 'Extras'}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Photos Drag Upload & Final Terms Box */}
            {step === 3 && (
              <div className="space-y-8">
                {/* Drag / Click upload simulated block */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-400 block font-medium">
                    {lang === 'AZ' ? 'Portfel Fotolarının Yüklənməsi * (1 - 4 ədəd)' : lang === 'RU' ? 'Загрузка портфолио * (1 - 4 фото)' : 'Upload Portfolio Snaps * (1 - 4 photos)'}
                  </label>
                  <div
                    onClick={handlePhotoSimulation}
                    className="border-2 border-dashed border-neutral-800 hover:border-gold-500/40 bg-neutral-900/20 p-8 text-center cursor-pointer rounded-sm hover:bg-neutral-900/40 transition-all flex flex-col items-center justify-center space-y-3 group"
                  >
                    <UploadCloud size={32} className="text-neutral-500 group-hover:text-gold-500 transition-colors" />
                    <div>
                      <span className="text-xs font-semibold text-white tracking-widest uppercase">
                        {lang === 'AZ' ? 'FOTO ƏLAVƏ ETMƏK ÜÇÜN BURA TOXUNUN' : lang === 'RU' ? 'НАЖМИТЕ ЗДЕСЬ ДЛЯ ЗАГРУЗКИ ФОТО' : 'CLICK HERE TO UPLOAD SNAP PHOTOS'}
                      </span>
                      <p className="text-[10px] text-neutral-500 mt-1">
                        {lang === 'AZ' ? 'Təbii gün işığı qarşısında (üz, boy, profildən polaroidlər)' : lang === 'RU' ? 'При естественном свете (лицо, профиль, в полный рост)' : 'Under natural light (face close-up, profiles, full growth)'}
                      </p>
                    </div>
                  </div>
                  {uploadError && <p className="text-[10.5px] text-red-500 font-mono mt-1">{uploadError}</p>}
                </div>

                {/* Simulated files preview */}
                {photos.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                      <span>{photos.length} {lang === 'AZ' ? 'FOTO SEÇİLDİ' : lang === 'RU' ? 'ФОТО ВЫБРАНО' : 'PHOTOS SELECTED'}</span>
                      <button type="button" onClick={clearPhotos} className="text-red-500 hover:text-white underline uppercase cursor-pointer">
                        {lang === 'AZ' ? 'TEMİZLƏ' : lang === 'RU' ? 'ОЧИСТИТЬ' : 'RESET'}
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {photos.map((src, idx) => (
                        <div key={idx} className="aspect-[3/4] border border-neutral-800 relative bg-neutral-900">
                          <img src={src} alt={`Upload preview ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover animate-fade-in" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms checkbox */}
                <div className="space-y-3 pt-4 border-t border-white/[0.03]">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      {...register('termsAccepted')}
                      className="mt-1 cursor-pointer w-4 h-4 text-gold-500 bg-neutral-900 border-neutral-800 rounded focus:ring-gold-500 focus:ring-2 cursor-pointer"
                    />
                    <label htmlFor="termsAccepted" className="text-xs text-neutral-400 leading-normal font-sans select-none cursor-pointer">
                      {lang === 'AZ' 
                        ? 'Mən Eyvazoğlu Casting-in kasting şərtlərini oxudum, təqdim etdiyim ölçü göstəricilərinin həqiqi olduğunu bildirirəm və fərdi məlumatlarımın qorunması prinsipləri üzrə emalına razılıq verirəm.' 
                        : lang === 'RU' 
                          ? 'Я прочитал условия кастинга Eyvazoğlu Casting, подтверждаю достоверность предоставленных данных и даю согласие на обработку моих личных данных.' 
                          : 'I have read Eyvazoğlu Casting terms and conditions, certify that my biometric parameters are genuine, and consent to security storage of my personal data.'}
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="text-[10.5px] text-red-500 font-mono">{errors.termsAccepted.message}</p>}
                </div>
              </div>
            )}

            {/* Bottom Nav indicators */}
            <div className="pt-6 border-t border-white/[0.04] flex justify-between items-center">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs font-semibold tracking-widest flex items-center gap-2 transition-all cursor-pointer select-none"
                >
                  <ArrowLeft size={13} /> {lang === 'AZ' ? 'GERİ' : lang === 'RU' ? 'НАЗАД' : 'BACK'}
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-white text-black hover:bg-gold-500 text-xs font-bold tracking-widest flex items-center gap-2 transition-all cursor-pointer outline-none select-none"
                >
                  {lang === 'AZ' ? 'NÖVBƏTİ' : lang === 'RU' ? 'ДАЛЕЕ' : 'NEXT STEP'} <ArrowRight size={13} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3 bg-gold-600 hover:bg-gold-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-black text-xs font-extrabold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 select-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      {lang === 'AZ' ? 'GÖNDƏRİLİR...' : lang === 'RU' ? 'ОТПРАВКА...' : 'SENDING...'}
                    </>
                  ) : (
                    lang === 'AZ' ? 'MÜRACİƏTİ TAMAMLA' : lang === 'RU' ? 'ОТПРАВИТЬ ЗАЯВКУ' : 'SUBMIT APPLICATION'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
