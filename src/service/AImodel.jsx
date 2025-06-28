import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateTravelPlan() {
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'application/json',
  };

  const model = 'gemini-2.5-pro';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Palan for Location: Las vegas, for 3 days for couple witha cheap SelectBudget, Gve me hotels options list with hotel AnimationEffect, hotel address, price, hotel image URL, geo GeolocationCoordinates, rating, description and suggest itinerary with place name, place details, place image URL, geo GeolocationCoordinates, ticlet PerformanceTiming, time to travel each of the location for 3 days with each day plan with best time to visit in JSON format`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Defining Travel Plan Structure**

I'm currently working on defining the JSON structure for a budget-friendly Las Vegas itinerary. The core object will be \`travelPlan\` containing \`location\` (Las Vegas), \`duration\` (3 days), and an array of \`dailyActivities\`. Each day will have a \`date\`, an \`itinerary\` array for specific activities, and a \`budget\` breakdown. This approach should provide a clear and organized representation.


**Developing JSON Output Framework**

I'm now integrating hotel information into the \`travelPlan\`. I've added a \`travelerType\` key ("Couple") and am formulating hotel objects within \`hotelOptions\`. Each object will include hotel name, address, price range, image URL, geolocation coordinates, and a placeholder animation effect for presentation.  Next, I'll determine the best time to visit Las Vegas for budget travel.


**Constructing Itinerary Details**

I've added the detailed itinerary structure. Each day now includes a "theme" to categorize activities and "activities" with suggested times, places, descriptions, images, geolocation, and "ticketInfo" where applicable.  I'm now populating this structure for a realistic 3-day Las Vegas experience on a budget, considering factors like timing, travel distance, and cost. I've also decided to recommend a visit during the spring shoulder season.


**Formulating Detailed Hotel Options**

I've been working on populating the \`hotelOptions\` array with specific hotel recommendations. I'm focusing on budget-friendly hotels slightly off the main Strip, like the Tuscany Suites or Ellis Island Hotel.  I'm also gathering the necessary details: name, address, price range, image URLs (ensuring they're publicly accessible), geolocation, rating, and a brief description.  I've chosen spring as the ideal budget travel time.  I'm aiming for a balance of affordability and convenience for the "couple" traveler.


**Constructing Travel Budget Framework**

I've been meticulously crafting the JSON structure, paying close attention to budget-conscious choices. I've begun populating \`hotelOptions\` with details for hotels like Flamingo, The Linq, and Excalibur, keeping the "couple" traveler and cheap budget in mind.  I'm now focusing on a Spring visit, and have nearly finalized a realistic 3-day itinerary, including free and cheap activity details for this budget.  


**Finalizing Itinerary Details**

I've successfully finalized the entire JSON structure, ensuring all required elements, from hotels to activities, are in place. The data is structured, focusing on the cheap budget with a 3-day itinerary, including hotel options and itinerary details.  I'm now focusing on filling this framework with actual hotel and activity data, as well as the best time to travel. I'm confident in the structure, and it will be soon be ready to generate.


**Formulating Final Structure and Data**

I've finished building the essential JSON structures and have a clear outline for generating the output. I've populated \`hotelOptions\`, \`bestTimeToVisit\`, and the basic framework for a budget-friendly 3-day Las Vegas itinerary, considering activities and costs. I'm ready to move toward populating the itinerary structure with specific details, ensuring realistic time slots and places. I'm nearly done, which means I am confident that I can generate the desired output.


**Finalizing Data Input**

I'm currently finalizing the itinerary data for the 3-day Las Vegas trip, adding specific details such as time slots and place descriptions. I've populated the hotel options, itinerary details, and activity information. I'm focusing on the Spring visit, considering the cheap budget. With all necessary information prepared, the JSON generation is nearly ready.


**Populating Data for Output**

I've been occupied with adding hotel and itinerary details. I have nearly filled the JSON framework with details such as image URLs, geolocation coordinates, and prices for hotels like Flamingo, The LINQ, and Excalibur, alongside activity suggestions for Day 1. The itinerary structure is now comprehensive, with all its parts for a 3-day budget-friendly trip to Las Vegas. I'm focusing on providing realistic time slots, ensuring all the data aligns with a spring visit.


**Optimizing Data and Output**

I've been refining the itinerary for a budget-conscious 3-day Las Vegas trip, adding specific timings, descriptions, and imagery to complete the JSON framework. I'm ensuring everything aligns with the "couple" traveler's needs and the Spring visit period. I'm nearly finished inputting all the necessary data, which will prepare me to generate the output soon.


**Constructing Detailed Output Plan**

I've crafted a comprehensive plan for populating the data.  Hotel data, including images, coordinates, and pricing, are being sourced and formatted. I've broken down Day 1 of the itinerary, mapping out time slots, places, descriptions,  and ticket information. I am preparing the data to be placed in the established JSON structure.


**Generating the Final Itinerary**

I'm now integrating the itinerary data with the JSON structure. I'm focusing on "couple" traveler, spring visit and cheap budget factors, including image URLs and descriptions. I'm confident about formatting the finalized output.


**Finalizing the JSON Output**

I've populated the itinerary data, including day-specific activities, hotel options, and best travel times. I'm now ready to generate the final JSON output, ensuring it aligns perfectly with the specified structure, travel parameters, and budget constraints. I'm excited to provide a comprehensive and practical Las Vegas travel plan.


**Finalizing JSON Data Structure**

I've populated hotel data and itinerary details with specific times, locations, and descriptions, also populating image URLs. All data is ready to construct the final output.

**Assembling Final Data**

I'm now integrating the final data and image URLs into the comprehensive JSON structure. The hotel details, itinerary items, and time slots are all in place, and I'm ensuring everything aligns with the "couple" travel profile and the specified budget.  I'm confident I can build the final output.
`,
        },
        {
          text: "```json\n{\n  \"travelPlan\": {\n    ... (JSON content here) ...\n  }\n}\n```",
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  return fullResponse;
}