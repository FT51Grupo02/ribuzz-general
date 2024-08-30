'use client';

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Crear contexto de Stripe
const StripeContext = createContext<Stripe | null>(null);

// Inicializar Stripe con la clave pública
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export const StripeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, []);

  return (
    <StripeContext.Provider value={stripe}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripeContext must be used within a StripeProvider');
  }
  return context;
};