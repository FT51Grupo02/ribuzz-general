'use client';

import React from 'react';
import UserProfileForm from './UserProfile'
import UpdateProfileForm from './UpdateProfile';


const UserSettings: React.FC = () => {
  const handleUserProfileSubmit = (values: { fullName: string; image: File | null }) => {
    console.log('Perfil del usuario enviado:', values);
  };

  return (
    <div className="bg-black text-gray-300 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-6">Bienvenido a la Configuración</p>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex-1 bg-opacity-50 p-4 border border-gray-600 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Perfil</h3>
          <UserProfileForm onSubmit={handleUserProfileSubmit}  />
        </div>
        
        <div className="flex-1 bg-opacity-50 p-4 border border-gray-600 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Actualizar Perfil</h3>
          <UpdateProfileForm />
        </div>
      </div>
    
    </div>
  );
};

export default UserSettings;
