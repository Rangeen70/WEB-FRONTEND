import MainLayout from "@/components/ui/layout/MainLayout";
import React from "react";
import { toast } from "react-hot-toast";
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
import { userLogin } from "../../../api/index";
import { useSetAtom } from "jotai";
import { authAtom } from "@/store/userAtom";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (values) => {
      return userLogin(values);
    },
    onSuccess: (data) => {
      setAuth({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      });
      console.log(data.user);
      toast.success(data.message);
      form.reset();
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center min-h-[90vh]">
        <div className="w-full max-w-md border rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Login
              </Button>
            </form>
          </Form>
          <div className="flex justify-center items-center gap-x-2 my-5">
            <p>Don't have an account?</p>{" "}
            <span>
              <Link to="/register" className="text-blue-500">
                Register here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
