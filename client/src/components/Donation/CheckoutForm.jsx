import React, { useState } from "react";
import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const CheckoutForm = ({
  open,
  onClose = () => {},
  campaignData,
  message,
  amount,
  reloadCampaignData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!stripe || !elements) return;

  try {
    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    const paymentIntent = result.paymentIntent;

    if (result.error) {
      toast.error(result.error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Donation successful!");

     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/donations/create`, {
  campaign: campaignData._id,
  amount,
  message,
  paymentId: paymentIntent.id,
}, {
  withCredentials: true 
});

      onClose();
      reloadCampaignData();
      navigate("/campaignpage");
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  if (!open) return null;

  return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto p-6 relative">
    <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
      Complete Your Donation Payment
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6 pb-6">
      <PaymentElement />
      <AddressElement
        options={{
          mode: "billing",
          allowedCountries: ["IN"],
        }}
      />

      <div className="flex justify-end gap-4 mt-6 sticky bottom-0 bg-white pt-4 pb-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Donate"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default CheckoutForm;
