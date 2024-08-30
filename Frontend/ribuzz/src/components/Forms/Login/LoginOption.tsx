'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { FormValues } from '../../../interfaces/FormValues';
import Image from 'next/image';

// Definir el esquema de validación usando Yup
const validationSchema = Yup.object({
  userType: Yup.string().oneOf(['emprendedor', 'cliente'], 'Selecciona una opción').required('Selecciona una opción'),
});

const LoginOption = () => {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
    if (values.userType === 'emprendedor') {
      router.push('/login/entrepeneur');
    } else if (values.userType === 'cliente') {
      router.push('/login/user');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* Imagen para pantallas grandes */}
      <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
        <Image 
          src="/14.png" 
          alt="Imagen de fondo" 
          fill 
          style={{ objectFit: 'cover' }} 
          quality={100}
        />
      </div>
     
      {/* Sección del Formulario */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-black text-white relative z-10">
        {/* Imagen en la parte superior solo en móviles */}
        <div className="md:hidden relative w-full mb-4">
          <Image 
            src="/5.png" 
            alt="Logo" 
            width={200} 
            height={100}
            className="mx-auto"
          />
        </div>
        <div className="w-full max-w-sm md:max-w-lg p-6 md:p-8 bg-[#000000] rounded-xl shadow-lg">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6">INGRESAR</h1>
          <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Elige una opción:</h3>
          <Formik
            initialValues={{ userType: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-full">
                {/* Cambiamos a diseño de columna para los botones */}
                <div className="flex flex-col gap-4 mb-4">
                  <button
                    type="submit"
                    className="w-full p-3 md:p-4 text-base md:text-lg text-white font-semibold rounded-full bg-gradient-to-r from-[#C87DAB] to-[#C12886] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform whitespace-nowrap"
                    onClick={() => setFieldValue('userType', 'emprendedor')}
                  >
                    CUENTA DE EMPRENDEDOR
                  </button>
                  <button
                    type="submit"
                    className="w-full p-3 md:p-4 text-base md:text-lg text-white font-semibold rounded-full bg-gradient-to-r from-[#C87DAB] to-[#C12886] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform whitespace-nowrap"
                    onClick={() => setFieldValue('userType', 'cliente')}
                  >
                    CUENTA DE USUARIO
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginOption;
