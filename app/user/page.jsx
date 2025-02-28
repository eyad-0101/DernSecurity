"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { SignUpButton, useUser } from "@clerk/nextjs"; // Import useUser from Clerk

const UserDashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false); // State for the sign-in popup

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Check if the user is a regular user
      const role = user?.publicMetadata?.role; // Assuming role is stored in publicMetadata
      if (role !== "user") {
        setShowSignInPopup(true); // Show popup if not a regular user
      } else {
        fetchRequests(); // Fetch requests if the user is signed in and is a regular user
      }
    } else if (isLoaded && !isSignedIn) {
      setShowSignInPopup(true); // Show popup if not signed in
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/userRequests");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      // Filter requests based on the logged-in user
      const userRequests = data.filter((request) => request.userId === user.id);
      setRequests(userRequests);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteRequest = async (id) => {
    try {
      const response = await fetch(`/api/userRequests/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete request.");
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClosePopup = () => {
    setShowSignInPopup(false); // Close the sign-in popup
    router.push("/"); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16 px-4">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8">
        Your Requests
      </h1>

      {showSignInPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-4">
              You need to sign in to access your requests.
            </p>
            <SignUpButton>
              <button className="bg-blue-500 text-white px-4 mx-2 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Sign Up
              </button>
            </SignUpButton>
            <button
              onClick={handleClosePopup}
              className="mt-4 text-gray-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error ? (
        <p className="text-red-500 text-center text-lg font-semibold p-4 bg-gray-800 rounded-lg">
          {error}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800 p-4">
          <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-gray-300 uppercase">
                  PC Type
                </th>
                <th className="px-6 py-4 text-left text-gray-300 uppercase">
                  Problem
                </th>
                <th className="px-6 py-4 text-left text-gray-300 uppercase">
                  Delivery Option
                </th>
                <th className="px-6 py-4 text-left text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-gray-300 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 text-gray-300">
                      {request.pcType}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.problem}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {request.deliveryOption}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm font-bold rounded-full transition ${
                          request.status === "Pending"
                            ? "bg-yellow-500 text-yellow-900"
                            : request.status === "Approved"
                            ? "bg-green-500 text-green-900"
                            : "bg-red-500 text-red-900"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-700">
                      <button
                        onClick={() => deleteRequest(request._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
