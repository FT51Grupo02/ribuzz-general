'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import PayCard from './PayCard';
import Swal from 'sweetalert2';

const Checkout: React.FC = () => {
    const { user, token } = useAuth();
    const { cart, clearCart } = useCart();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [orderDate, setOrderDate] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        const date = new Date();
        setOrderDate(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
    }, []);

    // Sanitizar cart
    const sanitizedCart = cart.map(product => ({
        ...product,
        price: Number(product.price) || 0,
    }));

    // Calcular el total
    const total = sanitizedCart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Detalles de la orden</h1>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/2 mb-4">
                    <div className="bg-transparent p-6 rounded-lg shadow-lg border border-transparent">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Información del usuario</h2>
                        {user ? (
                            <div className="space-y-4">
                                <div className="py-2">
                                    <p className="text-sm font-medium">Nombre:</p>
                                    <p className="text-lg font-semibold">{user.name}</p>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm font-medium">Email:</p>
                                    <p className="text-lg font-semibold">{user.email}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400">Información de usuario no encontrada.</p>
                        )}
                        <div className="mt-6 pt-4 border-t border-gray-600">
                            <p className="text-sm font-medium">Día y hora de la orden:</p>
                            <p className="text-lg font-semibold">{orderDate}</p>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="bg-transparent p-4 rounded-lg shadow-lg border border-transparent">
                        <h2 className="text-xl font-bold mb-2">Productos</h2>
                        {cart.length === 0 ? (
                            <p>No hay productos.</p>
                        ) : (
                            <div className="space-y-4">
                                {sanitizedCart.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center border-b py-2 border-gray-600">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4 rounded-lg" />
                                            <span>{product.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-4">Cant: {product.quantity}</span>
                                            <span>${(product.price * product.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <h2 className="text-xl font-bold mb-2">Resumen de la orden</h2>
                            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <PayCard /> 
            </div>
            <div className="mt-8 text-center">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    /* onClick={handlePlaceOrder} */
                    className={`max-w-xs p-3 md:p-4 mb-4 text-white font-semibold rounded-full bg-gradient-to-r from-[#C87DAB] to-[#C12886] shadow-md hover:shadow-lg transition-shadow text-sm md:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Realizar compra'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;


