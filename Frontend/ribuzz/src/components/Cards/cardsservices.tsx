import React from 'react';
import Card from './card';
import { useRouter } from 'next/navigation';
import { services } from '../ServiceDetail/serviceData';

interface Service {
  id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  ribuzzRating: number;
  description: string;
  duration: string;
  providerInfo: {
    name: string;
    contact: string;
  };
  customizationOptions: string[];
  reviews: { username: string; comment: string; rating: number }[];
}

const CardServices: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (serviceId: string) => {
    router.push(`/service/${serviceId}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service: Service) => (
          <div key={service.id} className="flex justify-center transition duration-300 hover:scale-105">
            <Card
              name={service.name}
              price={service.price.toFixed(2)} 
              image={service.images[0]}
              rating={service.rating}
              description={service.description}
              onClick={() => handleCardClick(service.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardServices;
