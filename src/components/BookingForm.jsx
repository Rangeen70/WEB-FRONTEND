import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { bookHotel, getAhotel } from "../../api/index";
import { useEffect, useState } from "react";

const BookingForm = ({ hotelId, hotelPrice }) => {
  const [disabled, setDisabled] = useState(false);

  const form = useForm({
    defaultValues: {
      checkInDate: "",
      checkOutDate: "",
      guests: "1",
      room: "standard",
    },
  });

  const { data: reservedOrNot, isLoading } = useQuery({
    queryKey: ["hotels", hotelId], 
    queryFn: () => getAhotel(hotelId),
    enabled: !!hotelId, // ✅ Prevents query from running if hotelId is undefined
  });

  useEffect(() => {
    if (reservedOrNot?.reservationStatus === "confirmed") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [reservedOrNot]);

  const createBookingMutation = useMutation({
    mutationFn: (data) => bookHotel({ ...data, hotelId }),
    onSuccess: () => {
      toast.success("Booking successful!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Booking failed");
    },
  });

  const calculateTotal = () => {
    const checkIn = new Date(form.getValues("checkInDate"));
    const checkOut = new Date(form.getValues("checkOutDate"));
    if (!checkIn || !checkOut || checkOut <= checkIn) return 0;
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return nights * hotelPrice;
  };

  const onSubmit = (data) => {
    createBookingMutation.mutate(data);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading hotel information...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="checkInDate"
            rules={{ required: "Check-in date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-in Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOutDate"
            rules={{ required: "Check-out date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-out Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    min={
                      form.getValues("checkInDate") ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            rules={{ required: "Number of guests is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guests</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min="1" max="4" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room"
            rules={{ required: "Room type is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="standard">Standard Room</SelectItem>
                    <SelectItem value="deluxe">Deluxe Room</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t">
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-green-600">
                ${calculateTotal()}
              </span>
            </div>
          </div>

          <Button
            disabled={disabled || createBookingMutation.isLoading}
            type="submit"
            className="w-full"
          >
            {createBookingMutation.isLoading
              ? "Booking..."
              : disabled
              ? "Reserved"
              : "Book Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
