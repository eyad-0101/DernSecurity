"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Use Clerk authentication

const UserDashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null); // Store user role

  useEffect(() => {
    if (!isLoaded) return; // Don't proceed until Clerk has loaded

    if (!isSignedIn) {
      router.push("/"); // Redirect if not signed in
      return;
    }

    // Extract role safely
    const userRole = user?.publicMetadata?.role;
    if (!userRole) return; // Ensure role is available

    setRole(userRole); // Store role in state

    if (userRole !== "user") {
      router.push("/"); // Redirect non-users
      return;
    }

    fetchRequests(); // Fetch requests only if user has correct role
  }, [isLoaded, isSignedIn, user, router]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/userRequests");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError(error.message);
    }
  };

  const deleteRequest = async (id) => {
    try {
      const response = await fetch(`/api/userRequests/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete request. Status: ${response.status}`);
      }

      // Remove from state
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
    } catch (error) {
      console.error("Error deleting request:", error);
      setError(error.message);
    }
  };

  if (!isLoaded || !isSignedIn || role !== "user") {
    return null; // Prevent rendering if user isn't ready or isn't authorized
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16 px-4">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8">
        Your Requests
      </h1>

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
                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-300"
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
