import React from 'react';
import HallCard from '../components/HallCard';
import { rooms } from '../assets/assets';

const CommunityHall = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {rooms.map((room, index) => (
        <HallCard key={room._id} room={room} index={index} />
      ))}
    </div>
  );
};

export default CommunityHall;
