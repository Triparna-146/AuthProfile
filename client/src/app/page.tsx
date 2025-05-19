"use client";

import { GET_ME } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  const { data, loading: loadingUser } = useQuery(GET_ME, {
      fetchPolicy: "no-cache",
    });
  
  
    React.useEffect(() => {
      if (!loadingUser && data?.me) {
        router.push("/profile"); // Already logged in
      } else if(!loadingUser && !data?.me) {
        router.push("/login"); // Not logged in
      }
    }, [loadingUser, data, router]);

  return (
    <div>
    </div>
  );
}
