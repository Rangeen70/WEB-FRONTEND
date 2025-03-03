import { useState } from "react";
import {
  MapPin,
  Star,
  Wifi,
  Building,
  Coffee,
  Car,
  Tv,
  Phone,
  Mail,
} from "lucide-react";
import MainLayout from "@/components/ui/layout/MainLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAhotel } from "../../api/index";
import { stables } from "../../constants/index";
import BookingForm from "@/components/BookingForm";

const HotelDetailsPage = () => {
  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, name: "Free High-Speed WiFi" },
    { icon: <Building className="w-5 h-5" />, name: "Swimming Building" },
    { icon: <Coffee className="w-5 h-5" />, name: "Restaurant" },
    { icon: <Car className="w-5 h-5" />, name: "Free Parking" },
    { icon: <Tv className="w-5 h-5" />, name: "Smart TV" },
  ];

  const { hotelId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["hotels", hotelId],
    queryFn: () => getAhotel(hotelId),
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div>Loading hotel details...</div>
        </div>
      </MainLayout>
    );
  }

  // Fallback image URL
  const imageUrl = hotelData?.photos
    ? new URL(hotelData.photos, stables.UPLOAD_FOLDER_BASE_URL).toString()
    : "/hero.jpeg";

  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {hotelData?.name || "Hotel Name"}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{hotelData?.address || "Address not available"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-bold text-lg">
                {hotelData?.rating || "N/A"}
              </span>
              <span className="text-gray-600">(128 reviews)</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <img
              src={imageUrl}
              alt="Main hotel view"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src={`/hero.jpg`}
                alt={`Hotel view ${index + 1}`}
                className="w-full h-[190px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
              <p className="text-gray-600 leading-relaxed">
                {hotelData?.description || "Description not available"}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {amenity.icon}
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Booking Form */}
          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm
              hotelId={hotelId}
              hotelPrice={hotelData?.cheapestPrice || 0}
            />
          </div>
        </div>

        {/* Contact Section */}
        <section className="mt-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span>contact@grandhotel.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Location</h3>
              <div className="bg-gray-200 h-48 rounded-lg">
                {/* Map placeholder - integrate with your preferred map service */}
                <div className="w-full h-full rounded-lg bg-gray-300 flex items-center justify-center">
                  Map View
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default HotelDetailsPage;
