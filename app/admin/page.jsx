"use client"
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, status: newStatus } : request
          )
        );
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  // Filter and search logic
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.phone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || request.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-16 text-center">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 ml-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-700">Name</th>
              <th className="px-6 py-3 border-b border-gray-700">Email</th>
              <th className="px-6 py-3 border-b border-gray-700">Phone</th>
              <th className="px-6 py-3 border-b border-gray-700">Message</th>
              <th className="px-6 py-3 border-b border-gray-700">Status</th>
              <th className="px-6 py-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request._id}
                className="hover:bg-gray-700 transition duration-300"
              >
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.phone}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {request.message}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
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
                <td className="px-6 py-4 border-b border-gray-700">
                  <select
                    value={request.status}
                    onChange={(e) => updateStatus(request._id, e.target.value)}
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