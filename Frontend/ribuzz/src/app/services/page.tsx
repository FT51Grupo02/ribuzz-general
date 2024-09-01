"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CardServices from '@/components/Cards/cardsservices';
import PaginatorServices from '@/components/Paginator/PaginatorServices';
import SearchBarServices from '@/components/SearchBar/SearchBarServices';
import axios from 'axios';
import { Service } from '@/components/Cards/types';

const Services: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState<Service[]>([]); 
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    rating: 'all',
    publicationDate: 'all',
    popularity: 'all',
    location: 'all',
  });
  const servicesPerPage = 4;
  const totalPages = Math.ceil(services.length / servicesPerPage);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { search, rating, publicationDate, popularity, location } = filters;

        const response = await axios.get(`http://localhost:3000/search/services`, {
          params: {
            name: search || undefined,
            rating: rating !== 'all' ? rating : undefined,
            publicationDate: publicationDate !== 'all' ? publicationDate : undefined,
            orderPrice: undefined, // Añadir la lógica para el precio si es necesario
            populate: popularity === 'mostPopular' ? 'alta' : popularity === 'leastPopular' ? 'baja' : undefined,
            location: location !== 'all' ? location : undefined,
            page: currentPage,
          },
        });

        setServices(response.data || []);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchServices();
  }, [currentPage, filters]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    setFilteredServices(services.slice(startIndex, endIndex));
  }, [services, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/15.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 pb-10 shadow-2xl">
        <h2 className="max-sm:px-1 pt-3 text-center text-2xl md:text-3xl lg:text-4xl font-extralight text-black" style={{ fontFamily: 'Moonhouse, sans-serif', color: '#DADDE8', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.3)' }}>
          Los mejores <span style={{ color: '#19BDDA' }}>Servicios</span> de Emprendedores
        </h2>
        <SearchBarServices onSearch={handleFiltersChange} />
        <CardServices services={filteredServices} />
        <PaginatorServices
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Services;
