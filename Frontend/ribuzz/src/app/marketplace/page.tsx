"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchBarServices from '@/components/SearchBar/SearchBarServices';
import PaginatorCyan from '@/components/Paginator/PaginatorCyan';
import CardServices from '@/components/Cards/cardsservices';
import { Service } from '@/components/Cards/types';

const Marketplace: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const totalPages = 3;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Llamada a la API para cargar datos de la página específica si es necesario
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/14.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 pb-10 shadow-2xl">
        <h2 className="max-sm:px-1 pt-3 text-center text-2xl md:text-3xl lg:text-4xl font-extralight text-black" style={{ fontFamily: 'Moonhouse, sans-serif', color: '#DADDE8', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.3)' }}>
          El mejor <span style={{ color: '#1EC9E5' }}>Marketplace</span> para Emprendedores
        </h2>
        <SearchBarServices />
        <CardServices services={services} />
        <PaginatorCyan
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Marketplace;
