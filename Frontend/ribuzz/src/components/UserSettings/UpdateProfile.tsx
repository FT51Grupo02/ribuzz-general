'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/components/Context/AuthContext';
import { updateUserProfile, /* updateUserProfilePhoto */ } from '@/helpers/user.helper';
import Image from 'next/image';

const UpdateProfileSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string()
      .min(8, 'La contraseña debe poseer 8 caracteres mínimo')
      .matches(/[A-Z]/, 'La contraseña debe poseer al menos una mayúscula')
      .matches(/[!@#$%^&*]/, 'La contraseña debe poseer al menos un carácter especial')
      .required('Requerido'),
    name: Yup.string().required('Requerido'),
    profilePhoto: Yup.mixed().notRequired() // Opcional: puedes agregar validaciones específicas para el archivo si es necesario
});

const UpdateProfile: React.FC = () => {
    const { token } = useAuth();
    const [imagePreview, setImagePreview] = useState<string>('/0.png');

    const handleSubmit = async (values: { email: string; password: string; name: string; date: string; rol?: string; profilePhoto: File | null }) => {
        const userId = localStorage.getItem('userId');
        if (!token || !userId) {
            console.error('No se ha encontrado el token o ID de usuario.');
            return;
        }

        const profileData = {
            name: values.name,
            email: values.email,
            password: values.password,
            date: values.date,
            rol: values.rol
        };

        try {
            await updateUserProfile(userId, profileData, token);
            console.log('Perfil actualizado');
            
           /*  if (values.profilePhoto) {
                await updateUserProfilePhoto(userId, values.profilePhoto, token);
                console.log('Foto de perfil actualizada');
            } */
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
        } 
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);

            // Clean up the object URL after the component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '', name: '', date: '', rol: '', profilePhoto: null }}
            validationSchema={UpdateProfileSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form className="space-y-4">
                    <div className="flex items-center">
                        <div className="relative">
                            <Image
                                src={imagePreview}
                                alt="Perfil"
                                width={96}
                                height={96}
                                className="object-cover rounded-full border-2 border-gray-300"
                            />
                            <input
                                type="file"
                                onChange={(event) => {
                                    handleImageChange(event);
                                    setFieldValue('profilePhoto', event.currentTarget.files ? event.currentTarget.files[0] : null);
                                }}
                                className="absolute bottom-0 right-0 opacity-0 w-10 h-10 cursor-pointer"
                            />
                        </div>
                        <div className="ml-4 flex flex-col justify-between">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre</label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Introduce tu nombre"
                                    className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-gray-300"
                                />
                                {errors.name && touched.name ? (
                                    <div className="text-red-500 text-sm">{errors.name}</div>
                                ) : null}
                            </div>

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
                        </div>
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
