import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHotel, getHotels } from "../../../api/index";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const GetHotels = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  //delete hotel
  const { mutate } = useMutation({
    mutationFn: (hotelId) => {
      return deleteHotel(hotelId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["hotels"])
      toast.success(data.message || "Hotel deleted!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete hotel!");
    },
  });

  console.log(data);

  return (
    <div className="px-4 my-10 w-full max-w-screen-xl mx-auto">
      <Table>
        <TableCaption>List of available hotels</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((hotel) => (
            <TableRow key={hotel._id}>
              <TableCell className="font-medium">{hotel.name}</TableCell>
              <TableCell>{hotel.city}</TableCell>
              <TableCell>{hotel.address}</TableCell>
              <TableCell>${hotel.cheapestPrice}</TableCell>
              <TableCell>{hotel.rating}/5</TableCell>
              <TableCell>{hotel.reservationStatus}</TableCell>
              <TableCell>
                <div className="flex gap-x-2">
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Do you really want to delete this hotel?"
                        )
                      ) {
                        mutate(hotel._id);
                      }
                    }}
                    variant="destructive"
                  >
                    <Trash2 />
                  </Button>
                  <Link to={`/hotel/edit/${hotel._id}`}>
                    <Button>
                      <PencilLine />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetHotels;
