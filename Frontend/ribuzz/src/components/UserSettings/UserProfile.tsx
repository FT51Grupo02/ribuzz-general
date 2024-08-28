'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Context/AuthContext';
import { updateUserProfile } from '@/helpers/user.helper';

interface UserProfileFormProps {
  onSubmit: (values: { fullName: string; image: File | null }) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const { user, token } = useAuth();
  const [imagePreview, setImagePreview] = useState<string>(user?.photo || '/0.png');

  useEffect(() => {
    if (user) {
      setImagePreview(user.photo || '/0.png');
    }
  }, [user]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    if (!file || !token || !user) return;

    const formData = new FormData();
    formData.append('image', file);

  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={imagePreview}
            alt="Perfil"
            className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="absolute bottom-0 right-0 opacity-0 w-10 h-10 cursor-pointer"
          />
        </div>
        <div className="ml-4 flex flex-col justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Nombre de Usuario
            </label>
            <p className="mt-1 text-gray-300">{user?.name || 'Nombre de Usuario'}</p>
            <label className="block text-sm font-medium text-gray-300 mt-4">
              Email
            </label>
            <p className="mt-1 text-gray-300">{user?.email || 'Nombre de Usuario'}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
