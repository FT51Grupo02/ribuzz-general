"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CardProducts from '@/components/Cards/cardsproducts';
import PaginatorPink from '@/components/Paginator/PaginatorPink';
import SearchBarProducts from '@/components/SearchBar/SearchBarProducts';
import axios from 'axios';
import { Product } from '@/components/Cards/types';

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    rating: 'all',
    category: 'all',
    price: 'all',
    location: 'all'
  });
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { search, rating, category, price, location } = filters;
        const response = await axios.get(`http://localhost:3000/search/products`, {
          params: {
            page: currentPage,
            search,
            rating: rating !== 'all' ? rating : undefined,
            category: category !== 'all' ? category : undefined,
            price: price !== 'all' ? price : undefined,
            location: location !== 'all' ? location : undefined
          }
        });
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, [currentPage, filters]);

  useEffect(() => {
    // Filtrar los productos para la página actual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [products, currentPage]);

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
          src="/3.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 pb-10 shadow-2xl">
        <h2 className="max-sm:px-1 pt-3 text-center text-2xl md:text-3xl lg:text-4xl font-extralight text-black" style={{ fontFamily: 'Moonhouse, sans-serif', color: '#DADDE8', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.3)' }}>
          Los mejores <span style={{ color: '#DF3381' }}>Productos</span> de Emprendedores
        </h2>
        <SearchBarProducts onFiltersChange={handleFiltersChange} />
        <CardProducts products={filteredProducts} />
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
