'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../Context/CartContext'; // Asegúrate de la ruta correcta



interface PayCardProps {
  onPaymentSuccess: (paymentIntent: any) => void;
}

const PayCard: React.FC<PayCardProps> = ({ onPaymentSuccess }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');
  const { cart } = useCart(); // Usar el contexto del carrito
  const stripe = useStripe();
  const elements = useElements();

  const formik = useFormik({
    initialValues: {
      cardName: '',
    },
    validationSchema: Yup.object({
      cardName: Yup.string().required('El nombre en la tarjeta es obligatorio'),
    }),
    onSubmit: async (values) => {
      console.log('Formulario enviado con valores:', values);

      if (!stripe || !elements) {
        console.error('Stripe o Elements no están cargados.');
        return;
      }

      const cardElement = elements.getElement(CardElement);
      console.log('CardElement obtenido:', cardElement);

      if (!cardElement) {
        console.error('CardElement no encontrado');
        return;
      }

      console.log('Creando PaymentMethod con:', {
        cardElement,
        billingDetails: {
          name: values.cardName,
        },
      });

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: values.cardName,
        },
      });

      if (error) {
        console.error('Error al crear PaymentMethod:', error);
      } else {
        console.log('PaymentMethod creado:', paymentMethod);
        console.log('Datos enviados al backend:', {
          cart,
          payment_method_id: paymentMethod.id,
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart,
            payment_method_id: paymentMethod.id,
          }),
        });

        console.log('Esperando respuesta del backend...');

        const paymentIntent = await response.json();
        console.log('Respuesta del backend:', paymentIntent);

        if (paymentIntent.error) {
          console.error('Error del backend:', paymentIntent.error);
        } else {
          console.log('PaymentIntent recibido:', paymentIntent);
          onPaymentSuccess(paymentIntent);
        }
      }
    },
  });

  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff',
        backgroundColor: '#000000',
        fontSize: '16px',
        '::placeholder': {
          color: '#a0a0a0',
        },
      },
      invalid: {
        color: '#ff0000',
      },
    },
  };

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
            <label htmlFor="cardElement" className="block text-sm font-medium">Detalles de Tarjeta</label>
            <CardElement
              id="cardElement"
              options={cardElementOptions}
              className="w-full p-3 mt-1 bg-black border border-pink-400 border-opacity-40 rounded-lg text-sm md:text-base"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full p-3 mt-4 bg-gradient-to-r from-[#C87DAB] to-[#C12886] text-white font-bold rounded-full text-sm md:text-base"
            >
              <span className="inline-block transition duration-300 hover:scale-110">
                Confirmar Tarjeta
              </span>
            </button>
          </div>
        </form>
      </div>
    
  );
}

export default PayCard;



/* 'use client';

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

export default PayCard; */
