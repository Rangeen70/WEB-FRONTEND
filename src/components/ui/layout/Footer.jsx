import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 text-center bg-gray-800 text-white">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Rangeen's Hotel. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:underline">Terms of Service</a>
          <a href="/contact" className="text-sm hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
