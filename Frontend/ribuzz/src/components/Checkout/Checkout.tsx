'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/Context/CartContext';
import { useAuth } from '../Context/AuthContext';
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

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Detalles de la orden</h1>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/2 mb-4">
                    <div className="bg-transparent p-6 rounded-lg shadow-lg border border-transparent">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Informacion del usuario</h2>
                        {user ? (
                            <div className="space-y-4">
                                <div className="py-2">
                                    <p className="text-sm font-medium">Name:</p>
                                    <p className="text-lg font-semibold">{user.name}</p>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm font-medium">Email:</p>
                                    <p className="text-lg font-semibold">{user.email}</p>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm font-medium">Shipping Address:</p>
                                    <p className="text-lg font-semibold">{user.address}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400">User information not found.</p>
                        )}
                        <div className="mt-6 pt-4 border-t border-gray-600">
                            <p className="text-sm font-medium">Dia y hora de la orden:</p>
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
                                {cart.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center border-b py-2 border-gray-600">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4 rounded-lg" />
                                            <span>{product.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span>${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <h2 className="text-xl font-bold mb-2">Resumen de la orden</h2>
                            <p><strong>Total:</strong> ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
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


/* 'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/Context/CartContext';
import { useAuth } from '../Context/AuthContext';
 import { createOrder } from '@/helpers/orders.helper'; 
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

     const handlePlaceOrder = async () => {
        setLoading(true);
        setError(null);

        if (!token) {
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }

        try {
            await createOrder(cart.map(product => product.id), token);
            await Swal.fire({
                title: 'Success!',
                text: 'Thank you for your purchase!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            clearCart();
            router.push('/');
        } catch (error) {
            console.error('Error placing the order:', error);
            setError('There was a problem with your order. Please try again.');
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem with your order. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setLoading(false);
    };
 
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/2 mb-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">User Information</h2>
                        {user ? (
                            <div className="space-y-4">
                                <div className="py-2">
                                    <p className="text-sm font-medium text-gray-600">Name:</p>
                                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm font-medium text-gray-600">Email:</p>
                                    <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm font-medium text-gray-600">Shipping Address:</p>
                                    <p className="text-lg font-semibold text-gray-800">{user.address}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600">User information not found.</p>
                        )}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-600">Order Date and Time:</p>
                            <p className="text-lg font-semibold text-gray-800">{orderDate}</p>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-2">Cart Products</h2>
                        {cart.length === 0 ? (
                            <p>No products in the cart.</p>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center border-b py-2">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                            <span>{product.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span>${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                            <p><strong>Total:</strong> ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    onClick={handlePlaceOrder} 
                    className={`bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </div>
            
        </div>
    );
};

export default Checkout; */