import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
  const hotels = trip?.tripData?.travelPlan?.hotelOptions || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      {hotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
          {hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-3">No hotel recommendations available.</p>
      )}
    </div>
  );
};

export default Hotels;