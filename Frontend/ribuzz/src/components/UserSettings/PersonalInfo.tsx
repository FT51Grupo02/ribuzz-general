'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/components/Context/AuthContext';
import { updateUserProfile } from '@/helpers/user.helper';

const PersonalInfoSchema = Yup.object().shape({
    birthDate: Yup.date().required('Requerido'),
    firstName: Yup.string().required('Requerido'),
    lastName: Yup.string().required('Requerido')
  });
  
  const PersonalInfoForm: React.FC = () => {
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

  export default PersonalInfoForm