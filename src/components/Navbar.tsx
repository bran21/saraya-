'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Language } from '../types';
import { ShoppingBag, Globe, ChevronDown, Menu, X, UtensilsCrossed, Calendar } from 'lucide-react';

const languageOptions: { code: Language; label: string; nativeName: string; flag: string }[] = [
  { code: 'ja', label: '日本語', nativeName: 'Japanese', flag: '🇯🇵' },
  { code: 'id', label: 'Indonesia', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
];

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangObj = languageOptions.find((l) => l.code === language) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-sumi-950/90 border-b border-sumi-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Kanji Seal */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-lg bg-torii-600 flex items-center justify-center text-white shadow-lg shadow-torii-600/30 border border-torii-500 transform group-hover:scale-105 transition-transform duration-200">
              <span className="font-serif text-2xl font-bold tracking-widest">沙</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-bamboo-50 group-hover:text-torii-glow transition-colors">
                  SARAYA
                </span>
                <span className="font-serif text-xs text-kogane-400 font-semibold">沙羅屋</span>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-bamboo-300 font-sans">
                {t.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#hero"
              className="text-sm font-medium text-bamboo-200 hover:text-white transition-colors duration-150"
            >
              {t.nav.home}
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-bamboo-200 hover:text-white transition-colors duration-150"
            >
              {t.nav.about}
            </Link>
            <Link
              href="#menu"
              className="text-sm font-medium text-bamboo-200 hover:text-white transition-colors duration-150 flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-4 h-4 text-torii-500" />
              {t.nav.menu}
            </Link>
            <Link
              href="#reservation"
              className="text-sm font-medium text-bamboo-200 hover:text-white transition-colors duration-150 flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-kogane-500" />
              {t.nav.reservation}
            </Link>
          </nav>

          {/* Actions: Multi-language Dropdown & Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Language Selector Dropdown (i18n) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-sumi-800/80 border border-sumi-700/80 text-bamboo-100 hover:border-torii-600/60 hover:text-white transition-all text-sm font-medium shadow-sm"
                aria-label="Select Language"
              >
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="hidden sm:inline font-sans">{currentLangObj.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-bamboo-300 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-sumi-900 border border-sumi-700/80 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-lg">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-bamboo-300 tracking-wider uppercase border-b border-sumi-800 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-kogane-400" />
                    Pilih Bahasa / 言語
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-sumi-800 transition-colors ${
                        language === opt.code
                          ? 'text-torii-glow font-semibold bg-torii-600/10'
                          : 'text-bamboo-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-lg">{opt.flag}</span>
                        <div>
                          <div className="text-sm leading-tight">{opt.label}</div>
                          <div className="text-[11px] text-bamboo-300">{opt.nativeName}</div>
                        </div>
                      </div>
                      {language === opt.code && (
                        <div className="w-2 h-2 rounded-full bg-torii-500 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-sumi-800/80 border border-sumi-700/80 text-bamboo-100 hover:border-torii-600/60 hover:text-white transition-all shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-bamboo-100" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-torii-600 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-sumi-800/80 text-bamboo-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sumi-950/95 border-b border-sumi-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bamboo-100 hover:bg-sumi-800"
          >
            {t.nav.home}
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bamboo-100 hover:bg-sumi-800"
          >
            {t.nav.about}
          </Link>
          <Link
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bamboo-100 hover:bg-sumi-800"
          >
            {t.nav.menu}
          </Link>
          <Link
            href="#reservation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-bamboo-100 hover:bg-sumi-800"
          >
            {t.nav.reservation}
          </Link>
        </div>
      )}
    </header>
  );
};
