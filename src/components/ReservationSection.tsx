'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SeatingType, ReservationData } from '../types';
import { Sparkles, Calendar, Clock, Users, Send, CheckCircle2, HeartHandshake } from 'lucide-react';

const availableTimeSlots = [
  '11:30', '12:30', '13:30', '17:30', '18:30', '19:30', '20:30'
];

export const ReservationSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ReservationData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    date: '',
    timeSlot: '18:30',
    guestCount: 2,
    seatingArea: 'tatami',
    specialNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.date) {
      alert('Mohon lengkapi nama, nomor telepon, dan tanggal reservasi.');
      return;
    }

    // Prepare WhatsApp Message or API payload
    const seatingLabels: Record<SeatingType, string> = {
      tatami: 'Tatami Room (座敷)',
      counter: 'Counter Bar (カウンター席)',
      table: 'Table Dining (テーブル席)',
      vip: 'Private VIP Room (個室)',
    };

    const message = `Halo Saraya Japanese Dining (沙羅屋), saya ingin konfirmasi reservasi meja:
- Nama: ${formData.customerName}
- Telepon: ${formData.customerPhone}
- Tanggal: ${formData.date}
- Jam: ${formData.timeSlot}
- Jumlah Tamu: ${formData.guestCount} Orang
- Pilihan Area: ${seatingLabels[formData.seatingArea]}
- Catatan Khusus: ${formData.specialNotes || 'Tidak ada'}`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    
    setIsSubmitted(true);
    // Optionally open WhatsApp after brief delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  return (
    <section id="reservation" className="py-24 bg-sumi-950 border-t border-sumi-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kogane-500/10 border border-kogane-500/30 text-kogane-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.reservation.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {t.reservation.title}
          </h2>

          <p className="text-sm sm:text-base text-bamboo-200 max-w-xl mx-auto font-sans">
            {t.reservation.subtitle}
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl bg-sumi-900/90 border border-sumi-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {t.reservation.successTitle}
              </h3>
              <p className="text-sm text-bamboo-200 max-w-md mx-auto leading-relaxed">
                {t.reservation.successMessage}
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-sumi-800 text-white text-xs hover:bg-sumi-700 transition-colors"
              >
                Buat Reservasi Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div>
                  <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                    {t.reservation.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder={t.reservation.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                    {t.reservation.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder={t.reservation.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors"
                  />
                </div>

              </div>

              {/* Email & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div>
                  <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                    {t.reservation.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder={t.reservation.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-kogane-400" />
                      {t.reservation.guestsLabel}
                    </span>
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {t.reservation.guestsUnit}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div>
                  <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-torii-500" />
                      {t.reservation.dateLabel} *
                    </span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-kogane-400" />
                      {t.reservation.timeLabel}
                    </span>
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors"
                  >
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} WIB
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Seating Type Preference (Japanese Seating) */}
              <div>
                <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-torii-glow" />
                    {t.reservation.seatingLabel}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seatingArea: 'tatami' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.seatingArea === 'tatami'
                        ? 'bg-torii-600/10 border-torii-500 text-white shadow-md'
                        : 'bg-sumi-950 border-sumi-800 text-bamboo-300 hover:border-sumi-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-white">座敷 • Tatami Room</span>
                      <span className="font-serif text-xs text-kogane-400">和風</span>
                    </div>
                    <p className="text-[11px] text-bamboo-300">{t.reservation.seatings.tatami}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seatingArea: 'counter' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.seatingArea === 'counter'
                        ? 'bg-torii-600/10 border-torii-500 text-white shadow-md'
                        : 'bg-sumi-950 border-sumi-800 text-bamboo-300 hover:border-sumi-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-white">カウンター • Counter Bar</span>
                      <span className="font-serif text-xs text-torii-glow">特等席</span>
                    </div>
                    <p className="text-[11px] text-bamboo-300">{t.reservation.seatings.counter}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seatingArea: 'table' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.seatingArea === 'table'
                        ? 'bg-torii-600/10 border-torii-500 text-white shadow-md'
                        : 'bg-sumi-950 border-sumi-800 text-bamboo-300 hover:border-sumi-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-white">テーブル • Table Dining</span>
                      <span className="font-serif text-xs text-bamboo-300">快適</span>
                    </div>
                    <p className="text-[11px] text-bamboo-300">{t.reservation.seatings.table}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, seatingArea: 'vip' })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      formData.seatingArea === 'vip'
                        ? 'bg-torii-600/10 border-torii-500 text-white shadow-md'
                        : 'bg-sumi-950 border-sumi-800 text-bamboo-300 hover:border-sumi-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-white">個室 • Private VIP Room</span>
                      <span className="font-serif text-xs text-kogane-400">極上</span>
                    </div>
                    <p className="text-[11px] text-bamboo-300">{t.reservation.seatings.vip}</p>
                  </button>

                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold text-bamboo-200 uppercase tracking-wider mb-2">
                  {t.reservation.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder={t.reservation.notesPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-sumi-950 border border-sumi-700 text-white text-sm focus:outline-none focus:border-torii-500 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-torii-600 hover:bg-torii-500 text-white font-medium text-base shadow-xl shadow-torii-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{t.reservation.submitBtn}</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
