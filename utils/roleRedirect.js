import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

const useRoleRedirect = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.publicMetadata.role === "admin") {
        router.push("/admin"); // Redirect to admin page
      } else {
        router.push("/user"); // Redirect to user page
      }
    }
  }, [user, router]);
};

export default useRoleRedirect;
