import React from 'react'
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-10 px-4">
      {/* Top Line */}
      <div className="mb-4">
        <h2 className="text-center text-gray-500 text-sm sm:text-base">
          Created by <span className="font-semibold text-gray-600">Abhikraj</span> with ❤️ using this Amazing AI Travel Planner App
        </h2>
      </div>

      {/* Bottom Line */}
      <h2 className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-gray-500 text-sm sm:text-base text-center">
        <span>Thank you for using my App, feedback is appreciated at</span>
        <span className="flex items-center gap-1">
          <MdEmail className="text-lg" />
          <a href="mailto:adcbravo001@gmail.com" className="hover:underline break-all">
            adcbravo001@gmail.com
          </a>
        </span>
      </h2>
    </footer>
  )
}

export default Footer