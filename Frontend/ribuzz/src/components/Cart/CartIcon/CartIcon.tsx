import React, { useState } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from '@/components/Context/CartContext';

export interface IProduct {
  name: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
  categoryId: number;
  id: number;
}

interface CartIconProps {
  className?: string;
  isActive: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ className, isActive }) => {
  const { cart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
       className={`flex items-center p-1 rounded-full hover:ring-2 hover:ring-white`}   /* ${isActive ? 'bg-white' : ''} ${isActive ? 'filter invert' : ''} */
         /* onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
        aria-label="Cart" */
      >
        <Image
          src="/cart.png"
          alt="Cart"
          width={30}
          height={40}
          className="transition duration-300"
        />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -translate-x-1/2 translate-y-1/2">
            {cart.length}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-60 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50"
          role="menu"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Cart</h3>
            <button 
              onClick={() => setDropdownOpen(false)} 
              className="text-gray-600 hover:text-black"
              aria-label="Close cart"
            >
              <FaTimes size={16} />
            </button>
          </div>
          <ul className="space-y-2">
            {cart.map((item: IProduct) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name}</span>
                <span>x ${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
