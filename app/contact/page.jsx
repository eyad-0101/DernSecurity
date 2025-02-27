"use client"
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pcType: "",
    problem: "",
    deliveryOption: "headquarters",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.pcType) newErrors.pcType = "PC type is required.";
    if (!formData.problem)
      newErrors.problem = "Problem description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/userRequests.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          pcType: "",
          problem: "",
          deliveryOption: "headquarters",
        });
        setErrors({});
      } else {
        setSubmitMessage("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        {/* Name Field */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
              errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-lg font-medium text-white mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* PC Type Field */}
        <div className="mb-6">
          <label
            htmlFor="pcType"
            className="block text-lg font-medium text-white mb-2"
          >
            PC Type
          </label>
          <input
            type="text"
            id="pcType"
            name="pcType"
            value={formData.pcType}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
              errors.pcType ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            required
          />
          {errors.pcType && (
            <p className="text-red-500 text-sm mt-1">{errors.pcType}</p>
          )}
        </div>

        {/* Problem Field */}
        <div className="mb-6">
          <label
            htmlFor="problem"
            className="block text-lg font-medium text-white mb-2"
          >
            Problem Description
          </label>
          <textarea
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
              errors.problem ? "focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            rows="5"
            required
          />
          {errors.problem && (
            <p className="text-red-500 text-sm mt-1">{errors.problem}</p>
          )}
        </div>

        {/* Delivery Option Field */}
        <div className="mb-6">
          <label
            htmlFor="deliveryOption"
            className="block text-lg font-medium text-white mb-2"
          >
            Delivery Option
          </label>
          <select
            id="deliveryOption"
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="headquarters">Drop Off at Headquarters</option>
            <option value="delivery">Request Delivery</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>

        {/* Success/Error Message */}
        {submitMessage && (
          <p
            className={`mt-4 text-lg ${
              submitMessage.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
