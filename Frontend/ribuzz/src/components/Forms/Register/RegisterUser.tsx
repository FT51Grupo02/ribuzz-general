'use client'

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/Context/AuthContext';

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Requerido'),
  date: Yup.date().required('Requerido'),
  role: Yup.string().oneOf(['1', '2', '3'], 'Rol inválido').required('Requerido'), // Rol es un string pero será convertido a número
});

const RegisterUser = () => {
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (values: any) => {
    try {
        const result = await register({
            ...values,
            role: parseInt(values.role),
        });

        if (result) {
            router.push('/login');
        }
    } catch (error) {
        console.error("Error en el registro:", error);
    }
};

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
        <Image 
          src="/0.png" 
          alt="Imagen de fondo" 
          fill
          style={{ objectFit: 'cover' }} 
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-black text-white">
        <div className="w-full max-w-sm md:max-w-md p-6 md:p-8 bg-[#000000] rounded-xl shadow-lg border-b border-[#C877A9]">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 font-poppins">REGISTRARSE</h1>
          <Formik
            initialValues={{ name: '', email: '', password: '', date: '', role: '1' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="w-full">
                <div className="mb-3 md:mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full p-2 md:p-4 mb-2 text-sm md:text-base rounded-lg bg-[#303030] text-white border border-[#303030] placeholder-[#FFFFFF]"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 md:p-4 mb-2 text-sm md:text-base rounded-lg bg-[#303030] text-white border border-[#303030] placeholder-[#FFFFFF]"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full p-2 md:p-4 mb-2 text-sm md:text-base rounded-lg bg-[#303030] text-white border border-[#303030] placeholder-[#FFFFFF]"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.password}</div>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <Field
                    type="date"
                    name="date"
                    className="w-full p-2 md:p-4 mb-2 text-sm md:text-base rounded-lg bg-[#303030] text-white border border-[#303030]"
                  />
                  {errors.date && touched.date && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.date}</div>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <label className="block text-white mb-2">Rol:</label>
                  <div className="flex items-center mb-2">
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="role"
                        value="1" // Entrepreneur
                      />
                      <span className="ml-2">Entrepreneur</span>
                    </label>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="role"
                        value="2" // Client
                      />
                      <span className="ml-2">Client</span>
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="role"
                        value="3" // Admin
                      />
                      <span className="ml-2">Admin</span>
                    </label>
                  </div>
                  {errors.role && touched.role && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.role}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full p-3 md:p-4 mb-4 text-white font-semibold rounded-full bg-gradient-to-r from-[#C87DAB] to-[#C12886] shadow-md hover:shadow-lg transition-shadow text-sm md:text-base"
                >
                  Registrarse
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;

