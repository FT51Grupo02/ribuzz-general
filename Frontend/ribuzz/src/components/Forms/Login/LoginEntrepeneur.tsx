'use client';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/components/Context/AuthContext'; // Importar el contexto de autenticación
import { ILoginPropsEntrep } from '@/interfaces/Types';

// Definir el esquema de validación usando Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Cuenta de email invalida').required('Requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe poseer 8 caracteres minimo')
    .matches(/[A-Z]/, 'La contraseña debe poseer al menos una mayuscula')
    .matches(/[!@#$%^&*]/, 'La contraseña debe poseer al menos un caracter especial')
    .required('Requerido'),
});

const LoginEntrepeneur = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser, setToken, loginEntrepeneurE } = useAuth(); // Obtener la función de login del contexto

  const handleSubmit = async (values: ILoginPropsEntrep) => {
    try {
      console.log("Valores enviados al backendEntrepreneur:", values);
      
      const isSuccess = await loginEntrepeneurE(values); // Llamar a la función de login con los valores del formulario
      if (isSuccess) {
        router.push('/'); // Redirigir al usuario después de un login exitoso
      } else {
        // Manejar el caso de login fallido aquí (mostrar mensajes, etc.)
        console.error("Login fallido, no se pudo redirigir");
        // Puedes agregar aquí código para mostrar un mensaje al usuario, por ejemplo:
        // alert("Email o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      // Manejar errores de login aquí (mostrar mensajes, etc.)
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
        <Image 
          src="/14.png" 
          alt="Imagen de fondo" 
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
      </div>

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
        
        <div className="w-full max-w-sm md:max-w-lg p-6 md:p-8 bg-[#000000] rounded-xl shadow-lg mb-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6">INGRESAR</h1>
          <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Ingresa con tu cuenta de emprendedor</h3>
          <Formik
            initialValues={{ email: '', password: '', rol:'emprendedor' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, values, setFieldTouched }) => (
              <Form className="w-full">
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="tucorreo@mail.com"
                    className="w-full p-3 text-base rounded-lg bg-[#303030] text-white border border-[#303030] placeholder-gray-300"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setFieldTouched('email', true, true);
                    }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-pink-300 text-sm pt-2">{errors.email}</div>
                  )}
                </div>
                <div className="mb-4 relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="●●●●●●●●●"
                    className="w-full p-3 mb-2 text-base rounded-lg bg-[#303030] text-white border border-[#303030] placeholder-gray-300"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setFieldTouched('password', true, true);
                    }}
                  />
                  {touched.password && (
                    <div className="text-pink-300 text-sm">
                      {!values.password.match(/[A-Z]/) && 'Debe incluir al menos una mayúscula. '}
                      {!values.password.match(/[!@#$%^&*]/) && 'Debe incluir al menos un carácter especial. '}
                      {values.password.length < 8 && 'Debe tener al menos 8 caracteres. '}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full p-3 mb-6 text-white font-semibold rounded-full bg-gradient-to-r from-[#C87DAB] to-[#C12886] shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="transition duration-300 hover:scale-110 inline-block text-lg">
                    Ingresar
                  </span>
                </button>
                <hr className="border-t-1 border-pink-400 border-opacity-60 mb-2 pb-4" />
              </Form>
            )}
          </Formik>
        <div className="flex flex-col items-center">
          <h5 className="text-sm md:text-base mb-2">O continúa con:</h5>
          <button
            type="button"
            className="flex items-center bg-[#303030] text-white p-3 rounded-lg text-base md:text-sm"
          >
            <FcGoogle className="w-6 h-6 md:w-8 md:h-8 mr-2 transition duration-300 hover:scale-110" />
            <span className="transition duration-300 hover:scale-110 inline-block text-lg">
            Google
            </span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEntrepeneur;
