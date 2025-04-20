"use client";

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';

// List of countries for the dropdown
const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  // Add more countries as needed
];

interface CheckoutFormProps {
  interviewCount: number;
  price: number;
  clientSecret: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function CheckoutForm({
  interviewCount,
  price,
  clientSecret,
  onSuccess,
  onError
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [country, setCountry] = useState('GB');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Execute the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Include country and postal code in the billing details
            address: {
              country: country,
              postal_code: postalCode,
            },
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Payment failed");
      } else if (paymentIntent.status === 'succeeded') {
        // Get the current user token for authentication
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          throw new Error("Authentication error - Please log in again");
        }
        
        const token = await user.getIdToken();
        
        // Payment successful, save purchase to user's account
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            interviewCount
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          onSuccess();
          // Redirect to success page with the payment intent ID
          router.push(`/payment/success?payment_intent=${paymentIntent.id}&interviews=${interviewCount}`);
        } else {
          throw new Error(data.message || "Failed to process purchase");
        }
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Payment error:', err);
      setErrorMessage(err.message || "An unknown error occurred");
      onError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-gray-700/50 rounded-md space-y-4">
          {/* Country and Postal Code section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="text-sm text-gray-300 mb-1 block">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="postalCode" className="text-sm text-gray-300 mb-1 block">
                Postal / Zip Code
              </label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
                className="w-full p-3 bg-gray-800 rounded-md text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Card Details section */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Card Details</label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#FFFFFF',
                    '::placeholder': {
                      color: '#AAAAAA',
                    },
                  },
                  invalid: {
                    color: '#FF5555',
                  },
                },
                // We're handling postal code separately, so hide it in the card element
                hidePostalCode: true,
              }}
              className="p-3 bg-gray-800 rounded-md"
            />
          </div>
          {errorMessage && (
            <div className="text-red-400 text-sm mt-2">{errorMessage}</div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full px-4 py-3 text-white rounded-md font-medium transition-colors duration-200 flex items-center justify-center ${
            loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
              Processing...
            </>
          ) : (
            <>Pay £{price.toFixed(2)}</>
          )}
        </button>
      </form>
    </div>
  );
} 