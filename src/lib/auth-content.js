'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CounterContext = createContext();

// Utility functions for cookie management
const setCookie = (name, value, days) => {
  if (typeof document !== 'undefined') {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
};

const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

const eraseCookie = (name) => {
  if (typeof document !== 'undefined') {
    document.cookie = name + '=; Max-Age=-99999999; path=/;';
  }
};

export function CounterProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const savedCart = getCookie('cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to parse cart from cookies:", error);
          setCart([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setCookie('cart', JSON.stringify(cart), 7); // Cookie expires in 7 days
    }
  }, [cart]);

  // Counter functions
  const increment = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const decrement = () => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };

  // Cart functions
  const addItem = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }
      setCookie('cart', JSON.stringify(updatedCart), 7); // Update cookie
      return updatedCart;
    });
  };

  const removeItem = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      setCookie('cart', JSON.stringify(updatedCart), 7); // Update cookie
      return updatedCart;
    });
  };

  const increaseQuantity = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCookie('cart', JSON.stringify(updatedCart), 7); // Update cookie
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCookie('cart', JSON.stringify(updatedCart), 7); // Update cookie
      return updatedCart;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.product_variant.discounted_price !== null ? item.product_variant.discounted_price : item.product_variant.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    eraseCookie('cart');
  };

  return (
    <CounterContext.Provider
      value={{
        counter,
        increment,
        decrement,
        cart,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
        getTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
