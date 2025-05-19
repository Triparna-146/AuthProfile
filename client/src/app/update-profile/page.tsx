"use client";   
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileschema } from '@/utils/validationSchema';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ME } from "@/graphql/queries";

type Gender = "Male" | "Female" | "Prefer Not to Say";

type UpdateProfileFormData = {
  fullName: string;
  age: number;
  gender: Gender;
  bio: string;
  city: string;
  country: string;
  phoneNumber: string;
};

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      _id
      fullName
    }
  }
`;

export default function UpdateProfilePage() {  
    // const { data, loading: loadingUser, error: userError } = useQuery(GET_ME, {
    // fetchPolicy: 'no-cache',
    // });

    const router = useRouter();

    const { data, loading: loadingUser } = useQuery(GET_ME, {
        fetchPolicy: "no-cache",
      });
    
    
      React.useEffect(() => {
        if (!loadingUser && !data?.me) {
          router.push("/login"); // Already logged in
        }
      }, [loadingUser, data, router]);


      const user = data?.me;


    const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProfileFormData>({
        resolver: yupResolver(updateProfileschema),
    });

    // const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: UpdateProfileFormData) => {
        try {
            // setLoading(true);
            
            const res = await updateUser({
                variables: {
                    input: {
                    ...data,
                    },
                },
            });

            toast.success("Profile Updated");
            router.push("/profile");
            
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }  
    }

    return (
        <div className="flex flex-col min-h-screen w-screen">
            <div className="flex flex-row py-2 px-8 justify-start w-full shadow-xl">
                <Link href="/profile" className="text-lg text-black underline cursor-pointer">
                        Back
                </Link>
            </div>
            <div className="flex flex-col py-10 px-20 w-full">
                <div className="flex flex-col gap-3 m-auto items-start p-8 w-full sm:min-w-96 rounded-xl text-zinc-900 text-sm shadow-lg">
                <h1 className="font-semibold text-3xl mb-5">{loading ? "Updating" : "Update Details"}</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                                                {/* Full Name */}
                            <div className="flex flex-col mb-2">
                                <label>Full Name</label>
                                <input type="text" {...register("fullName")}
                                placeholder="Full Name"
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none"  />
                                <p className="font-sm text-red-600 mb-1">{errors.fullName?.message}</p>
                            </div>
                            
                            <div className="flex flex-col mb-2">
                                <label>Age</label>
                                <input type="Number" {...register("age")}
                                placeholder="Age"
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none" />
                                <p className="font-sm text-red-600 mb-1">{errors.fullName?.message}</p>
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col mb-2">
                                <label>Gender</label>
                                <select {...register("gender")}
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none">
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                </select>
                                <p className="font-sm text-red-600 mb-1">{errors.gender?.message}</p>
                            </div>

                            {/* Bio */}
                            <div className="flex flex-col mb-2">
                                <label>Bio</label>
                                <textarea {...register("bio")} rows={3} placeholder="Bio"
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none resize-none" />
                                <p className="font-sm text-red-600 mb-1">{errors.bio?.message}</p>
                            </div>
                            
                            <div className="flex flex-col mb-2">
                                <label>City</label>
                                <input {...register("city")} placeholder="City"
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none" />
                                <p className="font-sm text-red-600 mb-1">{errors.city?.message}</p>
                            </div>
                            
                            <div className="flex flex-col mb-2">
                                <label>Country</label>
                                <input {...register("country")} placeholder="Country"
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none"/>
                                <p className="font-sm text-red-600 mb-1">{errors.country?.message}</p>
                            </div>

                            <div className="flex flex-col mb-2">
                                <label>Phone Nunber</label>
                                <input {...register("phoneNumber")} placeholder="Phone Number"
                                className="border border-zinc-300 rounded w-72 p-2 mt-1 outline-none" />
                                <p className="font-sm text-red-600 mb-1">{errors.phoneNumber?.message}</p>
                            </div>

                            <div>
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-full bg-blue-600 text-white px-5 py-3 cursor-pointer shadow-md">
                                    Submit
                                </button>
                            </div>
                            </form>
                    </div>
            </div>
            
        </div>
        
    )
}