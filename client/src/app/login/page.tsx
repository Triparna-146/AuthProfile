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
    !loading ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-900 text-sm shadow-lg">
          <h1 className="font-semibold text-2xl mb-5">
            {loading ? "Processing..." : "Login"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
              />
              <p className="font-sm text-red-600 mb-1">{errors.email?.message}</p>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none"
              />
              <p className="font-sm text-red-600 mb-1">{errors.password?.message}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white w-full py-2 rounded-md text-base"
            >
              Login
            </button>
          </form>

          <p className="mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
    ) : (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-semibold text-xl text-slate-800">loading...</p>
      </div>
    )
  );
}
