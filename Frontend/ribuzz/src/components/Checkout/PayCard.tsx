'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PayCard: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
        .required('El nombre en la tarjeta es obligatorio'),
      cardNumber: Yup.string()
        .required('El número de tarjeta es obligatorio')
        .matches(/^[0-9]{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
      expiryDate: Yup.string()
        .required('La fecha de vencimiento es obligatoria')
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato de fecha no válido (MM/YY)'),
      cvv: Yup.string()
        .required('El CVV es obligatorio')
        .matches(/^[0-9]{3}$/, 'El CVV debe tener 3 dígitos'),
    }),
    onSubmit: (values) => {
      console.log('Payment Information:', values);
      // Aquí puedes manejar el envío de datos o pasarlos al componente de checkout
    },
  });

  return (
    <div className="bg-transparent p-4 rounded-lg shadow-lg border border-transparent max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2 text-pink-400">Información de Pago</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium">Nombre en la tarjeta</label>
          <input
            id="cardName"
            name="cardName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardName}
            className="w-full p-3 mt-1 bg-black border border-pink-400 border-opacity-40 text-white rounded-lg text-sm md:text-base"
          />
          {formik.touched.cardName && formik.errors.cardName ? (
            <div className="text-pink-300 text-xs md:text-sm mt-1">{formik.errors.cardName}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium">Número de Tarjeta</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardNumber}
            className="w-full p-3 mt-1 bg-black border border-pink-400 border-opacity-40 text-white rounded-lg text-sm md:text-base"
          />
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <div className="text-pink-300 text-xs md:text-sm mt-1">{formik.errors.cardNumber}</div>
          ) : null}
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-3">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-sm font-medium">Fecha de Vencimiento</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.expiryDate}
              className="w-full p-3 mt-1 bg-black border border-pink-400 border-opacity-40 text-white rounded-lg text-sm md:text-base"
              placeholder="MM/YY"
            />
            {formik.touched.expiryDate && formik.errors.expiryDate ? (
              <div className="text-pink-300 text-xs md:text-sm mt-1">{formik.errors.expiryDate}</div>
            ) : null}
          </div>

          <div className="flex-1">
            <label htmlFor="cvv" className="block text-sm font-medium max-md:pt-4">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cvv}
              className="w-full p-3 mt-1 bg-black border border-pink-400 border-opacity-40 text-white rounded-lg text-sm md:text-base "
            />
            {formik.touched.cvv && formik.errors.cvv ? (
              <div className="text-pink-300 text-xs md:text-sm mt-1">{formik.errors.cvv}</div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="w-full p-3 mt-4 bg-gradient-to-r from-[#C87DAB] to-[#C12886] text-white font-bold rounded-full text-sm md:text-base">
            <span className="inline-block transition duration-300 hover:scale-110">
              Confirmar Tarjeta
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayCard;
