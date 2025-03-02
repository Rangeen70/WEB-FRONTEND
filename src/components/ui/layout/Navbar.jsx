import { LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { useAtomValue, useSetAtom } from "jotai";
import { authAtom } from "@/store/userAtom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../../../../api/index";

const Navbar = ({ slideDirection = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setAuth = useSetAtom(authAtom);
  const { isAuthenticated, user } = useAtomValue(authAtom);

  const handleLogout = () => {
    if (window.confirm("Do you really want to logout?")) {
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    }
  };

  const isUser = user?.role === "normal";
  const isAdmin = user?.role === "admin";
  const userId = user?.id;

  // Fetch user profile data
  const { data: profileData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return userProfile(userId);
    },
    // Only run the query if the user is authenticated and has an ID
    enabled: !!userId,
  });

  // Safely access profile picture
  const userProfilePicture = profileData?.me?.profilePicture || (user?.profilePicture || "");
  const profileUrl = userProfilePicture 
    ? `http://localhost:8000/uploads/${userProfilePicture}`
    : "";

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/hotels", label: "Hotels" },
    { path: "/facilities", label: "Facilities" },
    { path: "/about", label: "About" },
  ];

  // Determine mobile menu classes based on slide direction
  const getMobileMenuClasses = () => {
    const baseClasses =
      "fixed md:hidden bg-white shadow-lg transition-transform duration-300 ease-in-out z-50";

    if (slideDirection === "top") {
      return `${baseClasses} top-0 left-0 right-0 h-screen transform ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`;
    }

    return `${baseClasses} top-0 left-0 h-screen w-64 transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`;
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="w-full h-24 border-b bg-white relative">
      <div className="h-full w-full max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="z-50">
          <Link to="/" className="block">
            <span className="font-semibold italic text-lg md:text-xl">
              Rangeen's <br /> Hotel
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center">
          <ul className="hidden md:flex gap-8 text-lg">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="hover:text-gray-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-x-4">
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={profileUrl} alt="User avatar" />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link to={`/admin`}>Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {isUser && (
                    <>
                      <DropdownMenuItem>
                        <Link to={`/user/profile/${userId}`}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/user/my-bookings">My Bookings</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span
                      className="text-red-500 flex justify-around items-center gap-x-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-6 w-6" /> Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden m-3 flex gap-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={profileUrl} alt="User avatar" />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link to={`/admin`}>Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {isUser && (
                    <>
                      <DropdownMenuItem>
                        <Link to={`/user/profile/${userId}`}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/user/my-bookings">My Bookings</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span
                      className="text-red-500 flex justify-around items-center gap-x-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-6 w-6" /> Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <button
            className="md:hidden z-50 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div className={getMobileMenuClasses()}>
          <div className="flex flex-col h-full">
            {/* Mobile menu padding for logo space */}
            <div className="h-24" />

            <ul className="flex flex-col p-6 gap-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xl font-medium hover:text-gray-600 transition-colors duration-200 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Additional mobile menu content */}
            <div className="mt-auto p-6 border-t">
              <p className="text-sm text-gray-600">
                Welcome to Rangeen&apos;s Hotel
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;