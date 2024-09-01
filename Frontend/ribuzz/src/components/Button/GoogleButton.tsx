'use client'

import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirige al usuario a la ruta de autenticación en tu backend
    window.location.href = 'http://localhost:3000/auth';
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center bg-[#303030] text-white p-3 rounded-lg text-base md:text-lg"
    >
      <FcGoogle className="w-6 h-6 md:w-7 md:h-7 mr-2 transition duration-300 hover:scale-110" />
      <span className="transition duration-300 hover:scale-110 inline-block text-lg">
        Google
      </span>
    </button>
  );
};

export default GoogleLoginButton;
