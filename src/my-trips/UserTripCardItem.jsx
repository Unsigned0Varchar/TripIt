import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data);
    const photoName = result?.data?.places?.[0]?.photos?.[0]?.name;
    if (photoName) {
      const url = PHOTO_REF_URL.replace('{NAME}', photoName);
      setPhotoUrl(url);
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : '/Placeholder.jpg'}
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
          className="w-full h-48 object-cover rounded-xl"
        />
        <h2 className="font-bold text-lg mt-2">
          {trip?.userSelection?.location.label}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget for a traveller count {trip?.userSelection?.noOfTraveller}
        </h2>
      </div>
    </Link>
  );
};

export default UserTripCardItem;