import React, { useState } from 'react'
import { rooms } from '../assets/assets'
import { images } from '../assets/assets';


const MyBookings = () => {
  const [bookings, setBookings] = useState(rooms)
  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
  <div className="mb-8 text-center">
  <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">My Bookings</h1>
  <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
    Easily manage your past, current, and upcoming hall reservations in one place. 
    Plan your trips seamlessly with just a few clicks.
  </p>
</div>

    <div className='max-w-6xl mt-8 w-full text-gray-800'>

    <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
    <div className='w-1/3'>Halls</div>
    <div className='w-1/3'>Date & Timings</div>
    <div className='w-1/3'>Payment</div>
    </div>
   
{rooms.map((room) => (
  <div
    key={room._id}
    className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
  >
    {/* ---- Room Details ---- */}
    <div className="flex flex-col md:flex-row gap-4 items-start">
  {/* Room Image */}
  <img
    src={room.images[0]}
    alt={`${room.name} image`}
    className="w-44 h-28 rounded shadow object-cover"
  />

  {/* Details */}
  <div className="flex flex-col gap-2 justify-between">
    {/* Room Name and Type */}
    <div className="flex items-start justify-between w-full">
      <p className="font-playfair text-xl font-semibold text-black">
        {room.name}
        <span className="font-inter text-sm text-gray-600 ml-2">
          ({room.roomType || "Double Bed"})
        </span>
      </p>
    </div>

    {/* Address/Host */}
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <img
        src={images.location}
        alt="location-icon"
        className="w-4 h-4"
      />
      <span>{room.address || `Hosted by: ${room.hostedBy}`}</span>
    </div>

    {/* Guest count */}
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>👥 Guests: {room.capacity}</span>
    </div>

    {/* Total Price */}
    <div className="text-sm font-medium text-black">
      Total: ₹{room.price}
    </div>
  </div>
</div>


    {/* ---- Date & Timings Section (Placeholder) ---- */}
  <div className="mt-4 md:mt-0 flex flex-row md:items-center md:gap-12  gap-8">
  {/* Check-In */}
  <div>
    <p className="font-medium text-sm">Check-In:</p>
    <p className="text-gray-500 text-sm">
      {new Date(room.checkInDate).toDateString()}
    </p>
  </div>

  {/* Check-Out */}
  <div>
    <p className="font-medium text-sm">Check-Out:</p>
    <p className="text-gray-500 text-sm">
      {new Date(room.checkOutDate).toDateString()}
    </p>
  </div>
</div>


    {/* ---- Payment Info (Placeholder) ---- */}
    <div className="flex flex-col items-start justify-center pt-3">
  <div className="flex items-center gap-2">
    <div
      className={`h-3 w-3 rounded-full ${
        room.isPaid ? "bg-green-500" : "bg-red-500"
      }`}
    ></div>
    <p className={`text-sm ${room.isPaid ? "text-green-500" : "text-red-500"}`}>
      {room.isPaid ? "Paid" : "Unpaid"}
    </p>
  </div>

  {!room.isPaid && (
    <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">
      Pay Now
    </button>
  )}
</div>



  </div>
))}



    </div>
    </div>
  )
}

export default MyBookings
