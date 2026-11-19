'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Fish, Flame, Home } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-sumi-950 border-t border-sumi-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Japanese Touch */}
          <div className="relative">
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border border-sumi-800">
              <Image
                src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80"
                alt="Japanese Master Chef preparing authentic sashimi"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sumi-950 via-sumi-950/20 to-transparent" />
              
              {/* Floating Japanese Seal Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-sumi-900/90 backdrop-blur-md border border-sumi-700/80 flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg font-bold text-white">職人のこだわり (Artisan Spirit)</p>
                  <p className="text-xs text-bamboo-200">Setiap irisan dipotong dengan presisi dan rasa hormat.</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-torii-600/20 border border-torii-500/50 flex items-center justify-center text-torii-glow font-serif text-xl font-bold">
                  心
                </div>
              </div>
            </div>

            {/* Accent Kanji floating badge */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-sumi-900 border border-kogane-500/40 shadow-xl flex items-center justify-center text-kogane-400 font-serif text-2xl font-bold">
              沙
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-torii-600/10 border border-torii-600/30 text-torii-glow text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3 text-kogane-400" />
              {t.about.badge}
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {t.about.title}
            </h2>

            <p className="text-sm sm:text-base text-bamboo-200 mb-4 leading-relaxed font-sans">
              {t.about.desc1}
            </p>

            <p className="text-sm sm:text-base text-bamboo-200 mb-8 leading-relaxed font-sans">
              {t.about.desc2}
            </p>

            {/* 3 Pillars Grid */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-sumi-900/70 border border-sumi-800">
                <div className="p-2 rounded-lg bg-torii-600/20 text-torii-glow shrink-0">
                  <Fish className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-serif">{t.about.feature1Title}</h4>
                  <p className="text-xs text-bamboo-300 mt-0.5">{t.about.feature1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-sumi-900/70 border border-sumi-800">
                <div className="p-2 rounded-lg bg-kogane-500/20 text-kogane-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-serif">{t.about.feature2Title}</h4>
                  <p className="text-xs text-bamboo-300 mt-0.5">{t.about.feature2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-sumi-900/70 border border-sumi-800">
                <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-serif">{t.about.feature3Title}</h4>
                  <p className="text-xs text-bamboo-300 mt-0.5">{t.about.feature3Desc}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
