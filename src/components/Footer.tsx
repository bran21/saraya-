'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-sumi-950 border-t border-sumi-900 text-bamboo-200 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Japanese Watermark */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-5 font-serif text-[180px] font-bold text-white leading-none -mb-10 -mr-10">
        沙
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-torii-600 flex items-center justify-center text-white font-serif text-xl font-bold shadow-lg shadow-torii-600/30">
                沙
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-wider text-white">
                  SARAYA
                </span>
                <span className="font-serif text-xs text-kogane-400 font-semibold">沙羅屋</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-bamboo-300 leading-relaxed font-sans">
              {t.footer.desc}
            </p>

            <div className="p-3 rounded-xl bg-sumi-900 border border-sumi-800 text-xs">
              <span className="font-serif text-kogane-400 font-bold block mb-1">
                一期一会 (Ichigo Ichie)
              </span>
              <span className="text-bamboo-300">
                &ldquo;Hargai setiap perjumpaan sebagai momen berharga yang tak terulang.&rdquo;
              </span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-kogane-400" />
              {t.footer.openingHours}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-bamboo-300">
              <p className="text-white font-medium">{t.footer.tueSun}</p>
              <p className="text-torii-glow font-medium">{t.footer.mon}</p>
              <p className="pt-2 text-bamboo-300 border-t border-sumi-900">
                Last Order (LO): 21:15 WIB
              </p>
            </div>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-torii-500" />
              {t.footer.contactUs}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-bamboo-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bamboo-300 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bamboo-300 shrink-0" />
                <span>+62 812-3456-7890 / 021-555-888</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bamboo-300 shrink-0" />
                <span>concierge@sarayaresto.com</span>
              </p>
            </div>
          </div>

          {/* Socials & Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Social & Community
            </h4>
            <p className="text-xs text-bamboo-300 mb-4">
              Ikuti media sosial kami untuk pembaruan menu musiman dan reservasi Omakase.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-sumi-900 hover:bg-torii-600/20 hover:text-torii-glow border border-sumi-800 text-bamboo-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-sumi-900 hover:bg-torii-600/20 hover:text-torii-glow border border-sumi-800 text-bamboo-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sumi-900 flex flex-col sm:flex-row items-center justify-between text-xs text-bamboo-300 gap-4">
          <p>
            © {new Date().getFullYear()} Saraya Japanese Dining (沙羅屋). {t.footer.rights}
          </p>
          <div className="flex items-center space-x-6">
            <Link href="#hero" className="hover:text-white transition-colors">
              {t.nav.home}
            </Link>
            <Link href="#menu" className="hover:text-white transition-colors">
              {t.nav.menu}
            </Link>
            <Link href="#reservation" className="hover:text-white transition-colors">
              {t.nav.reservation}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
