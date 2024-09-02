"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";

interface SearchBarEventsProps {
  onFiltersChange: (filters: {
    search: string;
    rating: string;
    publicationDate: string;
    popularity: string;
    location: string;
  }) => void;
}

const SearchBarEvents: React.FC<SearchBarEventsProps> = ({ onFiltersChange }) => {
  const [search, setSearch] = useState<string>("");
  const [rating, setRating] = useState<string>("all");
  const [publicationDate, setPublicationDate] = useState<string>("all");
  const [popularity, setPopularity] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");

  // Debounced function to handle filters change
  const debouncedFiltersChange = debounce(() => {
    onFiltersChange({
      search,
      rating,
      publicationDate,
      popularity,
      location,
    });
  }, 300);

  useEffect(() => {
    debouncedFiltersChange();
  }, [search, rating, publicationDate, popularity, location]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col gap-4 max-w-5xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:justify-center">
          <div className="flex gap-4 w-full max-w-5xl">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border placeholder:text-gray-300 border-cyan-700 bg-black bg-opacity-80 text-white rounded-lg w-full overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-2 border border-cyan-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">Rating</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>

            <select
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              className="w-full px-4 py-2 border border-cyan-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">Fecha de publicación</option>
              <option value="last24h">Últimas 24 horas</option>
              <option value="lastWeek">Última semana</option>
              <option value="lastMonth">Último mes</option>
              <option value="lastYear">Último año</option>
            </select>

            <select
              value={popularity}
              onChange={(e) => setPopularity(e.target.value)}
              className="w-full px-4 py-2 border border-cyan-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">Popularidad</option>
              <option value="mostPopular">Más vendido</option>
              <option value="leastPopular">Menos vendido</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-cyan-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">Ubicación</option>
              <option value="nearby">Cerca de mí</option>
              <option value="city">En la ciudad</option>
              <option value="country">En el país</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarEvents;
