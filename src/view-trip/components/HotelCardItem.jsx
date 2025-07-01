import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GetPlaceDetails } from '@/service/GlobalApi'
import { PHOTO_REF_URL } from '@/service/GlobalApi'

const HotelCardItem = ({hotel}) => {

    const [photoUrl, SetphotoUrl] = useState()
    
        useEffect(() => {
            hotel&&GetPlacePhoto();
        }, [hotel]);
    
        const GetPlacePhoto = async () => {
            const data = {
                textQuery: hotel?.name,
            }
            const result = await GetPlaceDetails(data).then(resp => {
                console.log(resp.data.places[0].photos[3].name)
    
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
                SetphotoUrl(PhotoUrl);
            })
        }

  return (
     <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address} target='_blank'>
                        <div className='hover:scale-103 transition-all cursor-pointer'>
                            <img src={photoUrl?photoUrl : '/Placeholder.jpg'} className='rounded-xl' />

                            <div className='my-3 flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel?.name}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
                                <h2 className='text-sm'>💰{hotel?.price}/Night</h2>
                                <h2 className='text-sm'>⭐️ {hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
  )
}

export default HotelCardItem
