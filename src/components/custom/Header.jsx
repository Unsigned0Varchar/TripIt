import React from 'react'
import logo from '/logo.svg';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>

      <img
        src={logo}
        alt="logo_image"
        className="p-2 w-18 h-auto"
        />
        <div>
            <Button className='cursor-pointer'>Sign in</Button>
        </div>
    </div>
    
  )
}

export default Header
