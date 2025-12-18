"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/data/courses';

interface CartItem extends Course {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  updateQuantity: (courseId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  showSuccessPopup: boolean;
  setShowSuccessPopup: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const addToCart = (course: Course) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === course.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...course, quantity: 1 }];
    });
    setShowSuccessPopup(true);
    window.setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const removeFromCart = (courseId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === courseId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.amount.replace(/\./g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      showSuccessPopup,
      setShowSuccessPopup
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}