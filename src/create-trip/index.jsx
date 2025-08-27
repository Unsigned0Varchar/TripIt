import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudget, SelectTravelersList } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTravelPlan } from '../service/AImodel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({}); // changed to object
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.noOfTraveller || !formData?.noOfDays) {
      toast("⚠️ Please fill all the details")
      return;
    }

    try {
      setLoading(true);

      // replaceAll used so multiple {totalDays} placeholders get replaced
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replaceAll('{totalDays}', String(formData?.noOfDays))
        .replace('{traveller}', formData?.noOfTraveller)
        .replace('{budget}', formData?.budget);

      const result = await generateTravelPlan(FINAL_PROMPT);

      if (!result) {
        // generateTravelPlan returns null on failures (503, parse error, etc.)
        toast.error("⚠️ AI did not return a valid plan right now. Please try again in a few seconds.");
        return;
      }

      await SaveAiTrip(result);

    } catch (err) {
      console.error("❌ Error generating trip:", err);
      toast.error("Something went wrong while generating your trip. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'))
      const docId = Date.now().toString()
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId,
      });
      navigate('/view-trip/' + docId)
    } catch (err) {
      console.error("❌ Failed to save trip:", err);
      toast.error("Could not save your trip. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      // continue generation after successful sign in
      onGenerateTrip();
    }).catch(err => {
      console.error("Failed to fetch user profile:", err);
      toast.error("Google sign-in failed. Try again.");
    })
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-2xl sm:text-3xl text-center sm:text-left">
        Tell us your travel preferences 🏕️ 🌴 🌊 🏔️ !!
      </h2>
      <p className="mt-3 text-gray-500 text-base sm:text-lg md:text-xl text-center sm:text-left">
        Just provide us some basic information, and your trip planner will generate a customized itinerary based on your preferences.
      </p>

      {/* Destination */}
      <div className="mt-10 flex flex-col gap-6">
        <h2 className="text-lg sm:text-xl font-medium">
          What is your destination of choice?
        </h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            placeholder: 'Search for your dream destination...',
            place,
            onChange: (value) => { setPlace(value); handleInputChange('location', value) },
            isClearable: true,
          }}
        />

        <h2 className="text-lg sm:text-2xl font-medium">
          How many days are you planning to stay/trip?
        </h2>
        <Input
          placeholder="Eg: 3"
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      {/* Budget */}
      <div className="mt-12">
        <h2 className="text-lg sm:text-xl font-medium">
          What is your Budget? <br /> 
          <span className="text-sm sm:text-base text-gray-600">The budget is exclusively allocated for activities and dining purposes.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {SelectBudget.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer transition
                ${formData?.budget === item.title ? 'shadow-lg bg-gray-200 border-black' : ''}
              `}
            >
              <h2 className="text-3xl sm:text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-base sm:text-lg">{item.title}</h2>
              <h2 className="text-xs sm:text-sm text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travellers */}
      <div className="mt-12">
        <h2 className="text-lg sm:text-xl font-medium">
          How many people are you planning to travel with?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('noOfTraveller', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer transition
                ${formData?.noOfTraveller === item.people ? 'shadow-lg bg-gray-200 border-black' : ''}
              `}
            >
              <h2 className="text-3xl sm:text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-base sm:text-lg">{item.title}</h2>
              <h2 className="text-xs sm:text-sm text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="my-10 flex justify-center sm:justify-end">
        <Button disabled={loading} onClick={onGenerateTrip} className="flex items-center gap-2">
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : 'Generate Trip'}
        </Button>
      </div>

      {/* Sign-in Dialog */}
      <Dialog open={openDialog}>
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
                className="w-full mt-5 flex gap-3 items-center hover:cursor-pointer"
              >
                <FcGoogle className="text-xl" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip;