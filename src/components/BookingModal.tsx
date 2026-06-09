import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Briefcase, MessageSquare, Check, Phone } from 'lucide-react';
import type { Model } from '../types';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  model?: Model | null;
  initialDetails?: string;
}

export default function BookingModal({ isOpen, onClose, model, initialDetails }: BookingModalProps) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    date: '',
    eventType: 'fashion-show',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize initialDetails when the modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        details: initialDetails || '',
      }));
    }
  }, [isOpen, initialDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      clientName: '',
      company: '',
      email: '',
      phone: '',
      date: '',
      eventType: 'fashion-show',
      details: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="bg-[#0a0a0a] border border-white/[0.08] w-full max-w-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.05] flex items-center justify-between bg-neutral-950">
              <div>
                <h3 className="font-serif text-lg tracking-wider text-white uppercase">
                  {model 
                    ? (lang === 'AZ' ? `${model.name} İlə Əlaqə` : lang === 'RU' ? `Связаться с ${model.name}` : `Contact ${model.name}`) 
                    : (lang === 'AZ' ? 'Mütəxəssislə Əlaqə Sorğusu' : lang === 'RU' ? 'Запрос обратной связи' : 'Talent Agency Inquiry')}
                </h3>
                <p className="text-xs text-gold-500 font-mono uppercase tracking-widest mt-1">
                  {lang === 'AZ' ? 'KASTİNG & ƏMƏKDAŞLIQ SORĞUSU' : lang === 'RU' ? 'КАСТИНГ & ЗАПРОС О СОТРУДНИЧЕСТВЕ' : 'CASTING & PARTNERSHIP INQUIRY'}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-white transition-colors p-1.5 border border-transparent hover:border-white/10 rounded-full cursor-pointer focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {model && (
                    <div className="flex items-center gap-4 bg-neutral-900/40 p-4 border border-white/[0.03] mb-2">
                      <img
                        src={model.mainImage}
                        alt={model.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover object-top border border-neutral-800"
                      />
                      <div>
                        <h4 className="font-serif text-base text-white">{model.name}</h4>
                        <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1.5 font-mono uppercase">
                          <span>
                            {lang === 'AZ' ? `Boy: ${model.height} sm` : lang === 'RU' ? `Рост: ${model.height} см` : `Height: ${model.height} cm`}
                          </span>
                          <span>
                            {lang === 'AZ' 
                              ? `Kateqoriya: ${model.category === 'actors' ? 'Aktyor' : model.category === 'models' ? 'Model' : model.category === 'kids' ? 'Uşaq' : 'Kütləvi S.'}` 
                              : lang === 'RU' 
                                ? `Категория: ${model.category === 'actors' ? 'Актер' : model.category === 'models' ? 'Модель' : model.category === 'kids' ? 'Ребенок' : 'Массовка'}` 
                                : `Category: ${model.category === 'actors' ? 'Actor' : model.category === 'models' ? 'Model' : model.category === 'kids' ? 'Kid' : 'Extras'}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                        {lang === 'AZ' ? 'Ad, Soyadınız *' : lang === 'RU' ? 'Ваше Имя, Фамилия *' : 'Your Full Name *'}
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-4 top-3.5 text-neutral-600" />
                        <input
                          type="text"
                          required
                          value={formData.clientName}
                          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                          placeholder={lang === 'AZ' ? 'Məs. Orxan Əliyev' : lang === 'RU' ? 'Напр. Орхан Алиев' : 'e.g. John Doe'}
                          className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white pl-10 pr-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                        {lang === 'AZ' ? 'Şirkət / Brend Adı' : lang === 'RU' ? 'Название компании / бренда' : 'Company / Brand Name'}
                      </label>
                      <div className="relative">
                        <Briefcase size={13} className="absolute left-4 top-3.5 text-neutral-600" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={lang === 'AZ' ? 'Məs. Sultan Couture' : lang === 'RU' ? 'Напр. Султан Кутюр' : 'e.g. Sultan Couture'}
                          className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white pl-10 pr-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                        {lang === 'AZ' ? 'E-poçt Ünvanı *' : lang === 'RU' ? 'Адрес эл. почты *' : 'Email Address *'}
                      </label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-4 top-3.5 text-neutral-600" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="orxan@sirket.az"
                          className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white pl-10 pr-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans font-sans"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                        {lang === 'AZ' ? 'Əlaqə Nömrəsi *' : lang === 'RU' ? 'Номер телефона *' : 'Contact Phone *'}
                      </label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-4 top-3.5 text-neutral-600" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+994 (50) 000 00 00"
                          className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white pl-10 pr-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                        {lang === 'AZ' ? 'Çəkiliş / Əlaqə Tarixi *' : lang === 'RU' ? 'Дата съемки / Мероприятия *' : 'Production / Event Date *'}
                      </label>
                      <div className="relative">
                        <Calendar size={13} className="absolute left-4 top-3.5 text-neutral-600" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white pl-10 pr-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                        {lang === 'AZ' ? 'Layihə Növü *' : lang === 'RU' ? 'Тип проекта *' : 'Project Type *'}
                      </label>
                      <select
                        required
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white px-4 py-3 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans cursor-pointer"
                      >
                        <option value="fashion-show">
                          {lang === 'AZ' ? 'Moda Nümayişi (Runway)' : lang === 'RU' ? 'Показ мод (Runway)' : 'Fashion Show (Runway)'}
                        </option>
                        <option value="editorial">
                          {lang === 'AZ' ? 'Foto-çəkiliş (Magazine Editorial)' : lang === 'RU' ? 'Фотосъемка (Editorial)' : 'Photo shoot (Editorial)'}
                        </option>
                        <option value="commercial">
                          {lang === 'AZ' ? 'Kommersiya Reklamı' : lang === 'RU' ? 'Рекламный проект' : 'Commercial (Video/Photo)'}
                        </option>
                        <option value="e-commerce">
                          {lang === 'AZ' ? 'E-Ticarət kataloq çəkilişi' : lang === 'RU' ? 'Каталожная съемка E-Commerce' : 'E-Commerce catalog shooting'}
                        </option>
                        <option value="influencer">
                          {lang === 'AZ' ? 'Brend Səfirliyi / Influencing' : lang === 'RU' ? 'Амбассадор бренда / Инфлюенсер' : 'Brand Ambassador'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-neutral-400 block font-medium">
                      {lang === 'AZ' ? 'Layihə Təsviri və Xüsusi İstəklər' : lang === 'RU' ? 'Описание проекта и особые пожелания' : 'Project description & specific instructions'}
                    </label>
                    <div className="relative">
                      <MessageSquare size={13} className="absolute left-4 top-3.5 text-neutral-600" />
                      <textarea
                        rows={4}
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder={lang === 'AZ' ? 'Layihənin yeri, müddəti və modellərdən gözləntiləriniz barədə qısa dərclər yazın...' : lang === 'RU' ? 'Укажите краткие детали, место проведения, сроки съемки...' : 'Provide details on location, schedule, models expectations, etc...'}
                        className="w-full bg-neutral-900/60 border border-neutral-800 text-xs text-white pl-10 pr-4 py-3 placeholder-neutral-600 focus:outline-none focus:border-gold-500/80 focus:ring-1 focus:ring-gold-500/20 transition-all font-sans resize-none"
                      />
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/[0.04]">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs font-medium tracking-[0.15em] transition-colors cursor-pointer select-none"
                    >
                      {lang === 'AZ' ? 'LƏĞV ET' : lang === 'RU' ? 'ОТМЕНА' : 'CANCEL'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gold-600 hover:bg-gold-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-black text-xs font-bold tracking-[0.15em] transition-all cursor-pointer flex items-center gap-2 select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          {lang === 'AZ' ? 'GÖNDƏRİLİR...' : lang === 'RU' ? 'ОТПРАВКА...' : 'SENDING...'}
                        </>
                      ) : (
                        lang === 'AZ' ? 'ƏLAQƏ SORĞUSU GÖNDƏR' : lang === 'RU' ? 'ОТПРАВИТЬ ЗАПРОС' : 'SEND BOOKING REQUEST'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full border border-gold-500/40 bg-gold-950/10 flex items-center justify-center text-gold-500">
                    <Check size={28} className="animate-pulse" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <h4 className="font-serif text-xl tracking-wider text-white uppercase animate-fade-in">
                      {lang === 'AZ' ? 'ƏLAQƏ SORĞUNUZ QƏBUL EDİLDİ' : lang === 'RU' ? 'ЗАПРОС УСПЕШНО ПРИНЯТ' : 'SUCCESSFULLY RECEIVED'}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      {lang === 'AZ' 
                        ? 'Bizə göndərdiyiniz layihə detalları uğurla qeydiyyata alındı. Kasting üzrə menecerimiz ən geci 4 saat ərzində sizinlə əlaqə saxlayaraq layihəni və növbəti addımları müzakirə edəcək.' 
                        : lang === 'RU' 
                          ? 'Ваш запрос успешно отправлен. Менеджер свяжется с вами в течение 4 часов для обсуждения партнерства и деталей.' 
                          : 'Your request has been successfully recorded. Our talent agent will reach out in less than 4 working hours to proceed.'}
                    </p>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600 border-t border-white/[0.03] pt-6 w-full max-w-sm">
                    Rezyut ID: CAST-{Math.floor(Math.random() * 9000) + 1000}
                  </div>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-neutral-900 border border-neutral-800 text-white hover:text-gold-500 text-xs font-bold tracking-widest transition-all cursor-pointer"
                  >
                    {lang === 'AZ' ? 'BAĞLA' : lang === 'RU' ? 'ЗАКРЫТЬ' : 'CLOSE'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
