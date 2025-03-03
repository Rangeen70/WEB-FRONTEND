import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainLayout from "@/components/ui/layout/MainLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userProfile, updateProfileData } from "../../api/index";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  // Fetch user profile data
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return userProfile(userId);
    },
  });

  const user = profileData?.me || {};

  // Define default user data as a fallback
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Guest",
    profilePicture: "https://github.com/shadcn.png",
    joinedDate: "2025-01-01",
  };

  // Use the provided image URL directly
  const imageUrl = user.profilePicture 
    ? `http://localhost:8000/uploads/${user.profilePicture}`
    : defaultUser.profilePicture;
  
  const [imagePreview, setImagePreview] = useState(imageUrl);

  // Initialize form with only name and profilePicture
  const form = useForm({
    defaultValues: {
      name: user.name || defaultUser.name,
      profilePicture: null, // File input starts as null
    },
  });

  // Reset form when user data loads
  useEffect(() => {
    if (!isLoading && user.name) {
      form.reset({
        name: user.name,
        profilePicture: null,
      });
      setImagePreview(
        user.profilePicture 
          ? `http://localhost:8000/uploads/${user.profilePicture}`
          : defaultUser.profilePicture
      );
    }
  }, [isLoading, user, form]);

  // Mutation for updating profile
  const { mutate } = useMutation({
    mutationFn: (data) => updateProfileData(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId]);
      toast.success("Profile updated!");
    },
    onError: () => {
      toast.error("Unable to update profile");
    },
  });

  // Handle file change for preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue("profilePicture", file);
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    console.log("Submitting updated user data:", Object.fromEntries(formData));
    mutate(formData);
  };

  if (isLoading) return <MainLayout>Loading...</MainLayout>;

  return (
    <MainLayout>
      <Card className="w-full max-w-md mx-auto my-10">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage
              src={imagePreview}
              alt={
                (form.watch("name") || user.name || defaultUser.name) +
                "'s avatar"
              }
            />
            <AvatarFallback>
              {(form.watch("name") || user.name || defaultUser.name)
                .charAt(0)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                          handleFileChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Display-only fields */}
              <div className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <p className="text-muted-foreground">
                  {user.email || defaultUser.email}
                </p>
              </div>
              <div className="grid gap-2">
                <FormLabel>Role</FormLabel>
                <p className="text-muted-foreground">
                  {user.role || defaultUser.role}
                </p>
              </div>
              <div className="grid gap-2">
                <FormLabel>Joined Date</FormLabel>
                <p className="text-muted-foreground">
                  {new Date(
                    user.createdAt || defaultUser.joinedDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </MainLayout>
  );
};

export default UserProfile;