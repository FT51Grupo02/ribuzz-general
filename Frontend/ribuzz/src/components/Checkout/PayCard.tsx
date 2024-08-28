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
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Información de Pago</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium">Nombre en la tarjeta</label>
          <input
            id="cardName"
            name="cardName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cardName}
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-lg"
          />
          {formik.touched.cardName && formik.errors.cardName ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.cardName}</div>
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
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-lg"
          />
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.cardNumber}</div>
          ) : null}
        </div>

        <div className="flex space-x-3">
          <div className="w-1/2">
            <label htmlFor="expiryDate" className="block text-sm font-medium">Fecha de Vencimiento</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.expiryDate}
              className="w-full p-2 mt-1 bg-gray-800 text-white rounded-lg"
              placeholder="MM/YY"
            />
            {formik.touched.expiryDate && formik.errors.expiryDate ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.expiryDate}</div>
            ) : null}
          </div>

          <div className="w-1/2">
            <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cvv}
              className="w-full p-2 mt-1 bg-gray-800 text-white rounded-lg"
            />
            {formik.touched.cvv && formik.errors.cvv ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.cvv}</div>
            ) : null}
          </div>
        </div>

        <button type="submit" className="w-50 p-2 mt-4 bg-gradient-to-r from-[#C87DAB] to-[#C12886] text-white font-bold rounded-full">
          Confirmar Tarjeta
        </button>
      </form>
    </div>
  );
};

export default PayCard;
