import HotelCard from "@/components/HotelCard";
import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../../api/index";
import React from "react";


const Hotels = () => {
  const { data } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  console.log(data)
  return (
    <div className=" px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 w-full max-w-screen-xl mx-auto">
      {data?.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
};

export default Hotels;
