import { Button } from "@/components/ui/button";
import MainLayout from "@/components/ui/layout/MainLayout";
import React from "react";
import Hero from "./components/Hero";
import HotelCard from "@/components/HotelCard";
import Hotels from "./Hotels";

const Homepage = () => {
  return (
    <MainLayout>
      <Hero />
      <Hotels/>
    </MainLayout>
  );
};

export default Homepage;
