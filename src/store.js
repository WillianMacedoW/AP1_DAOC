import React, { createContext, useContext, useMemo, useState } from 'https://esm.sh/react@18.2.0';

const CartContext = createContext();

function getInitialCart() {
  try {
    const saved = localStorage.getItem('cart:v1');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart());
  const [message, setMessage] = useState('');

  function persist(next) {
    setItems(next);
    localStorage.setItem('cart:v1', JSON.stringify(next));
  }

  function addToCart(product) {
    setMessage('');
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const desired = existing.quantity + 1;
        if (desired > product.stock) {
          setMessage('Estoque máximo atingido');
          return prev;
        }
        const updated = prev.map(item => item.id === product.id ? { ...item, quantity: desired } : item);
        localStorage.setItem('cart:v1', JSON.stringify(updated));
        return updated;
      }
      if (product.stock <= 0) {
        setMessage('Produto esgotado');
        return prev;
      }
      const next = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart:v1', JSON.stringify(next));
      return next;
    });
  }

  function removeFromCart(id) {
    const next = items.filter(item => item.id !== id);
    persist(next);
  }

  function updateQuantity(id, delta) {
    setMessage('');
    setItems(prev => {
      const updated = prev
        .map(item => {
          if (item.id !== id) return item;
          const desired = item.quantity + delta;
          if (desired < 1) return { ...item, quantity: 1 };
          if (desired > item.stock) {
            setMessage('Estoque máximo atingido');
            return { ...item, quantity: item.stock };
          }
          return { ...item, quantity: desired };
        })
        .filter(item => item.quantity > 0);
      localStorage.setItem('cart:v1', JSON.stringify(updated));
      return updated;
    });
  }

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(() => ({ items, addToCart, removeFromCart, updateQuantity, total, message, setMessage }), [items, total, message]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
