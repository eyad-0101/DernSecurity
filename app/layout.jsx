"use client";
import "@styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import useRoleRedirect from "../utils/roleRedirect"; // Import the role redirect hook
import Nav from "@components/Nav";

const RootLayout = ({ children }) => {
  useRoleRedirect(); // Use the role redirect hook

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClerkProvider>
          <Nav />
          <main className="app">{children}</main>
          
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
