'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2'; 

export interface IProduct {
  name: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
  categoryId: number;
  id: number;
}

interface CartContextProps {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {
    console.warn('addToCart not implemented');
  },
  removeFromCart: () => {
    console.warn('removeFromCart not implemented');
  },
  clearCart: () => {
    console.warn('clearCart not implemented');
  },
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth(); 
  const [cart, setCart] = useState<IProduct[]>([]);

  useEffect(() => {
    if (token) {
      loadGlobalCart();
    } else {
      setCart([]);
    }
  }, [token]);

  useEffect(() => {
    if (token && cart.length > 0) {
      saveCartForUser();
    }
  }, [cart, token]);

  const loadGlobalCart = () => {
    if (typeof window !== 'undefined' && token) {
      const storedCart = localStorage.getItem(`cart_${token}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    }
  };

  const saveCartForUser = () => {
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem(`cart_${token}`, JSON.stringify(cart));
    }
  };

  const addToCart = (product: IProduct) => {
    if (!token) {
      Swal.fire({
        title: 'Por favor, inicia sesion!',
        text: 'Debes iniciar sesion para realizar una compra.',
        icon: 'error',
        confirmButtonText: 'Inicia Sesion'
      }).then(() => {
        window.location.href = '/login';
      });
      return;
    }

    const isProductInCart = cart.some(cartItem => cartItem.id === product.id);
    if (isProductInCart) {
      Swal.fire({
        title: 'Ojo!',
        text: 'Este producto ya se encuentra en el carrito.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    setCart(prevCart => {
      const updatedCart = [...prevCart, product].sort((a, b) => a.price - b.price);
      return updatedCart;
    });
    Swal.fire({
      title: 'Exito!',
      text: 'Producto añadido al carrito.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(product => product.id !== productId);
      return updatedCart;
    });
  };

  const clearCart = () => {
    if (typeof window !== 'undefined' && token) {
      localStorage.removeItem(`cart_${token}`);
      setCart([]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};