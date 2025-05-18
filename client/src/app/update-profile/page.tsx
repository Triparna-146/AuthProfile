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
    
      console.log("Login Data", data);
    
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

            console.log("Profile Updated", res);
            toast.success("Profile Updated");
            router.push("/profile");
            
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }  
    }

    return (
        <div className="flex flex-col  min-h-screen py-2">
            <div className="flex flex-col py-8 px-5 w-full ">
                {
                    user && (   
                        <h1>@<span>{user.username}</span></h1>
                    )
                }
                
                <h1 className="mb-10 text-3xl font-semibold">{loading ? "Updating" : "Update Details"}</h1>
                <form onSubmit={handleSubmit(onSubmit)} >
                                        {/* Full Name */}
                    <div className="flex flex-col mb-2">
                        <label>Full Name</label>
                        <input type="text" {...register("fullName")}   />
                        <p style={{ color: "red" }}>{errors.fullName?.message}</p>
                    </div>
                    
                    <div className="flex flex-col mb-2">
                        <label>Age</label>
                        <input type="Number" {...register("age")} />
                        <p style={{ color: "red" }}>{errors.fullName?.message}</p>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col mb-2">
                        <label>Gender</label>
                        <select {...register("gender")}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        </select>
                        <p style={{ color: "red" }}>{errors.gender?.message}</p>
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col mb-2">
                        <label>Bio</label>
                        <textarea {...register("bio")} rows={3} />
                        <p style={{ color: "red" }}>{errors.bio?.message}</p>
                    </div>
                    
                    <div className="flex flex-col mb-2">
                        <label>City</label>
                        <input {...register("city")} />
                        <p style={{ color: "red" }}>{errors.city?.message}</p>
                    </div>
                    
                    <div className="flex flex-col mb-2">
                        <label>Country</label>
                        <input {...register("country")} />
                        <p style={{ color: "red" }}>{errors.country?.message}</p>
                    </div>

                    <div className="flex flex-col mb-2">
                        <label>Phone Nunber</label>
                        <input {...register("phoneNumber")} />
                        <p style={{ color: "red" }}>{errors.phoneNumber?.message}</p>
                    </div>

                    <button type="submit" style={{ marginTop: 20 }}>
                        Submit
                    </button>
                    </form>
                {/* <Link href="/login">Sign here</Link> */}
            </div>
        </div>
        
    )
}