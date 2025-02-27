"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AdminDashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
        router.push("/"); // Redirect non-admin users to home
      } else {
        fetchRequests();
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/requests");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      setRequests(await response.json());
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 pt-16 text-center px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-lg w-full sm:w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-lg w-full sm:w-64"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full max-w-6xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests
              .filter(
                (r) =>
                  (filterStatus === "All" || r.status === filterStatus) &&
                  r.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((request) => (
                <tr key={request._id} className="hover:bg-gray-700">
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.phone}</td>
                  <td>{request.message}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        request.status === "Pending"
                          ? "bg-yellow-500"
                          : request.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) =>
                        updateStatus(request._id, e.target.value)
                      }
                      className="bg-gray-700 text-white px-2 py-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
