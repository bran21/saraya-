'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCount: number;
  subtotalIdr: number;
  subtotalJpy: number;
  taxIdr: number;
  taxJpy: number;
  totalIdr: number;
  totalJpy: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('saraya_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saraya_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (menuItem: MenuItem, notes?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + 1, notes: notes || i.notes }
            : i
        );
      }
      return [...prev, { menuItem, quantity: 1, notes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.menuItem.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalIdr = items.reduce(
    (sum, item) => sum + item.menuItem.priceIdr * item.quantity,
    0
  );
  const subtotalJpy = items.reduce(
    (sum, item) => sum + item.menuItem.priceJpy * item.quantity,
    0
  );

  const taxIdr = Math.round(subtotalIdr * 0.11);
  const taxJpy = Math.round(subtotalJpy * 0.11);

  const totalIdr = subtotalIdr + taxIdr;
  const totalJpy = subtotalJpy + taxJpy;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        subtotalIdr,
        subtotalJpy,
        taxIdr,
        taxJpy,
        totalIdr,
        totalJpy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
