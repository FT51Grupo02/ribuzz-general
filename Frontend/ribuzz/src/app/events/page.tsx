'use client'

import React, { useState } from "react";
import CardEvents from "@/components/Cards/cardevents";
import SearchBarEvents from "@/components/SearchBar/SearchBarEvents";
import PaginatorCyan from "@/components/Paginator/PaginatorCyan";
import Image from "next/image";

const Events: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    const handlePageChange = (page: number) => {
    setCurrentPage(page);
};

return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">

    <div className="absolute inset-0 -z-10">
        <Image
        src="/12.png"
        alt="Background Image"
        fill
        className="object-cover"
        quality={100}
        />
    </div>

    <h2
        className="max-sm:px-1 pt-3 text-center text-2xl md:text-3xl lg:text-4xl font-extralight"
        style={{
        fontFamily: 'Moonhouse, sans-serif',
        color: '#DADDE8',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.3)'
        }}
    > 
        Los mejores <span style={{ color: '#19BDDA' }}>Eventos</span> para Emprendedores
    </h2> 

    <SearchBarEvents />

    <CardEvents />

    <PaginatorCyan
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
    />
    </div>
  );
};

export default Events;
