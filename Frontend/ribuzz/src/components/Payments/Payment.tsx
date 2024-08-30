/* import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('tu_public_key'); 

async function createPaymentIntent(cart) {
    const response = await fetch('http://localhost:3000/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });
  
    const data = await response.json();
    return data.client_secret;
  }

  async function handlePayment() {
    const clientSecret = await createPaymentIntent(cart); // cart es el array con los productos
  
    const stripe = await stripePromise;
  
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement), // Assumiendo que estás usando el componente CardElement de Stripe
        billing_details: {
          name: 'Nombre del Cliente',
        },
      },
    });
  
    if (error) {
      console.log('Error de pago:', error);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Pago exitoso:', paymentIntent);
    }
  }

  import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handlePayment(); // Llama a la función que maneja el pago
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  );
} */