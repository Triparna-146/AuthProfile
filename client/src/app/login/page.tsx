"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validationSchema";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/queries";

type LoginFormData = {
  email: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();

  const { data, loading: loadingUser } = useQuery(GET_ME, {
    fetchPolicy: "no-cache",
  });

  console.log("Login Data", data);

  React.useEffect(() => {
    if (!loadingUser && data?.me) {
      router.push("/profile"); // Already logged in
    }
  }, [loadingUser, data, router]);

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const res = await login({
        variables: {
          loginInput: formData,
        },
      });

      console.log("Login successful:", res);
      toast.success("Login Successful");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  // While checking user, don't render form
  if (loadingUser || data?.me) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-10 text-3xl font-semibold">
        {loading ? "Processing..." : "Login"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-2 border"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-2 border"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white"
        >
          Login
        </button>
      </form>

      <p className="mt-4">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
