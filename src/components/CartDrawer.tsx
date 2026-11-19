'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, AlertCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalIdr,
    subtotalJpy,
    taxIdr,
    taxJpy,
    totalIdr,
    totalJpy,
  } = useCart();

  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;

    if (orderType === 'dine-in' && !tableNumber.trim()) {
      alert('Silakan masukkan nomor meja untuk pesanan Dine-in.');
      return;
    }

    // Generate WhatsApp text
    const itemListText = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.menuItem.nameKanji} (${i.menuItem.nameRomaji}) x${i.quantity} = ${formatPrice(
            i.menuItem.priceIdr * i.quantity,
            i.menuItem.priceJpy * i.quantity
          )}`
      )
      .join('\n');

    const message = `🍱 *PESANAN BARU - SARAYA JAPANESE DINING (沙羅屋)*
---------------------------------------
*Tipe Pesanan*: ${orderType === 'dine-in' ? `Dine-In (${tableNumber})` : 'Takeaway (Ambil di tempat)'}
*Waktu*: ${new Date().toLocaleTimeString('id-ID')}

*Daftar Pesanan*:
${itemListText}

---------------------------------------
*Subtotal*: ${formatPrice(subtotalIdr, subtotalJpy)}
*Pajak & Layanan (11%)*: ${formatPrice(taxIdr, taxJpy)}
*TOTAL*: ${formatPrice(totalIdr, totalJpy)}

*Catatan Tambahan*: ${orderNotes || 'Tidak ada'}
---------------------------------------
Mohon konfirmasi pesanan saya. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-sumi-950 border-l border-sumi-800 text-white flex flex-col h-full shadow-2xl z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-sumi-800 flex items-center justify-between bg-sumi-900/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-torii-500" />
            <h3 className="font-serif text-lg font-bold">{t.cart.title}</h3>
            <span className="px-2 py-0.5 rounded-full bg-torii-600/20 text-torii-glow text-xs font-semibold">
              {items.length} item
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-bamboo-300 hover:text-white hover:bg-sumi-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-12 h-12 text-sumi-700 mx-auto mb-3" />
              <p className="font-serif text-base font-semibold text-bamboo-200">{t.cart.empty}</p>
              <p className="text-xs text-bamboo-300 mt-1">{t.cart.emptySubtitle}</p>
            </div>
          ) : (
            items.map(({ menuItem, quantity }) => (
              <div
                key={menuItem.id}
                className="p-3 rounded-2xl bg-sumi-900/80 border border-sumi-800 flex gap-3 items-center justify-between"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-sumi-800">
                  <Image
                    src={menuItem.image}
                    alt={menuItem.nameRomaji}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="font-serif text-sm font-bold text-white truncate">
                    {menuItem.nameTranslated[language] || menuItem.nameRomaji}
                  </h4>
                  <p className="text-[11px] font-serif text-kogane-400 truncate">
                    {menuItem.nameKanji}
                  </p>
                  <p className="text-xs font-semibold text-bamboo-200 mt-1">
                    {formatPrice(menuItem.priceIdr * quantity, menuItem.priceJpy * quantity)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 shrink-0 bg-sumi-950 px-2 py-1 rounded-lg border border-sumi-800">
                  <button
                    onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                    className="p-1 text-bamboo-300 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-1 text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                    className="p-1 text-bamboo-300 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFromCart(menuItem.id)}
                    className="p-1 text-red-400 hover:text-red-300 ml-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-sumi-800 bg-sumi-900/90 space-y-4">
            
            {/* Order Option Toggle */}
            <div>
              <span className="block text-[11px] font-semibold text-bamboo-300 uppercase mb-2">
                {t.cart.orderTypeLabel}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    orderType === 'dine-in'
                      ? 'bg-torii-600 text-white border-torii-500 shadow'
                      : 'bg-sumi-950 text-bamboo-200 border-sumi-800 hover:border-sumi-700'
                  }`}
                >
                  {t.cart.dineIn}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-torii-600 text-white border-torii-500 shadow'
                      : 'bg-sumi-950 text-bamboo-200 border-sumi-800 hover:border-sumi-700'
                  }`}
                >
                  {t.cart.takeaway}
                </button>
              </div>
            </div>

            {/* Table Number if Dine In */}
            {orderType === 'dine-in' && (
              <div>
                <label className="block text-[11px] font-semibold text-bamboo-300 uppercase mb-1">
                  {t.cart.tableNumberLabel} *
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder={t.cart.tableNumberPlaceholder}
                  className="w-full px-3 py-2 rounded-xl bg-sumi-950 border border-sumi-700 text-xs text-white focus:outline-none focus:border-torii-500"
                />
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-bamboo-200 pt-2 border-t border-sumi-800">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="text-white font-medium">{formatPrice(subtotalIdr, subtotalJpy)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.cart.tax}</span>
                <span className="text-white font-medium">{formatPrice(taxIdr, taxJpy)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-sumi-800">
                <span className="font-serif">{t.cart.total}</span>
                <span className="text-torii-glow text-base font-sans">{formatPrice(totalIdr, totalJpy)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{t.cart.checkoutBtn}</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full py-2 text-[11px] text-bamboo-300 hover:text-red-400 transition-colors"
              >
                {t.cart.clearCart}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
