'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/Context/AuthContext';
import { IRegisterProps } from '@/interfaces/Types';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Cuenta de email inválida').required('Requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe poseer 8 caracteres mínimo')
    .matches(/[A-Z]/, 'La contraseña debe poseer al menos una mayúscula')
    .matches(/[!@#$%^&*]/, 'La contraseña debe poseer al menos un carácter especial')
    .required('Requerido'),
  date: Yup.date().required('Fecha requerida').typeError('Fecha inválida'),
  rol: Yup.string().oneOf(['emprendedor', 'cliente', 'admin'], 'Rol inválido').optional(), 
});

const RegisterUser = () => {
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (values: IRegisterProps) => {
    try {
      const registerData = {
        name: values.name,
        email: values.email,
        password: values.password,
        date: new Date(values.date), 
        rol: values.rol 
      };

      const result = await register(registerData);
  
      if (result) {
          router.push('/login');  // Redirigir al login después del registro exitoso
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
            initialValues={{ name: '', email: '', password: '', date: new Date(), rol: 'client' }} 
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}  
            validateOnBlur={true}    
          >
            {({ errors, touched, setFieldTouched, handleChange, values }) => (
              <Form className="w-full">
                <div className="mb-3 md:mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full p-2 md:p-4 mb-2 text-sm md:text-base rounded-lg bg-[#303030] text-white border border-[#303030] placeholder-[#FFFFFF]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setFieldTouched('name', true, true);
                    }}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                      handleChange(e);
                      setFieldTouched('email', true, true);
                    }}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                      handleChange(e);
                      setFieldTouched('password', true, true);
                    }}
                  />
                  {touched.password && (
                    <div className="text-red-500 text-xs md:text-sm">
                      {!values.password.match(/[A-Z]/) && 'Debe incluir al menos una mayúscula. '}
                      {!values.password.match(/[!@#$%^&*]/) && 'Debe incluir al menos un carácter especial. '}
                      {values.password.length < 8 && 'Debe tener al menos 8 caracteres. '}
                    </div>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <Field
                    type="date"
                    name="date"
                    className="w-full p-2 md:p-4 mb-2 text-sm md:text-base rounded-lg bg-[#303030] text-white border border-[#303030]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(e);
                      setFieldTouched('date', true, true);
                    }}
                  />
                  {errors.date && touched.date && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.date as string}</div>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <label className="block text-white mb-2">Rol:</label>
                  <div className="flex items-center mb-2">
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="rol"
                        value="emprendedor"
                      />
                      <span className="ml-2">Emprendedor</span>
                    </label>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="rol"
                        value="cliente"
                      />
                      <span className="ml-2">Cliente</span>
                    </label>
                  </div>
                  {errors.rol && touched.rol && (
                    <div className="text-red-500 text-xs md:text-sm">{errors.rol}</div>
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