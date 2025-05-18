"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_ME, LOGOUT } from '@/graphql/queries';
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'no-cache',
  });

  const client = useApolloClient();
  const [logoutMutation] = useMutation(LOGOUT);

  useEffect(() => {
    if (!loading && !data?.me) {
      router.push("/login");
    }
  }, [loading, data, router]);

  const handleLogout = async () => {
    try {
      await logoutMutation();
      await client.clearStore();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  // ✅ Prevent error: don't access `user` unless data is ready
  if (loading || !data?.me) return <p>Loading profile...</p>;

  const user = data.me;

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex flex-row py-2 px-8 justify-end w-full shadow-xl">
        <button
        className="bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col p-10">
        <div className="mb-15">
          <h1 className="text-5xl font-bold">Welcome, <Link href="/update-profile" className="text-blue-600 cursor-pointer text-4xl font-bold">
              @<span className="text-5xl font-md">{user.username}</span> 
            </Link> </h1>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-10">
          {user.fullName && (
            <div className="flex flex-col items-start h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Name</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.fullName}</p>
              </div>
            </div>
          )}
          
          {user.age && (
            <div className="flex flex-col items-start h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Age</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.age}</p>
              </div>
            </div>
          )}

          {user.gender && (
            <div className="flex flex-col items-start h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Gender</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.gender}</p>
              </div>
            </div>
          )}

          {user.bio && (
            <div className="flex flex-col items-start h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Bio</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.bio}</p>
              </div>
            </div>
          )}
          {user.city && (
            <div className="flex flex-col items-start  h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">City</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.city}</p>
              </div>
            </div>
          )}
          {user.country && (
            <div className="flex flex-col items-start h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Country</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.country}</p>
              </div>
            </div>
          )}
          {user.email && (
            <div className="flex flex-col items-start  h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Email</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-2xl text-slate-800 mt-3">{user.email}</p>
              </div>
            </div>
          )}
          {user.phoneNumber && (
            <div className="flex flex-col items-start  h-28 bg-indigo-200 p-5 rounded-lg">
              <p className="font-md text-md text-indigo-400">Phone Number</p>
              <div className="flex flex-row items-center justify-center w-full">
                <p className="font-semibold text-3xl text-slate-800 mt-3">{user.phoneNumber}</p>
              </div>
            </div>
          )}

        </div>

        
        

        <div className="">
          <button className="rounded-full bg-blue-600 text-white px-5 py-3 cursor-pointer shadow-md" onClick={() => {router.push('/update-profile')}}>Update Profile</button>
        </div>
        

      </div>
    </div>
  );
}
