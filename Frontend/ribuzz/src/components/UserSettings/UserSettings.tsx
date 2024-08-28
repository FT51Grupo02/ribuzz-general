'use client';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/components/Context/AuthContext';
import { updateUserProfile } from '@/helpers/user.helper';

interface UserProfileFormProps {
  initialValues: {
    fullName: string;
    image: File | null;
  };
  onSubmit: (values: { fullName: string; image: File | null }) => void;
}

const UserProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('Requerido'),
  image: Yup.mixed()
});

const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialValues, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(
    initialValues.image ? URL.createObjectURL(initialValues.image) : '/0.png'
  );
  const { token } = useAuth();

  const handleSubmit = async (values: { fullName: string; image: File | null }) => {
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      console.error('No se ha encontrado el token o ID de usuario.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', values.fullName);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      const updatedUser = await updateUserProfile(userId, formData, token);
      console.log('Perfil actualizado:', updatedUser);
      onSubmit(updatedUser);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserProfileSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="space-y-4">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Perfil"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                  if (file) {
                    setFieldValue("image", file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="absolute bottom-0 right-0 opacity-0 w-10 h-10 cursor-pointer"
              />
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Nombre de Usuario
                </label>
                <Field
                  id="fullName"
                  name="fullName"
                  placeholder="Nombre de Usuario"
                  className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
                />
                {errors.fullName && touched.fullName ? (
                  <div className="text-red-500 text-sm">{errors.fullName}</div>
                ) : null}
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-gradient-to-r from-[#C87DAB] to-[#C12886] text-white rounded-md">
                Guardar
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe poseer 8 caracteres mínimo')
    .matches(/[A-Z]/, 'La contraseña debe poseer al menos una mayúscula')
    .matches(/[!@#$%^&*]/, 'La contraseña debe poseer al menos un carácter especial')
    .required('Requerido'),
});

const UpdateProfile: React.FC = () => {
  const { token } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      console.error('No se ha encontrado el token o ID de usuario.');
      return;
    }

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    try {
      const updatedUser = await updateUserProfile(userId, formData, token);
      console.log('Datos de perfil a actualizar:', values);
      console.log('Perfil actualizado:', updatedUser);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={UpdateProfileSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Introduce tu email"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
            />
            {errors.email && touched.email ? (
              <div className="text-red-500 text-sm">{errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Introduce tu contraseña"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
            />
            {errors.password && touched.password ? (
              <div className="text-red-500 text-sm">{errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#C87DAB] to-[#C12886] text-white rounded-md">
            Actualizar Perfil
          </button>
        </Form>
      )}
    </Formik>
  );
};

const PersonalInfoSchema = Yup.object().shape({
  birthDate: Yup.date().required('Requerido'),
  firstName: Yup.string().required('Requerido'),
  lastName: Yup.string().required('Requerido')
});

const PersonalInfo: React.FC = () => {
  const { token } = useAuth();

  const handleSubmit = async (values: { birthDate: string; firstName: string; lastName: string }) => {
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      console.error('No se ha encontrado el token o ID de usuario.');
      return;
    }

    const formData = new FormData();
    formData.append('birthDate', values.birthDate);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);

    try {
      const updatedUser = await updateUserProfile(userId, formData, token);
      console.log('Información personal enviada:', values);
      console.log('Información personal actualizada:', updatedUser);
    } catch (error) {
      console.error('Error al actualizar la información personal:', error);
    }
  };

  return (
    <Formik
      initialValues={{ birthDate: '', firstName: '', lastName: '' }}
      validationSchema={PersonalInfoSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300">Fecha de Nacimiento</label>
            <Field
              id="birthDate"
              name="birthDate"
              type="date"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
            />
            {errors.birthDate && touched.birthDate ? (
              <div className="text-red-500 text-sm">{errors.birthDate}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">Nombre</label>
            <Field
              id="firstName"
              name="firstName"
              placeholder="Introduce tu nombre"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
            />
            {errors.firstName && touched.firstName ? (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Apellido</label>
            <Field
              id="lastName"
              name="lastName"
              placeholder="Introduce tu apellido"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
            />
            {errors.lastName && touched.lastName ? (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            ) : null}
          </div>

          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#C87DAB] to-[#C12886] text-white rounded-md">
            Guardar Información
          </button>
        </Form>
      )}
    </Formik>
  );
};

const UserSettings: React.FC = () => {
  const handleUserProfileSubmit = (values: { fullName: string; image: File | null }) => {
    console.log('Perfil del usuario enviado:', values);
  };

  const initialValues = { fullName: '', image: null };

  return (
    <div className="bg-black text-gray-300 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-6">Bienvenido a la Configuración</p>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex-1 bg-opacity-50 p-4 border border-gray-600 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Perfil</h3>
          <UserProfileForm initialValues={initialValues} onSubmit={handleUserProfileSubmit} />
        </div>
        
        <div className="flex-1 bg-opacity-50 p-4 border border-gray-600 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Actualizar Perfil</h3>
          <UpdateProfile />
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-opacity-50 border border-gray-600 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Información Personal</h3>
        <PersonalInfo />
      </div>
    </div>
  );
};

export default UserSettings;
