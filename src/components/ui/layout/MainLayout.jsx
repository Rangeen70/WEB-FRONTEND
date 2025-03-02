import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
