import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Event } from '@/components/Cards/types'; 
import { events as defaultEvents } from "../EventDetail/eventData";

interface CardEventsProps {
  events?: Event[];
}

const CardEvents: React.FC<CardEventsProps> = ({ events = defaultEvents }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-t-cyan-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <h2 className="text-white text-3xl md:text-5xl font-semibold drop-shadow-xl text-center">No hay eventos disponibles</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-6 lg:px-8">
      {events.map((event: Event) => (
        <div
          key={event.id}
          className="relative flex flex-col md:flex-row w-full max-w-4xl bg-black bg-opacity-90 shadow-lg rounded-lg overflow-hidden mb-6 hover:shadow-2xl border border-transparent hover:border-cyan-800 transition duration-300"
        >
          <div className="relative w-full md:w-1/3 lg:w-1/4 h-48 md:h-auto">
            <Image
              src={event.images[0]}
              alt={event.name}
              fill
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col justify-between w-full md:w-2/3 lg:w-3/4 p-4 md:p-6 lg:p-8">
            <div>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-cyan-500 drop-shadow-md">{event.name}</h2>
              <p className="text-white mt-2 text-sm md:text-lg lg:text-xl">{event.date} | {event.location}</p>
              <p className="text-gray-200 mt-2 md:mt-4 lg:mt-6 text-sm md:text-lg lg:text-xl leading-relaxed max-h-16 lg:max-h-24 overflow-hidden text-ellipsis">
                {event.description}
              </p>
            </div>

            <div className="flex flex-col mt-4 md:mt-6 lg:mt-8">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 text-sm md:text-lg lg:text-xl">
                  {Array.from({ length: event.rating }).map((_, index) => (
                    <span key={index} className="inline-block">★</span>
                  ))}
                </span>
              </div>
              <div className="text-gray-100 text-sm md:text-lg lg:text-xl">
                {event.time.join(' | ')}
              </div>
            </div>

            <button
              onClick={() => handleViewDetails(event.id)}
              className="transition duration-300 transform hover:scale-105 mt-4 md:mt-0 md:absolute md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg text-sm md:text-lg lg:text-xl"
            >
              Ver detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardEvents;
