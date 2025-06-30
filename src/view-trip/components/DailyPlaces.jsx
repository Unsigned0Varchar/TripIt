import React from 'react';

const DailyPlaces = ({ trip }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Places To Visit During Stay</h2>

      {trip?.tripData?.travelPlan?.dailyItinerary?.map((day, dayIndex) => {
        const activitiesArray = day.activities
          ? Object.values(day.activities)
          : [];

        return (
          <div key={dayIndex} className="mb-10">
            <h2 className="font-semibold text-2xl mb-2">Day {day.day || dayIndex + 1}</h2>
            <h3 className="font-medium text-lg text-gray-700 mb-4">{day.theme}</h3>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activitiesArray.length > 0 ? (
                activitiesArray.map((activity, index) => {
                  const mapsUrl = `https://www.google.com/maps?q=${activity.geolocationCoordinates?.latitude},${activity.geolocationCoordinates?.longitude}`;

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg border"
                    >
                      <img
                        src={activity.placeImageUrl || "/Placeholder.jpg"}
                        alt={activity.placeName || "Place Image"}
                        onError={(e) => {
                          e.currentTarget.src = "/Placeholder.jpg";
                        }}
                        className="w-full h-44 object-cover rounded-t-xl"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-lg">{activity.placeName}</h4>
                        <p className="text-sm text-gray-600 mt-1">{activity.placeDetails}</p>
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>🕒 Time:</strong> {activity.time}
                        </p>
                        <p className="text-sm text-gray-700">🎟️ Ticket: {activity.ticketInfo?.cost} ({activity.ticketInfo?.type})</p>

                        <p className="text-sm text-gray-700 mt-2 italic">
                          {activity.travelSuggestion}
                        </p>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-blue-600 mt-3 text-sm underline hover:text-blue-800"
                        >
                          📍 View on Map
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-400 italic">No activities for this day.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyPlaces;