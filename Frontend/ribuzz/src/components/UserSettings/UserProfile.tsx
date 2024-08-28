'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/Context/AuthContext';
import { updateUserProfile } from '@/helpers/user.helper';

interface UserProfileFormProps {
  onSubmit: (values: { fullName: string; image: File | null }) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const [userData, setUserData] = useState<{ fullName: string; image: string | null }>({
    fullName: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string>('/0.png');
  const { token } = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fullName = localStorage.getItem('fullName') || 'Nombre de Usuario';
    const image = localStorage.getItem('image') || '/0.png';

    setUserData({ fullName, image });
    setImagePreview(image);
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    if (!file || !token) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No se ha encontrado el ID de usuario.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const updatedUser = await updateUserProfile(userId, formData, token);
      console.log('Imagen actualizada:', updatedUser);
      setImagePreview(URL.createObjectURL(file));
      onSubmit(updatedUser);
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
    }
  };

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
            <p className="mt-1 text-gray-300">{userData.fullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
  