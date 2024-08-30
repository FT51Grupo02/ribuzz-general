'use client'

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '@/components/Checkout/Checkout';
import Image from 'next/image';
import { useStripeContext } from '@/components/Context/StripeContext'; 

const CheckoutP: React.FC = () => {
  const stripe = useStripeContext();

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
        {stripe && (
          <Elements stripe={stripe}>
            <Checkout />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CheckoutP;
