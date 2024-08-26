'use client'
import Image from 'next/image';
import { FC } from 'react';
import { useCart } from '../Context/CartContext';
import { useRouter } from 'next/navigation';

export interface Review {
  username: string;
  comment: string;
  rating: number;
}

export interface SellerInfo {
  name: string;
  contact: string;
}

export interface ProductProps {
  name: string;
  description: string;
  images: string[];
  videos?: string[];
  sellerInfo?: SellerInfo;
  details?: string[];
  reviews?: Review[];
  ribuzzRating: number;
  price: number;
  stock: number;
}

const Product: FC<ProductProps> = ({
  name,
  description,
  images = [],
  videos = [],
  sellerInfo = { name: 'Desconocido', contact: 'No disponible' },
  details = [],
  reviews = [],
  ribuzzRating,
  price,
  stock
}) => {
  const { addToCart } = useCart();
  const router = useRouter(); 

  const handleAddToCart = () => {
      const productToAdd = {
          name,
          price,
          image: images[0], 
          description,
          stock,
          categoryId: 0, 
          id: Date.now(),
      };

      addToCart(productToAdd);
      router.push('/cart');
  };


  return (
    <div className="relative w-full h-full min-h-screen bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="/0.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
      </div>
      <div className="relative z-10 p-6 lg:p-8 bg-black bg-opacity-80 rounded-lg shadow-lg max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="lg:w-3/5">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-pink-500">{name}</h1>
            <p className="mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed">{description}</p>
            <div className="mb-6 lg:mb-8">
              {/* Contenedor cuadrado para video y fotos */}
              <div className="relative w-full h-auto min-h-[400px] sm:min-h-[600px] lg:min-h-[600px]">
                {/* Video en la parte superior */}
                {videos.length > 0 && (
                  <video controls className="absolute inset-0 w-full h-1/2 object-cover rounded-lg">
                    <source src={videos[0]} type="video/mp4" />
                  </video>
                )}
                {/* Imágenes en la parte inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 p-2">
                  {images.length > 0 && images.map((img, idx) => (
                    <div key={idx} className="relative w-full h-full mt-2 hover:scale-105 transition duration-300">
                      <Image
                        src={img}
                        alt={`Product Image ${idx + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-2/5">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-pink-400">Vendedor:</h2>
            <p className="mb-4 text-base lg:text-lg"><strong>Nombre:</strong> {sellerInfo.name}</p>
            <p className="mb-6 text-base lg:text-lg"><strong>Contacto:</strong> {sellerInfo.contact}</p>
            {details.length > 0 && (
              <div className="mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-pink-400">Detalles:</h2>
                <ul className="list-disc list-inside pl-4 lg:pl-6 text-base lg:text-lg space-y-2">
                  {details.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-pink-400">Reseñas:</h2>
              <div className="mb-4 text-base lg:text-lg">
                <strong>Valoración de RiBuzz:</strong> {ribuzzRating} / 5
              </div>
              <div className="flex flex-col">
                {/* Contenedor para alinear comentarios con la sección de imágenes */}
                <div className="flex-grow">
                  <ul className="space-y-4 lg:space-y-6">
                    {reviews.map((review, idx) => (
                      <li key={idx} className="bg-opacity-80 bg-gradient-to-r from-[#cc1184] to-[#a80054] p-4 lg:p-6 rounded-lg hover:scale-105 transition duration-300">
                        <p className="text-base lg:text-lg"><strong>{review.username}:</strong> {review.comment}</p>
                        <p className="text-base lg:text-lg">Rating: {review.rating} / 5</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center lg:flex-row lg:items-center gap-4 mt-6 lg:mt-8">
                  <p className="text-white text-base lg:text-lg py-2 px-4 font-bold">
                    Stock: {stock} u.
                  </p>
                  <p className="text-white text-base lg:text-lg py-2 px-4 font-bold">
                    Precio: ${price}
                  </p>
                  <button
                       type="button"
                          onClick={handleAddToCart}
                          className="w-full sm:w-2/3 lg:w-1/2 p-3 text-white font-semibold rounded-xl bg-gradient-to-r from-[#cc1184] to-[#a80054] shadow-md hover:shadow-lg transition-shadow text-sm md:text-base"
                          >
                          <span className="inline-block transition duration-300 hover:scale-110">
                            Agregar al carrito
                          </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
