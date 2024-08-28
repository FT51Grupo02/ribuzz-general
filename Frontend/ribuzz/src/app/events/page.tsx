'use client'

import React, { useState, useEffect } from "react";
import CardEvents from "@/components/Cards/cardevents";
import SearchBarEvents from "@/components/SearchBar/SearchBarEvents";
import PaginatorCyan from "@/components/Paginator/PaginatorCyan";
import Image from "next/image";

const Events: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // Ajusta esto según los datos obtenidos

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:3000/events");
                const data = await response.json();
                console.log("Fetched events:", data); // Inspecciona los datos aquí
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error("Data is not an array:", data);
                    setEvents([]); // Establece un array vacío si los datos no son válidos
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]); // Establece un array vacío en caso de error
            }
        };

        fetchEvents();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start">
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
                className="text-center text-2xl md:text-3xl lg:text-4xl font-extralight"
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

            <PaginatorCyan
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Events;
