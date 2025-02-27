"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpButton, useUser } from "@clerk/nextjs";

const AdminDashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

useEffect(() => {
  if (isLoaded) {
    if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
      setShowSignInPopup(true);
    } else {
      fetchRequests();
    }
  }
}, [isLoaded, isSignedIn, user]);


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

  const handleClosePopup = () => {
    setShowSignInPopup(false);
    router.push("/");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 pt-16 text-center px-4">
      {showSignInPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Access Required
            </h2>
            <p className="text-gray-600 mb-4">
              Only admins can access this page.
            </p>
            <SignUpButton>
              <button className="bg-blue-500 text-white px-4 mx-2 py-2 rounded-lg hover:bg-blue-600">
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
            {requests.filter(
              (r) =>
                (filterStatus === "All" || r.status === filterStatus) &&
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length > 0 ? (
              requests.map((request) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
