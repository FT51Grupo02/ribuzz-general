'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/components/Context/AuthContext';
import { updateUserProfile } from '@/helpers/user.helper';

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

  export default UpdateProfile;