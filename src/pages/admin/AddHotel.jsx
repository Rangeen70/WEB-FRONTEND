import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createHotel } from "../../../api/index";

const AddHotel = () => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
      city: "",
      address: "",
      description: "",
      rating: "",
      rooms: "",
      cheapestPrice: "",
      image: null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => createHotel(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["hotel"]);
      toast.success(data.message || "Hotel created!");
      form.reset();
    },
    onError: (error) => {
      console.error("Error creating hotel!", error);
      toast.error(error.message || "Hotel Creation error");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("city", values.city);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("rating", values.rating);
    formData.append("rooms", values.rooms);
    formData.append("cheapestPrice", values.cheapestPrice);
    if (values.image) {
      formData.append("hotelImage", values.image);
    }

    mutate(formData);
  };

  return (
    <div className="py-6 flex justify-center items-center">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Add a New Hotel
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Hotel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hotel name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hotel type" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the hotel..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Rating</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1-5" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Rooms</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="No. of rooms" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cheapestPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Cheapest Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* ✅ Single Image Input */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Hotel Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files[0] || null)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding Hotel..." : "Add Hotel"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddHotel;
