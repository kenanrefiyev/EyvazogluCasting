import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa';
export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="pt-38 md:pt-44 pb-24 max-w-8xl mx-auto px-4 md:px-8 lg:px-12 space-y-16 bg-white text-neutral-800">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#b50e5f] uppercase font-semibold">
          {lang === 'AZ' ? 'BİZİMLƏ ƏLAQƏ QURUN' : lang === 'RU' ? 'СВЯЗАТЬСЯ С НАМИ' : 'GET IN TOUCH'}
        </span>
        <h1 className="text-4xl md:text-5xl text-neutral-900 font-serif uppercase tracking-wider font-light">
          {lang === 'AZ' ? 'ƏLAQƏ & REZERV' : lang === 'RU' ? 'КОНТАКТЫ & БРОНИРОВАНИЕ' : 'CONTACT & RESERVATION'}
        </h1>
        <div className="w-12 h-[1px] bg-[#b50e5f]/60 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8 select-text bg-white">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-neutral-900 tracking-wide uppercase">
              {lang === 'AZ' ? 'MƏRKƏZİ OFİSİMİZ' : lang === 'RU' ? 'НАШ ЦЕНТРАЛЬНЫЙ ОФИС' : 'CASTING HEADQUARTERS'}
            </h3>
            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-sans mt-2">
              {lang === 'AZ' 
                ? 'Brendlər, dizaynerlər və tərəfdaşlar üçün qapımız hər zaman açıqdır. Kasting müraciətləri, kiralama şərtləri və sorğular üçün ofisimizə yaxınlaşa və ya birbaşa form vasitəsilə yazaraq məlumat ala bilərsiniz.' 
                : lang === 'RU' 
                  ? 'Наши двери всегда открыты для брендов, дизайнеров и продюсеров. Приглашаем вас в офис для обсуждения кастинг-заявок или свяжитесь с нами напрямую через форму.' 
                  : 'Our doors are always open for commercial brands, designers, and agency production partners. For customized selections, rental agreements, or general bookings, visit our office or message us directly.'}
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-6 border-y border-neutral-200/60 py-8 bg-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#b50e5f]/20 bg-[#b50e5f]/5 rounded-full flex items-center justify-center text-[#b50e5f] shrink-0">
                <MapPin size={16} />
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase tracking-[0.15em] font-mono text-neutral-400 font-semibold">
                  {lang === 'AZ' ? 'ÜNVAN' : lang === 'RU' ? 'АДРЕС' : 'ADDRESS'}
                </span>
                <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                  {lang === 'AZ' 
                    ? '46 City Mall, Ali Mustafayev,Baku 1100' 
                    : lang === 'RU' 
                      ? 'Азербайджан, Баку, Али Мустафаев, 46 Сити Молл, 1100' 
                      : '46 City Mall, Ali Mustafayev Street, Baku 1100, Azerbaijan'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#b50e5f]/20 bg-[#b50e5f]/5 rounded-full flex items-center justify-center text-[#b50e5f] shrink-0">
                <Phone size={16} />
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase tracking-[0.15em] font-mono text-neutral-400 font-semibold">
                  {lang === 'AZ' ? 'TELEFON' : lang === 'RU' ? 'ТЕЛЕФОН' : 'PHONE'}
                </span>
                <a href="tel:+994554191902" className="text-xs text-neutral-700 hover:text-[#b50e5f] transition-colors font-mono font-medium">
                  +994 55 419 19 02
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-[#b50e5f]/20 bg-[#b50e5f]/5 rounded-full flex items-center justify-center text-[#b50e5f] shrink-0">
                <Mail size={16} />
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] uppercase tracking-[0.15em] font-mono text-neutral-400 font-semibold">
                  {lang === 'AZ' ? 'E-POÇT' : lang === 'RU' ? 'ЭЛ. ПОЧТА' : 'EMAIL'}
                </span>
                <a href="mailto:info@eyvazoglucasting.az" className="text-xs text-neutral-700 hover:text-[#b50e5f] transition-colors font-mono font-medium">
                  eyvazoglucastingmmc2022@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#b50e5f] uppercase font-bold">
              {lang === 'AZ' ? 'RƏSMİ SOSİAL ŞƏBƏKƏLƏRİMİZ' : lang === 'RU' ? 'НАШИ ОФИЦИАЛЬНЫЕ СОЦСЕТИ' : 'OFFICIAL SOCIAL NETWORKS'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://www.instagram.com/eyvazoglucastingmmc/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100/50 hover:border-[#E1306C]/40 transition-all group rounded-sm shadow-sm"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-[#E1306C] group-hover:border-[#E1306C]/60 transition-all bg-white">
                  <FaInstagram size={16} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-[0.1em] text-neutral-450 font-mono">INSTAGRAM</span>
                  <span className="text-[11px] text-neutral-700 group-hover:text-[#E1306C] transition-colors font-semibold">@eyvazoglucasting</span>
                </div>
              </a>

              <a
                href="https://www.facebook.com/aslan.memmedeliyev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100/50 hover:border-[#1877F2]/40 transition-all group rounded-sm shadow-sm"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-[#1877F2] group-hover:border-[#1877F2]/60 transition-all bg-white">
                  <FaFacebook size={16} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-[0.1em] text-neutral-450 font-mono">FACEBOOK</span>
                  <span className="text-[11px] text-neutral-700 group-hover:text-[#1877F2] transition-colors font-semibold">/aslan.m</span>
                </div>
              </a>

              <a
                href="https://www.youtube.com/@EyvazogluCastingMMC"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100/50 hover:border-[#FF0000]/40 transition-all group rounded-sm shadow-sm"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:bg-[#FF0000] group-hover:border-[#FF0000]/60 transition-all bg-white">
                  <FaYoutube size={16} />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-[0.1em] text-neutral-450 font-mono">YOUTUBE</span>
                  <span className="text-[11px] text-neutral-700 group-hover:text-[#FF0000] transition-colors font-semibold">@Eyvazoglu</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200/80 p-8 md:p-10 shadow-sm rounded-sm">
          <h3 className="font-serif text-xl text-neutral-900 tracking-wide uppercase mb-6 font-light">
            {lang === 'AZ' ? 'Əlaqə Formu' : lang === 'RU' ? 'Форма связи' : 'Contact Form'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-500 block font-medium">
                  {lang === 'AZ' ? 'Ad, Soyad *' : lang === 'RU' ? 'Имя, Фамилия *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'AZ' ? 'Məs. Elşən Ələkbərov' : lang === 'RU' ? 'Напр. Эльшан Алекберов' : 'e.g. John Doe'}
                  className="w-full bg-white border border-neutral-250 text-xs text-neutral-800 px-4 py-3 placeholder-neutral-400 focus:outline-none focus:border-[#b50e5f] focus:ring-1 focus:ring-[#b50e5f]/25 transition-all font-sans rounded-sm shadow-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-500 block font-medium">
                  {lang === 'AZ' ? 'E-poçt Ünvanı *' : lang === 'RU' ? 'Адрес эл. почты *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-white border border-neutral-250 text-xs text-neutral-800 px-4 py-3 placeholder-neutral-400 focus:outline-none focus:border-[#b50e5f] focus:ring-1 focus:ring-[#b50e5f]/25 transition-all font-sans rounded-sm shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-500 block font-medium">
                  {lang === 'AZ' ? 'Telefon Nömrəsi' : lang === 'RU' ? 'Номер телефона' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+994 (50) 000 00 00"
                  className="w-full bg-white border border-neutral-250 text-xs text-neutral-800 px-4 py-3 placeholder-neutral-400 focus:outline-none focus:border-[#b50e5f] focus:ring-1 focus:ring-[#b50e5f]/25 transition-all font-sans rounded-sm shadow-sm"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-500 block font-medium">
                  {lang === 'AZ' ? 'Müraciət Mövzusu *' : lang === 'RU' ? 'Тема обращения *' : 'Message Subject *'}
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-neutral-250 text-xs text-neutral-800 px-3 py-3 focus:outline-none focus:border-[#b50e5f] focus:ring-1 focus:ring-[#b50e5f]/25 cursor-pointer font-sans rounded-sm shadow-sm"
                >
                  <option value="general">
                    {lang === 'AZ' ? 'Ümumi Sorğular' : lang === 'RU' ? 'Общие запросы' : 'General Inquiries'}
                  </option>
                  <option value="booking">
                    {lang === 'AZ' ? 'Model Rezervasiyası (Booking)' : lang === 'RU' ? 'Бронирование моделей' : 'Talent Booking'}
                  </option>
                  <option value="press">
                    {lang === 'AZ' ? 'Mətbuat və Media' : lang === 'RU' ? 'Пресса и Медиа' : 'Press & Media'}
                  </option>
                  <option value="partnership">
                    {lang === 'AZ' ? 'Tərəfdaşlıq layihələri' : lang === 'RU' ? 'Партнерские проекты' : 'Partnership Projects'}
                  </option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-500 block font-medium">
                {lang === 'AZ' ? 'Mesajınız *' : lang === 'RU' ? 'Ваше сообщение *' : 'Your Message *'}
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={lang === 'AZ' ? 'Müraciət təfərrüatlarınızı bura daxil edin...' : lang === 'RU' ? 'Введите детали вашего обращения...' : 'Enter your message details here...'}
                className="w-full bg-white border border-neutral-250 text-xs text-neutral-800 px-4 py-3 placeholder-neutral-400 focus:outline-none focus:border-[#b50e5f] focus:ring-1 focus:ring-[#b50e5f]/25 font-sans resize-none rounded-sm shadow-sm"
              />
            </div>

            {/* Success Announcement */}
            {isSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs flex items-start gap-2.5 rounded-sm">
                <Check size={16} className="shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-semibold uppercase tracking-wider font-mono text-[9px] mb-1 text-emerald-950">
                    {lang === 'AZ' ? 'MƏKTUB UĞURLA GÖNDƏRİLDİ' : lang === 'RU' ? 'СООБЩЕНИЕ ОТПРАВЛЕНО!' : 'MESSAGE SENT'}
                  </p>
                  <span>
                    {lang === 'AZ' 
                      ? 'Təşəkkür edirik! Əlaqə müraciətiniz qeydə alındı. Kasting əməkdaşlarımız ən yaxın zamanda sizinlə əlaqə saxlayacaqdır.' 
                      : lang === 'RU' 
                        ? 'Спасибо! Ваше обращение принято. Наши сотрудники кастинга свяжутся с вами в ближайшее время.' 
                        : 'Thank you! Your inquiry has been registered. Our casting representative will contact you as soon as possible.'}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center overflow-hidden bg-neutral-900 hover:bg-[#b50e5f] disabled:bg-neutral-300 text-white px-8 py-3.5 text-xs tracking-[0.15em] font-sans font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(181,14,95,0.15)] focus:outline-none cursor-pointer rounded-sm shadow-md"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {lang === 'AZ' ? 'GÖNDƏRİLİR...' : lang === 'RU' ? 'ОТПРАВКА...' : 'SENDING...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {lang === 'AZ' ? 'MƏKTUBU GÖNDƏR' : lang === 'RU' ? 'ОТПРАВИТЬ' : 'SEND MESSAGE'}
                    <Send size={13} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Google Maps Embed Section */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-mono tracking-[0.3em] text-[#b50e5f] uppercase font-bold">
          {lang === 'AZ' ? 'XƏRİTƏDƏ YERİMİZ' : lang === 'RU' ? 'МЫ НА КАРТЕ' : 'OFFICE LOCATION'}
        </h4>
        <div className="aspect-[21/9] w-full bg-neutral-50 border border-neutral-200 overflow-hidden hover:grayscale-0 hover:brightness-100 transition-all duration-700 rounded-sm shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4284568858348!2d49.85458057655034!3d40.377218658117765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0f983a54d5%3A0xe549fb1fcff96b1b!2sPort%20Baku%20Towers!5e0!3m2!1sen!2saz!4v1717411122340!5m2!1sen!2saz!4v1717411122340!5m2!1sen!2saz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Eyvazoğlu Casting - Port Baku Towers"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
