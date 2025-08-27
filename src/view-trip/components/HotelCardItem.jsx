import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel?.name) {
      getPlacePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel.name };
      const resp = await GetPlaceDetails(data);

      const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;

      if (photoRef) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error('Failed to fetch hotel photo:', error.message);
    }
  };

  return (
    <Link
      aria-label={`View ${hotel?.name} on Google Maps`}
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.name + ', ' + hotel?.address
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="hover:scale-105 transition-transform duration-200 cursor-pointer">
        <img
          src={photoUrl || '/Placeholder.jpg'}
          className="rounded-xl w-full h-48 object-cover"
          alt={hotel?.name || 'Hotel Image'}
          onError={(e) => (e.currentTarget.src = '/Placeholder.jpg')}
        />

        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.name || 'Unknown Hotel'}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.address || 'Address not available'}</h2>
          <h2 className="text-sm">💰 {hotel?.price || 'N/A'}/Night</h2>
          <h2 className="text-sm">⭐️ {hotel?.rating || 'N/A'}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;