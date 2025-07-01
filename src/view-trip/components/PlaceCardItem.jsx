import React from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';

const PlaceCardItem = ({ place }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`;
   const [photoUrl, SetphotoUrl] = useState()
      
          useEffect(() => {
              place&&GetPlacePhoto();
          }, [place]);
      
          const GetPlacePhoto = async () => {
              const data = {
                  textQuery: place.placeName,
              }
              const result = await GetPlaceDetails(data).then(resp => {
                  const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
                  SetphotoUrl(PhotoUrl);
              })
          }
  
  
  return (
    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
      <div className='border rounded-xl p-3 mt-2 flex gap-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img
          src={photoUrl?photoUrl : '/Placeholder.jpg'}
          className='w-[100px] h-[100px] rounded-xl object-cover'
          onError={(e) => (e.currentTarget.src = '/Placeholder.jpg')}
          alt={place.placeName}
        />
        <div className='flex flex-col justify-between'>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-500'>{place.placeDetails}</p>
          <h2 className='mt-2'>🕒 {place.time}</h2>
          <Button size="sm" className="mt-2 flex items-center gap-1">
            <FaMapLocationDot />
            Location
          </Button>
        </div>
      </div>
    </a>
  );
};

export default PlaceCardItem;