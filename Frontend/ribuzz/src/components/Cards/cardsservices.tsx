import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from './card';
import { Service } from '@/components/Cards/types';

interface CardServicesProps {
  services: Service[];
}

const CardServices: React.FC<CardServicesProps> = ({ services }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (serviceId: string) => {
    router.push(`/service/${serviceId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-t-cyan-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.length > 0 ? (
          services.map((service) => (
            <div 
              key={service.id} 
              className="flex justify-center transition duration-300 transform hover:scale-105 shadow-lg rounded-lg overflow-hidden"
            >
              {service ? (
                <Card
                  name={service.name}
                  price={service.price.toString()}
                  image={service.images[0]} 
                  rating={service.rating}
                  description={service.description}
                  onClick={() => handleCardClick(service.id)}
                />
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-lg">Error: Servicio no encontrado</div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg">No hay servicios disponibles</div>
        )}
      </div>
    </div>
  );
};

export default CardServices;
