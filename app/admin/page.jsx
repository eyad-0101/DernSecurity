import React from "react";

const AdminPage = () => {
  return (
    <section className="w-full flex-col bg-gray-900 min-h-screen p-8 mt-16">
      <h1 className="text-5xl font-bold text-white mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-300">
        Welcome to the admin dashboard. Here you can manage users, view reports,
        and configure settings.
      </p>
      {/* Additional admin functionalities can be added here */}
    </section>
  );
};

export default AdminPage;
