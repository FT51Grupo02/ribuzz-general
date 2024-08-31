'use client'

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProductsProps {
  onFiltersChange: (filters: any) => void;
}

const SearchBarProducts: React.FC<SearchBarProductsProps> = ({ onFiltersChange }) => {
  const [search, setSearch] = useState<string>("");
  const [rating, setRating] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [price, setPrice] = useState<string>("all");
  const [popularity, setPopularity] = useState<string>("all");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(event.target.value);
  };

  const handlePopularityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPopularity(event.target.value);
  };

  const handleSearch = () => {
    onFiltersChange({
      search,
      rating,
      category,
      price,
      popularity
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col gap-4 max-w-5xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:justify-center">
          <div className="flex gap-4 w-full max-w-5xl">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border placeholder:text-gray-300 border-pink-700 bg-black bg-opacity-80 text-white rounded-lg w-full overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSearch}
                className="px-4 py-1.5 text-lg md:text-xl font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 text-gray-50 hover:filter hover:bg-white transition duration-300"
              >
                <span className="transition duration-300 hover:scale-110 inline-block text-lg">
                  Buscar
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
            <select
              value={rating}
              onChange={handleRatingChange}
              className="w-full px-4 py-2 border border-pink-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-ellipsis text-overflow-hidden"
            >
              <option value="all">Rating</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border border-pink-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-ellipsis text-overflow-hidden"
            >
              <option value="all">Categoría</option>
              <option value="electronics">Electrónica</option>
              <option value="fashion">Moda</option>
              <option value="home">Hogar</option>
              <option value="books">Libros</option>
            </select>

            <select
              value={price}
              onChange={handlePriceChange}
              className="w-full px-4 py-2 border border-pink-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-ellipsis text-overflow-hidden"
            >
              <option value="all">Precio</option>
              <option value="lowest">Más barato</option>
              <option value="highest">Más caro</option>
            </select>

            <select
              value={popularity}
              onChange={handlePopularityChange}
              className="w-full px-4 py-2 border border-pink-700 bg-black bg-opacity-80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-ellipsis text-overflow-hidden"
            >
              <option value="all">Popularidad</option>
              <option value="mostPopular">Más vendidos</option>
              <option value="leastPopular">Menos vendidos</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarProducts;
