'use client'
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '@/components/Checkout/Checkout';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

const CheckoutP: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/10.png" 
        alt="Background"
        layout="fill" 
        objectFit="cover"  
        quality={100} 
        className="absolute inset-0 -z-10"
      />

      <div className="relative">
          <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
           
      </div>
    </div>
  );
};

export default CheckoutP;
