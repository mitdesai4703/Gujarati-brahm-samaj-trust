import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;

 const getData = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/donations/get-my-donations`,
      { withCredentials: true }
    );

    const donationsWithKeys = response.data.map((donation) => ({
      ...donation,
      key: donation._id || Math.random().toString(),
    }));

    setDonations(donationsWithKeys);
  } catch (error) {
    console.error("Error fetching donations:", error);
    alert("Error fetching donations: " + error.message);
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  getData();
}, []);


  return (
    <div className="min-h-screen p-5 mt-10">
      <h1 className="text-3xl font-bold text-red-700 mb-6">My Donations</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : donations.length === 0 ? (
        <p className="text-gray-500">No donations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Campaign</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Payment ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.key}>
                  <td className="border border-gray-300 px-4 py-2">
                    {donation.campaign?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">₹{donation.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{donation.paymentId}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dayjs(donation.createdAt).format("MMMM DD, YYYY h:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationPage;
