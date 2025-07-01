import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LuShare } from "react-icons/lu";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

const InfoSec = ({ trip }) => {

    const [photoUrl, SetphotoUrl] = useState()

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            SetphotoUrl(PhotoUrl);
        })
    }
    return (
        <div>
            <img src={photoUrl?photoUrl : '/Placeholder.jpg'}className='h-[400px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>No. of traveller 🧳: {trip.userSelection?.noOfTraveller}</h2>
                    </div>
                </div>
                <Button className='hover: cursor-pointer'>
                    <LuShare />
                </Button>
            </div>
        </div>
    )
}

export default InfoSec
