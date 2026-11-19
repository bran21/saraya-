'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { japaneseMenuItems } from '../data/menuData';
import { MenuCategoryKey, MenuItem, MenuTag } from '../types';
import { Search, Plus, Sparkles, Check, Flame, ShieldCheck } from 'lucide-react';

const categoryKeys: { key: MenuCategoryKey; kanji: string }[] = [
  { key: 'all', kanji: '全' },
  { key: 'sushi', kanji: '鮨' },
  { key: 'ramen', kanji: '麺' },
  { key: 'donburi', kanji: '丼' },
  { key: 'izakaya', kanji: '肴' },
  { key: 'dessert', kanji: '甘' },
];

export const MenuSection: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<MenuTag | 'all'>('all');
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return japaneseMenuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag !== 'all' && !item.tags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchKanji = item.nameKanji.toLowerCase().includes(query);
        const matchRomaji = item.nameRomaji.toLowerCase().includes(query);
        const matchTranslated = item.nameTranslated[language]?.toLowerCase().includes(query);
        const matchDesc = item.description[language]?.toLowerCase().includes(query);
        return matchKanji || matchRomaji || matchTranslated || matchDesc;
      }
      return true;
    });
  }, [activeCategory, selectedTag, searchQuery, language]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setAddedItemEffect(item.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-24 bg-sumi-900 border-t border-sumi-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-torii-600/10 border border-torii-600/30 text-torii-glow text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-kogane-400" />
            <span>{t.menu.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {t.menu.title}
          </h2>

          <p className="text-sm sm:text-base text-bamboo-200 font-sans">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none gap-2">
            {categoryKeys.map(({ key, kanji }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === key
                    ? 'bg-torii-600 text-white shadow-lg shadow-torii-600/30'
                    : 'bg-sumi-800/80 text-bamboo-200 hover:text-white hover:bg-sumi-700/80 border border-sumi-700/50'
                }`}
              >
                <span className="font-serif text-xs px-1.5 py-0.5 rounded bg-black/20">{kanji}</span>
                <span>{t.menu.categories[key]}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-bamboo-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-sumi-800/80 border border-sumi-700 text-sm text-white placeholder-bamboo-300 focus:outline-none focus:border-torii-500 transition-colors"
            />
          </div>

        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 text-xs">
          <span className="text-bamboo-300 mr-1">Filter Label:</span>
          
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-full border transition-colors ${
              selectedTag === 'all'
                ? 'bg-bamboo-100 text-sumi-950 border-bamboo-100 font-semibold'
                : 'border-sumi-700 text-bamboo-300 hover:border-bamboo-300'
            }`}
          >
            Semua Label
          </button>

          <button
            onClick={() => setSelectedTag('chef')}
            className={`px-3 py-1 rounded-full border transition-colors flex items-center gap-1 ${
              selectedTag === 'chef'
                ? 'bg-kogane-500 text-sumi-950 border-kogane-500 font-semibold'
                : 'border-kogane-500/40 text-kogane-400 hover:border-kogane-400'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {t.menu.tags.chef}
          </button>

          <button
            onClick={() => setSelectedTag('halal')}
            className={`px-3 py-1 rounded-full border transition-colors flex items-center gap-1 ${
              selectedTag === 'halal'
                ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                : 'border-emerald-600/40 text-emerald-400 hover:border-emerald-400'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            {t.menu.tags.halal}
          </button>

          <button
            onClick={() => setSelectedTag('spicy')}
            className={`px-3 py-1 rounded-full border transition-colors flex items-center gap-1 ${
              selectedTag === 'spicy'
                ? 'bg-torii-600 text-white border-torii-600 font-semibold'
                : 'border-torii-600/40 text-torii-glow hover:border-torii-600'
            }`}
          >
            <Flame className="w-3 h-3" />
            {t.menu.tags.spicy}
          </button>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-sumi-950/40 rounded-2xl border border-sumi-800">
            <p className="text-bamboo-200 text-base">Tidak ada menu yang sesuai dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="mt-3 text-sm text-torii-glow hover:underline"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemEffect === item.id;
              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-sumi-950/80 border border-sumi-800 hover:border-torii-600/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-torii-600/10"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-52 w-full overflow-hidden bg-sumi-900">
                      <Image
                        src={item.image}
                        alt={item.nameRomaji}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sumi-950 via-transparent to-transparent opacity-80" />
                      
                      {/* Tags */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.tags.includes('chef') && (
                          <span className="px-2.5 py-0.5 rounded-full bg-kogane-500/90 text-sumi-950 text-[10px] font-bold tracking-wide uppercase shadow">
                            ★ {t.menu.tags.chef}
                          </span>
                        )}
                        {item.tags.includes('halal') && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold tracking-wide uppercase shadow">
                            ✓ {t.menu.tags.halal}
                          </span>
                        )}
                        {item.tags.includes('spicy') && (
                          <span className="px-2 py-0.5 rounded-full bg-torii-600/90 text-white text-[10px] font-bold tracking-wide uppercase shadow">
                            🌶️ {t.menu.tags.spicy}
                          </span>
                        )}
                      </div>

                      {/* Floating Japanese Kanji Badge */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-sumi-950/80 backdrop-blur-md border border-sumi-700/60 font-serif text-xs text-kogane-400 font-bold">
                        {item.nameKanji}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-torii-glow transition-colors">
                          {item.nameTranslated[language] || item.nameRomaji}
                        </h3>
                      </div>
                      
                      <p className="text-xs font-serif text-bamboo-300 italic mb-2.5">
                        {item.nameRomaji} • {item.nameKanji}
                      </p>

                      <p className="text-xs text-bamboo-200 line-clamp-3 leading-relaxed mb-4">
                        {item.description[language] || item.description.en}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="px-5 pb-5 pt-3 border-t border-sumi-900 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-bamboo-300 block uppercase tracking-wider">Harga / 料金</span>
                      <span className="text-base sm:text-lg font-bold text-white font-sans">
                        {formatPrice(item.priceIdr, item.priceJpy)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-95'
                          : 'bg-torii-600 hover:bg-torii-500 text-white shadow-md shadow-torii-600/20 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Ditambahkan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{t.menu.addToCart}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
