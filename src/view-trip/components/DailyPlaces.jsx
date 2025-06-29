import React from 'react'

const DailyPlaces = ({trip}) => {
  return (
    <div>
      <h2 className='text-lg font-bold'>Places To Visit During Stay</h2>
      <div>
        {trip.tripData?.travelPlan?.dailyItinerary.map((item,index)=>(
            <div  key={index}>
                <h2 className='font-medium text-lg'>Day {item.day}</h2>
                <div>
                <h2 className='font-medium text-lg'>{item.time}</h2>
                <h2 className='font-medium text-lg'>{item.theme}</h2>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default DailyPlaces
