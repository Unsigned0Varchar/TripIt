import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { SiGooglegemini } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-9 px-4 sm:px-8 md:px-16 lg:mx-56">
      <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-16">
        <span className="text-[#14699dd4]">Plan Your next Adventure with AI:</span> 
        Personal Itineraries at your fingertips!
      </h2>

      <p className="text-base sm:text-lg md:text-xl font-bold text-gray-500 text-center">
        Your personal trip planner and travel expert, create custom itineraries tailored to your own interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button>Click here to Start, It's Free.</Button>
      </Link>

      <p className="flex items-center gap-1 text-sm sm:text-base">
        Powered by <FcGoogle /> Google Gemini AI 2.5 Pro <SiGooglegemini />
      </p>
    </div>
  )
}

export default Hero