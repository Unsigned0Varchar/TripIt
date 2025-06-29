import React from 'react';
import { Link } from 'react-router-dom';

const Hotels = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.travelPlan?.hotelOptions?.map((item, index) => (
                    <Link to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName+","+item?.address} target='_blank'>
                        <div key={index} className='hover:scale-103 transition-all cursor-pointer'>
                            <img src="/Placeholder.jpg" className='rounded-xl' />

                            <div className='my-3 flex flex-col gap-2'>
                                <h2 className='font-medium'>{item?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {item?.address}</h2>
                                <h2 className='text-sm'>💰{item?.pricePerNight}/Night</h2>
                                <h2 className='text-sm'>⭐️ {item?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels

