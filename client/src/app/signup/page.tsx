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
    
    // const { data, loading: loadingUser, error: userError } = useQuery(GET_ME, {
    //     fetchPolicy: "no-cache",
    // });
    
    const router = useRouter();

    // React.useEffect(() => {
    //     if (!loadingUser && data?.me) {
    //         // User is already logged in
    //         router.push("/profile");
    //     }
    // }, [loadingUser, data, router]);
    
    // if (loadingUser) return <p>Loading...</p>;

    const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    });

    // const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: SignupFormData) => {
        try {
            // setLoading(true);
            console.log(data)
            const res = await signup({ variables: { signupInput: data } });
            console.log("Signup Success", res);
            toast.success("Signup Successful");
            router.push("/login");
            
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }    
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center py-8 px-5 border w-72  bg-gray-600 border-gray-2 rounded">
                <h1 className="mb-10 text-3xl font-medium text-white ">{loading ? "Processing" : "Signup"}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="username">username</label>
                        <input className="w-full px-3 py-2 bg-white rounded " {...register('username')} placeholder="Name" />
                        <p>{errors.username?.message}</p>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="email">email</label>
                        <input className="w-full px-3 py-2 bg-white rounded " {...register('email')} placeholder="Email" />
                        <p>{errors.email?.message}</p>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password">password</label>
                        <input className="w-full px-3 py-2 bg-white rounded " type="password" {...register('password')} placeholder="Password" />
                        <p>{errors.password?.message}</p>
                    </div>
                    <button className="rounded bg-blue-500 text-white w-full py-2 my-3" type="submit">Sign Up</button>
                </form>
                <Link className="font-md text-blue-700 -underline-offset-2" href="/login">Login here</Link>
            </div>
        </div>
    )
}