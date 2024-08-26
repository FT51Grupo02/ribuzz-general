"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CardProducts from '@/components/Cards/cardsproducts';
import PaginatorPink from '@/components/Paginator/PaginatorPink';
import SearchBarProducts from '@/components/SearchBar/SearchBarProducts';
import { Product } from '@/types'; // Asegúrate de tener una interfaz Product definida en tu proyecto

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const totalPages = 3; // Ajustar este valor según la cantidad total de páginas

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Aquí podrías hacer una llamada a la API para cargar los datos de la página específica si es necesario
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/1.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 pb-10 shadow-2xl">
        <h2 className="max-sm:px-1 pt-3 text-center text-2xl md:text-3xl lg:text-4xl font-extralight text-black" style={{ fontFamily: 'Moonhouse, sans-serif', color: '#DADDE8', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.3)' }}>
          Los mejores <span style={{ color: '#cc1184' }}>Productos</span> de Emprendedores
        </h2>
        <SearchBarProducts />
        <CardProducts products={products} />
        <PaginatorPink
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
