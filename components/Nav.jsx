import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Nav = () => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-800 w-full shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <Link
              href="/"
              className="hover:text-gray-400 transition duration-300"
            >
              Dern Security
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                Contact
              </Link>
            </li>

            {/* Clerk Authentication */}
            <li>
              <SignedOut>
                <SignInButton>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-10 w-10", // Adjust avatar size
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
