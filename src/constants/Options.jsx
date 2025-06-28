import { icons } from "lucide-react"

 export const SelectTravelersList=[
    {
        id:1,
        title:'Just Me',
        desc:"A sole traveller's in ecploration",
        icon:'✈',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'Two travellers in tandem',
        icon:'👫',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adventure or a combined family',
        icon:'🏡',
        people:'3 to 5 people approx.'
    }
 ]

 export const SelectBudget=[
    {
        id:1,
        title:'Cheap',
        desc:'Keep cost as minimal as possible',
        icon:'🪙'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on an average estimate',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'No worry of expenditure',
        icon:'💸',
    },
 ]

 export const AI_PROMPT="Generate Travel Plan for the Location: {location}, for {totalDays} Days for {traveller} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName Place Details, Place image url, geo coordinates, ticket pricing, time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."