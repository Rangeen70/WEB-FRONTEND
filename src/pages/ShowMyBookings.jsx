import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { getUserBookings, cancelBooking } from "../../api/index";
import MainLayout from "@/components/ui/layout/MainLayout";
import { useState } from "react";

const ShowMyBookings = () => {
  const [hotelId, setHotelId] = useState("");
  const {
    data: bookings,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
  });

  console.log(bookings);
  console.log(hotelId)

  // Mutation to cancel a booking
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => cancelBooking(bookingId, hotelId),
    onSuccess: () => {
      toast.success("Booking cancelled successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    },
  });

  // Handle loading state
  if (isLoading) {
    return <div className="text-center mt-8">Loading your bookings...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  // Handle no bookings
  if (!bookings || bookings.length === 0) {
    return <div className="text-center mt-8">You have no bookings yet.</div>;
  }

  return (
    <MainLayout>
      <div className="max-w-4xl h-screen mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-md border flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {booking.hotel?.name || "Hotel information unavailable"}
                </h3>
                <h3 className="font-semibold">
                  {booking.hotel?._id || "Hotel id unavailable"}
                  {/* {setHotelId(booking?.hotel?._i)} */}
                </h3>
                <p className="text-gray-600">
                  Room: {booking.room} | Guests: {booking.guests}
                </p>
                <p className="text-gray-600">
                  Check-in: {new Date(booking.checkInDate).toLocaleDateString()}{" "}
                  | Check-out:{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
                <p className="text-green-600 font-bold">
                  Total: ${booking.totalPrice}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      booking.status === "confirmed"
                        ? "text-blue-600"
                        : "text-red-600"
                    }
                  >
                    {booking.status}
                  </span>
                </p>
              </div>

              {booking.status === "confirmed" && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    setHotelId(booking.hotel?._id);
                    cancelMutation.mutate(booking._id);
                  }}
                  disabled={cancelMutation.isLoading}
                >
                  {cancelMutation.isLoading
                    ? "Cancelling..."
                    : "Cancel Booking"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ShowMyBookings;
