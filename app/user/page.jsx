"use client"
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/user-requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Your Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-700">PC Type</th>
              <th className="px-6 py-3 border-b border-gray-700">Problem</th>
              <th className="px-6 py-3 border-b border-gray-700">
                Delivery Option
              </th>
              <th className="px-6 py-3 border-b border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className="hover:bg-gray-700 transition duration-300"
              >
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.pcType}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.problem}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.deliveryOption}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
