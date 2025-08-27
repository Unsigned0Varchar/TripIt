import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuShare } from "react-icons/lu";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { toast } from "sonner";

const InfoSec = ({ trip }) => {
    const [photoUrl, setPhotoUrl] = useState("/Placeholder.jpg");

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            getPlacePhoto();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip?.userSelection?.location?.label]);

    const getPlacePhoto = async () => {
        try {
            const data = { textQuery: trip?.userSelection?.location?.label };
            const resp = await GetPlaceDetails(data);
            const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;

            if (photoRef) {
                setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoRef));
            } else {
                console.warn("⚠️ No photo found – using placeholder");
                setPhotoUrl("/Placeholder.jpg");
            }
        } catch (err) {
            console.error("❌ Place photo fetch failed:", err);
            setPhotoUrl("/Placeholder.jpg");
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: `Trip to ${trip?.userSelection?.location?.label || "Unknown Location"}`,
            text: `Check out this ${trip?.userSelection?.noOfDays || "X"}-day trip plan to ${trip?.userSelection?.location?.label || "this place"}!`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                toast.success("📋 Link copied to clipboard");
            }
        } catch (err) {
            console.error("❌ Sharing failed:", err);
            toast.error("Sharing not supported on this device");
        }
    };

    return (
        <div>
            {/* Destination Image */}
            <img
                src={photoUrl}
                className="h-[400px] w-full object-cover rounded-xl"
                onError={(e) => (e.currentTarget.src = "/Placeholder.jpg")}
                alt={trip?.userSelection?.location?.label || "Destination"}
            />

            {/* Info Section */}
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location?.label || "Destination"}
                    </h2>

                    <div className="flex gap-3 flex-wrap">
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm">
                            📅 {trip?.userSelection?.noOfDays || "—"} Days
                        </span>
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm">
                            💵 {trip?.userSelection?.budget || "—"} Budget
                        </span>
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-xs md:text-sm">
                            🧳 Travellers: {trip?.userSelection?.noOfTraveller || "—"}
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <Button onClick={handleShare} className="flex items-center gap-1">
                        <LuShare /> Share
                    </Button>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("📋 Link copied to clipboard!");
                        }}
                        className="flex items-center gap-1"
                        variant="outline"
                    >
                        📋 Copy Link
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InfoSec;