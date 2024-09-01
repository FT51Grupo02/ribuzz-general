'use client'

import React, { useState, useEffect } from "react";
import CardEvents from "@/components/Cards/cardevents";
import SearchBarEvents from "@/components/SearchBar/SearchBarEvents";
import PaginatorEvents from "@/components/Paginator/PaginatorEvents";
import Image from "next/image";

const Events: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:3000/events?page=${currentPage}`);
                const data = await response.json();
                console.log("Eventos obtenidos:", data); 
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error("Los datos no son un arreglo:", data);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error al obtener los eventos:", error);
                setEvents([]);
            }
        };

        fetchEvents();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/12.png"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="relative z-10 pb-10 shadow-2xl">
            <h2
                className="max-sm:px-1 pt-3 text-center text-2xl md:text-3xl lg:text-4xl font-extralight text-black"
                style={{
                    fontFamily: 'Moonhouse, sans-serif',
                    color: '#DADDE8',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.3)'
                }}
            >
                Los mejores <span style={{ color: '#19BDDA' }}>Eventos</span> para Emprendedores
            </h2>

            <SearchBarEvents />

            <CardEvents events={events} currentPage={currentPage} />

            <PaginatorEvents
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    </div>
    );
};

export default Events;
