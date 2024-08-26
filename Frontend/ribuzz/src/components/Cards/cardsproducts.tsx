import React from 'react';
import { useRouter } from 'next/navigation';
import Card from './card';
import { Product } from '@/components/Cards/types'; 

interface CardProductsProps {
  products: Product[];
}

const CardProducts: React.FC<CardProductsProps> = ({ products }) => {
  const router = useRouter();

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product.id} 
              className="flex justify-center transition duration-300 transform hover:scale-105 shadow-lg rounded-lg overflow-hidden"
            >
              {product ? (
                <Card
                  name={product.name}
                  price={product.price.toString()}
                  image={product.images[0]} 
                  rating={product.rating}
                  description={product.description}
                  onClick={() => handleCardClick(product.id)}
                />
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-lg">Error: Producto no encontrado</div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg">No hay productos disponibles</div>
        )}
      </div>
    </div>
  );
};

export default CardProducts;
