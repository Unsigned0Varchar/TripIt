import React, { useState } from 'react'
import logo from '/logo.svg';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Header = () => {
  const users = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      window.location.reload()
    })
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  return (
    <header className="p-3 shadow-sm flex justify-between items-center px-3 sm:px-5">
      {/* Logo */}
      <a href="/" className="flex flex-col items-center">
        <img
          src={logo}
          alt="logo"
          className="w-12 sm:w-16 h-auto"
        />
        <p className="font-bold text-blue-900 text-base sm:text-lg">TripIt</p>
      </a>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {users ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/create-trip">
              <Button variant="outline" size="sm" className="rounded-full text-sm sm:text-base">
                + Create Trips
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" size="sm" className="rounded-full text-sm sm:text-base">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full"
                  src={users?.picture}
                  alt="profile"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => setOpenDialog(true)}
            className="cursor-pointer text-sm sm:text-base"
          >
            Sign in
          </Button>
        )}
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className="w-10" src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p className="text-sm sm:text-base">
                Sign In to the app to proceed with Google authentication securely!
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-2 items-center"
              >
                <FcGoogle className="text-xl" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header