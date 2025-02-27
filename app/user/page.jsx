import React from "react";

const UserPage = () => {
  return (
    <section className="w-full flex-col bg-gray-900 min-h-screen p-8 mt-16">
      <h1 className="text-5xl font-bold text-white mb-4">User Dashboard</h1>
      <p className="text-lg text-gray-300">
        Welcome to the user dashboard. Here you can view your profile, manage
        your settings, and access user-specific features.
      </p>
      {/* Additional user functionalities can be added here */}
    </section>
  );
};

export default UserPage;
