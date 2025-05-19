"use client";   
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/utils/validationSchema';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ME } from "@/graphql/queries";

type SignupFormData = {
  username: string;
  email: string;
  password: string;
};

const SIGNUP_MUTATION = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      _id
      username
      email
    }
  }
`;

export default function signupPage() {  
    
    const router = useRouter();

    const { data, loading: loadingUser } = useQuery(GET_ME, {
        fetchPolicy: "no-cache",
      });
    
    
      React.useEffect(() => {
        if (!loadingUser && data?.me) {
          router.push("/profile"); // Already logged in
        }
      }, [loadingUser, data, router]);

    const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    });

    // const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: SignupFormData) => {
        try {
            // setLoading(true);
            const res = await signup({ variables: { signupInput: data } });
            toast.success("Signup Successful");
            router.push("/login");
            
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }    
    }

    return (
        !loading ? (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-900 text-sm shadow-lg">
                <h1 className="font-semibold text-2xl mb-5">{loading ? "Processing" : "Signup"}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <div className="w-full">
                        <label htmlFor="username">Username</label>
                        <input className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none" {...register('username')} placeholder="username" />
                        <p className="font-sm text-red-600 mb-1">{errors.username?.message}</p>
                    </div>
                    
                    <div className="w-full">
                        <label htmlFor="email">Email</label>
                        <input className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none" {...register('email')} placeholder="Email" />
                        <p className="font-sm text-red-600 mb-1">{errors.email?.message}</p>
                    </div>
                    
                    <div className="w-full">
                        <label htmlFor="password">Password</label>
                        <input className="border border-zinc-300 rounded w-full p-2 mt-1 outline-none" type="password" {...register('password')} placeholder="Password" />
                        <p className="font-sm text-red-600 mb-1">{errors.password?.message}</p>
                    </div>
                    <button className="bg-blue-600 text-white w-full py-2 rounded-md text-base" type="submit">Sign Up</button>
                </form>
                <div>
                  <p>Already have an account? <Link className="text-blue-600 underline cursor-pointer" href="/login">Login here</Link> </p>
                </div>
                
            </div>
        </div>
        ) : (
            <div className="min-h-screen flex items-center justify-center">
              <p className="font-semibold text-xl text-slate-800">loading...</p>
            </div>
        )
    )
}