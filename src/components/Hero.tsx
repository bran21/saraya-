'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight, Clock, MapPin, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sumi-950 via-sumi-900 to-sumi-950 pt-8 pb-16">
      
      {/* Decorative Traditional Japanese Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-torii-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-kogane-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Vertical Kanji Calligraphy (Traditional Japanese Wall Aesthetic) */}
      <div className="hidden lg:block absolute left-8 top-1/3 -translate-y-1/2 select-none pointer-events-none opacity-20">
        <p className="font-serif text-5xl tracking-[0.5em] text-bamboo-200 writing-vertical" style={{ writingMode: 'vertical-rl' }}>
          四季折々・本格和食の美
        </p>
      </div>
      <div className="hidden lg:block absolute right-8 top-1/3 -translate-y-1/2 select-none pointer-events-none opacity-20">
        <p className="font-serif text-5xl tracking-[0.5em] text-torii-glow writing-vertical" style={{ writingMode: 'vertical-rl' }}>
          一期一会・至福の馳走
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sumi-800/80 border border-torii-600/30 text-torii-glow text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-kogane-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Kanji Watermark / Sub-header */}
        <div className="font-serif text-base sm:text-lg text-kogane-400 font-semibold tracking-[0.3em] uppercase mb-3">
          沙羅屋 • SARAYA JAPANESE DINING
        </div>

        {/* Main Title with Japanese Serif font */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight sm:leading-snug">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-bamboo-200 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="#menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-torii-600 hover:bg-torii-500 text-white font-medium text-base shadow-lg shadow-torii-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>{t.hero.ctaMenu}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#reservation"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-sumi-800/90 hover:bg-sumi-700/90 border border-sumi-600/70 text-bamboo-50 font-medium text-base hover:border-kogane-500/50 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>{t.hero.ctaBook}</span>
          </Link>
        </div>

        {/* Quick Info Grid (Hours, Location, Chef Authenticity) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          
          <div className="p-4 rounded-2xl bg-sumi-900/60 border border-sumi-800/80 backdrop-blur-sm flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-torii-600/10 text-torii-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-bamboo-300 uppercase tracking-wider">{t.hero.openHoursLabel}</p>
              <p className="text-sm font-medium text-bamboo-100 mt-0.5">{t.hero.openHoursValue}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sumi-900/60 border border-sumi-800/80 backdrop-blur-sm flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-kogane-500/10 text-kogane-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-bamboo-300 uppercase tracking-wider">{t.hero.locationLabel}</p>
              <p className="text-sm font-medium text-bamboo-100 mt-0.5">{t.hero.locationValue}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sumi-900/60 border border-sumi-800/80 backdrop-blur-sm flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-matcha-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-bamboo-300 uppercase tracking-wider">Tokyo Master Chef</p>
              <p className="text-sm font-medium text-bamboo-100 mt-0.5">30+ Years Heritage Experience</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
