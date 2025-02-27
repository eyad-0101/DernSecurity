// ClientWrapper.jsx (Client Component)
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Updated import
import { useEffect } from "react";

const ClientWrapper = ({ children }) => {
  const { user } = useUser();
  const router = useRouter(); // Updated hook

  useEffect(() => {
    if (user) {
      if (user.publicMetadata.role === "admin") {
        router.push("/admin"); // Redirect to admin page
      } else {
        router.push("/user"); // Redirect to user page
      }
    }
  }, [user, router]);

  return <>{children}</>;
};

export default ClientWrapper;
