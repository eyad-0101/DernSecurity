"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const UserDashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk is fully loaded

    if (!isSignedIn) {
      router.push("/sign-in"); // Redirect to sign-in if not authenticated
      return;
    }

    if (user?.publicMetadata?.role === "user") {
      fetchRequests();
    }
  }, [isLoaded, isSignedIn, user, router]);

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

  if (!isLoaded) {
    return <div className="text-white text-center mt-10">Loading...</div>; // Ensure proper loading state
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
