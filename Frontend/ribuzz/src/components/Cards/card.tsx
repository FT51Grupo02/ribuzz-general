import React from 'react';

interface CardProps {
  name: string;
  price: string;
  image: string;
  rating: number;
  description: string;
  onClick: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  name,
  price,
  image,
  rating,
  description,
  onClick,
  className
}) => {
  return (
    <div
      className={`cursor-pointer ${className} flex flex-col bg-white rounded-lg shadow-xl overflow-hidden`}
      style={{ width: '300px', height: '450px', minHeight: '450px' }}
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full object-cover rounded-t-lg"
        style={{ height: '200px', minHeight: '200px', objectFit: 'cover' }}
      />
      <div className="flex flex-col p-4 flex-grow">
        <h2 
          className="text-lg font-semibold mb-2"
          style={{ 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            maxWidth: '100%' 
          }}
        >
          {name}
        </h2>
        <p
          className="text-gray-700 flex-grow overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 5,  // Incrementamos el número de líneas visibles
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '7.5em', // Ajustamos la altura máxima acorde al número de líneas visibles
          }}
          title={description}
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span 
            className="text-xl font-bold"
            style={{ 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              maxWidth: '100%' 
            }}
          >
            ${price}
          </span>
          <span className="text-yellow-400">
            {Array.from({ length: rating }).map((_, index) => (
              <span key={index} className="inline-block text-lg">★</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
