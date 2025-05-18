"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { GET_ME } from '@/graphql/queries';

export default function ProfilePage() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'no-cache',
  });

  console.log("Profile Data", data);

  // Redirect if not authenticated
  useEffect(() => {
  if (!loading && !data?.me) {
    router.push("/login");
  }
}, [loading, data, router]);

  if (loading || !data?.me) return <p>Loading...</p>;

  const user = data.me;

  console.log("User", user);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/login');
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello, {user.fullName}</h1>

      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
