
const Hero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="hero.jpg"
          alt="Luxury hotel view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        {/* Hero Text */}
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Your Perfect Stay
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Experience luxury and comfort in our carefully curated selection of
            premier hotels
          </p>
        </div>

  

        {/* Features */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          {[
            { title: "Best Prices", desc: "Guaranteed lowest rates" },
            { title: "Free Cancellation", desc: "Flexible booking options" },
            { title: "24/7 Support", desc: "Here to help anytime" },
            { title: "Secure Booking", desc: "Safe & secure payments" },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
