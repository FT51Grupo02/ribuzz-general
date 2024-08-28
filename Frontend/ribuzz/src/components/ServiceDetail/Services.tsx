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

export interface ServiceProps {
    name: string;
    description: string;
    images: string[];
    videos?: string[];
    providerInfo?: SellerInfo;
    details?: string[];
    reviews?: Review[];
    price: number;
    stock: number;
}

const Service: FC<ServiceProps> = ({
    name,
    description,
    images = [],
    videos = [],
    providerInfo = { name: '', contact: '' },
    details = [],
    reviews = [],
    price,
    stock,
}) => {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = () => {
        const serviceToAdd = {
            name,
            price,
            image: images[0], 
            description,
            stock,
            categoryId: 0, 
            id: Date.now(), 
        };

        addToCart(serviceToAdd);
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
            <div className="relative z-10 p-8 bg-black bg-opacity-80 rounded-lg shadow-lg max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-3/5">
                        <h1 className="text-4xl font-bold mb-8 text-cyan-400">{name}</h1>
                        <p className="mb-8 text-lg leading-relaxed">{description}</p>
                        <div className="mb-8">
                            {/* Contenedor cuadrado para video y fotos */}
                            <div className="relative w-full h-auto min-h-[400px] sm:min-h-[600px] lg:min-h-[600px]">
                                {/* Video en la parte superior */}
                                {videos.length > 0 && (
                                    <video controls className="absolute inset-0 w-full h-1/2 object-cover rounded-lg">
                                        <source src={videos[0]} type="video/mp4" />
                                    </video>
                                )}
                                {/* Imágenes en la parte inferior */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:grid-cols-4 gap-4 p-2">
                                    {images.length > 0 && images.map((img, idx) => (
                                        <div key={idx} className="relative w-full h-full mt-2 hover:scale-105 transition duration-300">
                                            <Image
                                                src={img}
                                                alt={`Service Image ${idx + 1}`}
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
                        <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Proveedor:</h2>
                        <p className="mb-4 text-lg"><strong>Nombre:</strong> {providerInfo.name || 'No disponible'}</p>
                        <p className="mb-8 text-lg"><strong>Contacto:</strong> {providerInfo.contact || 'No disponible'}</p>
                        {details?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Detalles:</h2>
                                <ul className="list-disc list-inside pl-6 text-lg space-y-2">
                                    {details.map((option, idx) => (
                                        <li key={idx}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Reseñas:</h2>
                            <div className="flex flex-col">

                                <div className="flex-grow">
                                    <ul className="space-y-6">
                                        {reviews.map((review, idx) => (
                                            <li key={idx} className="bg-opacity-80 bg-gradient-to-r from-cyan-600 to-cyan-400 p-6 rounded-lg hover:scale-105 transition duration-300">
                                                <p className="text-lg"><strong>{review.username}:</strong> {review.comment}</p>
                                                <p className="text-lg">Rating: {review.rating} / 5</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-center gap-6 mt-8 md:justify-center">
                                    <p className="text-white text-lg py-2 px-4 font-bold">
                                        Precio: ${price}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleAddToCart} 
                                        className="w-full sm:w-2/3 lg:w-1/2 p-3 text-white font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-700 shadow-md hover:shadow-lg transition-shadow text-sm md:text-base"
                                    >
                                        <span className="inline-block transition duration-300 hover:scale-110">
                                            Solicitar Servicio
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

export default Service;
