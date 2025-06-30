import React from "react";
import { FaMoneyBillWave, FaRegCalendarCheck } from "react-icons/fa";
import { dashboardSummary, recentBookings } from "../../assets/assets";

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl">
          Monitor your hall listings, track bookings, and analyze revenue — all
          in one place. Stay updated with real-time insights to ensure smooth
          operations.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-blue-100 border border-blue-200 rounded flex p-4 pr-8 items-center w-full sm:w-64">
          <FaRegCalendarCheck className="h-10 w-10 text-blue-600 mr-4" />
          <div className="font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-600 text-base">
              {dashboardSummary.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-green-100 border border-green-200 rounded flex p-4 pr-8 items-center w-full sm:w-64">
          <FaMoneyBillWave className="h-10 w-10 text-green-600 mr-4" />
          <div className="font-medium">
            <p className="text-green-500 text-lg">Total Revenue</p>
            <p className="text-neutral-600 text-base">
              ₹{dashboardSummary.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* ------- Recent Bookings ---------- */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Bookings
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {recentBookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  ₹{item.totalPrice}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <span
                    className={`py-1 px-3 text-xs rounded-full ${
                      item.isPaid
                        ? "bg-green-200 text-green-600"
                        : "bg-amber-200 text-yellow-600"
                    }`}
                  >
                    {item.isPaid ? "Completed" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
