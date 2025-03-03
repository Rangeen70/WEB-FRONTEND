import MainLayout from "@/components/ui/layout/MainLayout";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../../../api/index";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (values) => {
      return userRegister(values);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      console.log("data", data);
      form.reset();
      navigate("/login");
    },
    onError: (error) => {
      console.log("error", error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = (values) => {
    try {
      mutate(values);
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center min-h-[90vh]">
        <div className="w-full max-w-md border rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
          <div className="flex justify-center items-center gap-x-2 my-5">
            <p>Already have an account?</p>{" "}
            <span>
              <Link to="/login" className="text-blue-500">
                Login here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
