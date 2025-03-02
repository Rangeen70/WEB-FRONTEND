import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserProfile from "./pages/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddHotel from "./pages/admin/AddHotel";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import { Toaster } from "react-hot-toast";
import GetHotels from "./pages/admin/GetHotels";
import ShowMyBookings from "./pages/ShowMyBookings";
import ProtectedUser from "./components/ProtectedUser";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />
          <Route path="/user" element={<ProtectedUser />}>
            <Route path="profile/:userId" element={<UserProfile />} />
            <Route path="my-bookings" element={<ShowMyBookings />} />
          </Route>

          {/* admin routes  */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="add-hotel" element={<AddHotel />} />
              <Route path="get-hotel" element={<GetHotels />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
