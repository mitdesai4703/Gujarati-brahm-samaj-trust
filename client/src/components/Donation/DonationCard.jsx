import React, { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";

const stripePublicKey =
  "pk_test_51QoKVRHr2FbUrmkwpObpxLIhtb6toGQc6lHFu7elMqWTNQprPfIdXEKUKwu8alyrZ4ofnZgCIoEvXVSKRpdeeh8M00b9AVklW8";

const stripePromise = loadStripe(stripePublicKey);

const DonationCard = ({ campaignData, reloadCampaignData }) => {
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const [clientSecretToken, setClientSecretToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const getClientSecretToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-payment-intent`,
        { amount }
      );
      setClientSecretToken(response.data.clientSecret);
      setShowCheckoutForm(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.min(
    ((campaignData.collectedAmount / campaignData.targetAmount) * 100).toFixed(2),
    100
  );

  const options = {
    clientSecret: clientSecretToken,
  };

  return (
    <div className="p-5 border border-solid border-gray-300 rounded shadow-sm bg-white">
    
      <div className="w-full bg-gray-200 rounded h-4 overflow-hidden mb-2">
        <div
          className="h-4 bg-green-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-700">
        ₹{campaignData.collectedAmount} raised of ₹{campaignData.targetAmount}
      </p>

    
      <div className="mt-5">
        <label className="block text-sm text-gray-600 mb-1">Amount (INR)</label>
        <input
          type="number"
          min={1}
          className="border w-full p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

    
      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Message (optional)</label>
        <textarea
          rows="3"
          className="border w-full p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      
      <button
        onClick={getClientSecretToken}
        disabled={loading}
        className={`w-full mt-5 py-2 rounded text-white font-semibold ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-700 hover:bg-red-600 cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : "Donate"}
      </button>

    
      {clientSecretToken && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            open={showCheckoutForm}
            onClose={() => {
              setClientSecretToken("");
              setShowCheckoutForm(false);
            }}
            campaignData={campaignData}
            message={message}
            amount={amount}
            reloadCampaignData={() => {
              reloadCampaignData();
              setMessage("");
              setAmount(1);
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default DonationCard;
