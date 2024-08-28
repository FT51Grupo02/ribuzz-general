'use client';

import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../Context/CartContext';

export interface IProduct {
  name: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
  categoryId: number;
  id: number;
  quantity: number;
}

const CartItem: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const isCartEmpty = cart.length === 0;

  // Sanitizar cart
  const sanitizedCart = cart.map(product => ({
    ...product,
    price: Number(product.price) || 0,
    quantity: Number(product.quantity) || 1,
  }));

  // Calcular el total
  const total = sanitizedCart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="container mx-auto p-4 bg-black text-white">
      {isCartEmpty ? (
        <div className="text-center">
          <p className="text-xl font-bold mb-4">El carrito está vacío.</p>
          <Link href="/">
            <button className="bg-gradient-to-r from-[#C87DAB] to-[#C12886] hover:shadow-lg text-white font-bold py-2 px-4 rounded-full">
              Explora productos
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
          <div className="space-y-4">
            {sanitizedCart.map((product) => (
              <div key={product.id} className="flex justify-between items-center border-b border-gray-600 py-2">
                <div className="flex items-center">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={64} 
                    height={64} 
                    className="object-cover mr-4 rounded-lg"
                  />
                  <span>{product.name}</span>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => decreaseQuantity(product.id)} 
                    className="px-2 py-1 bg-gray-700 rounded-lg text-white"
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(product.id)} 
                    className="px-2 py-1 bg-gray-700 rounded-lg text-white"
                    disabled={product.quantity >= product.stock}
                  >
                    +
                  </button>
                  <span className="ml-4">${(product.price * product.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(product.id)} 
                    className="ml-4 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </span>
            <Link href="/cart/checkout">
              <button className="bg-gradient-to-r from-[#C87DAB] to-[#C12886] hover:shadow-lg text-white font-bold py-1 px-3 rounded-full">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
