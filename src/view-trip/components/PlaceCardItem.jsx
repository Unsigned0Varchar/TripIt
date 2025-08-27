import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from 'react-icons/fa6';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place?.placeName
  )}`;

  useEffect(() => {
    if (place?.placeName) {
      getPlacePhoto();
    }
  }, [place]);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: place.placeName };
      const resp = await GetPlaceDetails(data);

      const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoRef) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error('Failed to fetch place photo:', error.message);
    }
  };

  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-3 hover:scale-105 transition-all hover:shadow-md h-[180px]">
      {/* Fixed image size */}
      <img
        src={photoUrl || '/Placeholder.jpg'}
        className="w-[120px] h-[120px] rounded-xl object-cover flex-shrink-0"
        onError={(e) => (e.currentTarget.src = '/Placeholder.jpg')}
        alt={place.placeName}
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-bold text-lg line-clamp-1">{place.placeName}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">{place.placeDetails}</p>
          <h2 className="mt-2 text-sm">🕒 {place.time}</h2>
        </div>

        <Button
          size="sm"
          className="mt-2 flex items-center gap-1 w-fit"
          asChild
        >
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            <FaMapLocationDot /> Location
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PlaceCardItem;