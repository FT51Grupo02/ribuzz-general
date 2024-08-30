import Checkout from '@/components/Checkout/Checkout';
import Image from 'next/image';
import React from 'react';

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
        <Checkout />
      </div>
    </div>
  );
}

export default CheckoutP;
