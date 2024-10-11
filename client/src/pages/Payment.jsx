import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; 
import { PayPalButtons } from '@paypal/react-paypal-js';
import Card from '../components/Card'; 
const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, content, region, authorName, coverImage } = location.state || {}; // Get the blog data from location state
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    if (!title) {
      navigate(-1); 
    }
  }, [title, navigate]);

  const handlePaymentSuccess = async () => {
    setPaymentSuccessful(true);
    toast.success('Payment successful! Your blog has been created.');
    navigate('/success'); 
  };

  const handlePaymentError = () => {
    toast.error('Payment failed! Please try again.');
    navigate(-1); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] ">
      <h2 className="text-2xl font-bold mb-10 text-center w-full">Just one more step before you publish</h2>
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-3xl space-y-6 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Blog Details</h2>
          <Card blog={{ title, content, region, authorName, coverImage }} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-xl font-bold mb-4">Payment</h2>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '0.01', // Amount to be charged
                  },
                }],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              console.log('Order successful:', order);
              handlePaymentSuccess(); 
            }}
            onError={handlePaymentError} 
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;