import { auth } from "@/auth";
import { createChat } from "@/lib/action/createChat";
import React, { useState, useEffect } from "react";
import { RiUserAddFill } from "react-icons/ri";
import { SessionProvider, useSession } from "next-auth/react";
import { validateCreateChat } from "@/lib/action/validateCreateChat";

export const Account = () => {
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user settings via API
      await auth.updateUserSettings({ name, image, password });
      setSuccess("Settings updated successfully");
      setError("");
      setPassword(""); // Clear password field after successful update
    } catch (error) {
      setError("Failed to update settings");
      setSuccess("");
    }
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-16 h-16 relative flex flex-shrink-0">
      <img
        className="rounded-full w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
        alt="user-avatar"
        src={image || "https://randomuser.me/api/portraits/men/97.jpg"}
        onClick={() => setShowUserForm(true)}
      />
      {showUserForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
            onClick={() => {
              setShowUserForm(false);
              setInputValue("");
              setError("");
              setSuccess("");
            }}
          ></div>
          <div className="relative bg-white p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
              Account Settings
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Change Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Change Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Change Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-800 transition-colors duration-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
