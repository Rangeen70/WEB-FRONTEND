import { Star, MapPin, Wifi, Coffee, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { stables } from "../../constants/index";

const HotelCard = ({ hotel }) => {
  // Early return if no hotel data is provided
  if (!hotel) {
    console.warn("No hotel data provided to HotelCard component");
    return null;
  }

  const imageUrl = hotel?.photos
    ? new URL(hotel.photos, stables.UPLOAD_FOLDER_BASE_URL).toString()
    : "/hero.jpeg";

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        {!hotel.photos ? (
          <img
            src="https://via.placeholder.com/400x200"
            alt="Hotel placeholder"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={imageUrl}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-blue-600">
          {hotel.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{hotel.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{hotel.rating}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Free Wifi</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Coffee className="w-4 h-4" />
            <span className="text-sm">Restaurant</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Family Rooms</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${hotel.cheapestPrice}
            </span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
          <Link to={`/hotel/${hotel._id}`}>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              View Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Container component for multiple hotel cards
export const HotelCards = ({ hotels }) => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Popular Hotels</h2>
          <p className="text-gray-600 mt-2">
            Explore our highest-rated properties
          </p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <HotelCard key={hotel._id || index} hotel={hotel} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No hotels found
          </p>
        )}
      </div>
    </section>
  );
};

export default HotelCard;
