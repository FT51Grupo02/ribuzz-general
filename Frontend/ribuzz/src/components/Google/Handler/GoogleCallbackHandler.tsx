'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/Context/AuthContext';

const GoogleCallbackHandler = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      // Extraer el token de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          // Guardar el token en el almacenamiento local y en el contexto
          localStorage.setItem('authToken', token);
          setToken(token);
          router.push('/'); // Redirige a la página principal o a la ruta deseada
        } catch (error) {
          console.error('Error al guardar el token:', error);
        }
      } else {
        console.error('Token no encontrado en la URL');
      }
    };

    fetchToken();
  }, [router, setToken]);

  return <div>Procesando autenticación...</div>;
};

export default GoogleCallbackHandler;
