import { auth } from "@/auth";
import { createChat } from "@/lib/action/createChat";
import React, { useState, useEffect, useRef, SetStateAction } from "react";
import { RiUserAddFill } from "react-icons/ri";
import { SessionProvider, useSession } from "next-auth/react";
import { validateCreateChat } from "@/lib/action/validateCreateChat";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import { userInfoFromSession } from "@/lib/types";
import { SignOutButton } from "./signOutButton";

export const Account = () => {
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState<userInfoFromSession>();
  useEffect(() => {
    const userInfoFunction = async () => {
      const user = await getUserFromSession();
      if (user) {
        setUserInfo(user);
        setImage(user.image as string);
        setName(user.name as string);
      }
    };
    userInfoFunction();
  }, []);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        console.log("====================================");
        console.log(reader.result);
        console.log("====================================");
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-16 h-16 relative flex flex-shrink-0">
      <img
        className="rounded-full w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
        alt="user-avatar"
        src={"https://randomuser.me/api/portraits/men/97.jpg"}
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
              setImage(userInfo?.image as string);
            }}
          ></div>
          <div className="relative bg-white p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
              Account Settings
            </h2>
            <form
              // onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="flex justify-around">
                <div
                  className="w-16 h-16 relative flex flex-shrink-0                     onClick={handleImageClick}
"
                  onClick={handleImageClick}
                >
                  <img
                    className="rounded-full w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                    alt="user-avatar"
                    src={
                      image || "https://randomuser.me/api/portraits/men/97.jpg"
                    }
                  />
                  <div className=" absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 rounded-full hover:bg-opacity-75 transition duration-200 opacity-0 hover:opacity-100">
                    <svg
                      className="w-6 h-6 text-white  transition duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      // xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                <input
                  type="text"
                  value={name}
                  // onChange={handleNameChange}
                  className="h-10 border-b-4 border-gray-300 focus:outline-none focus:border-blue-500 transition-shadow duration-200"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Change Password
                </label>
                <input
                  type="password"
                  value={password}
                  // onChange={handlePasswordChange}
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
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
};
