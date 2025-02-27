"use client";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/requests");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Update request status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const updatedRequest = await response.json();

      // Update the local state with the updated request
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
      setError(error.message);
    }
  };

  // Filter requests based on search query and status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.phone?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || request.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex justify-center items-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex justify-center items-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 pt-16 text-center px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="w-full max-w-6xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-3 border-b border-gray-700">Name</th>
              <th className="px-4 py-3 border-b border-gray-700">Email</th>
              <th className="px-4 py-3 border-b border-gray-700">Phone</th>
              <th className="px-4 py-3 border-b border-gray-700">Message</th>
              <th className="px-4 py-3 border-b border-gray-700">Status</th>
              <th className="px-4 py-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-700 transition duration-300"
                >
                  <td className="px-4 py-3 border-b border-gray-700">
                    {request.name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    {request.email}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    {request.phone}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    {request.message}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        request.status === "Pending"
                          ? "bg-yellow-500 text-yellow-900"
                          : request.status === "In Progress"
                          ? "bg-blue-500 text-blue-900"
                          : "bg-green-500 text-green-900"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
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
