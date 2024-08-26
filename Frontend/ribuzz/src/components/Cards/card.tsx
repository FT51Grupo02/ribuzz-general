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
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="flex flex-col p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p
          className="text-gray-700 mb-4 flex-grow overflow-hidden text-ellipsis overflow-hidden"
          style={{ maxHeight: '4.5rem', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
          title={description} 
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold">${price}</span>
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
