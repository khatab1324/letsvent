import React, { useState, useEffect, useRef, SetStateAction } from "react";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import { userInfoFromSession } from "@/lib/types";
import { SignOutButton } from "./signOutButton";
import { useSession } from "next-auth/react";
import { updateUserInfo } from "@/lib/action/updateUserInfo";
import { updateUserInfoFromDatabase } from "@/lib/action/interactWithDatabase/updateUser";
import { ChangingPasswordForm } from "./changingPasswordForm";

export const Account = () => {
  //use reducere
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [changedImage, setChangedImage] = useState<string>();
  const [userInfo, setUserInfo] = useState<userInfoFromSession>();
  const [changedName, setchangedName] = useState<string>();
  const [changedPhoneNumber, setChangedPhoneNumber] = useState<string>();
  const [changedEmail, setChangedEmail] = useState<string>();
  const { data: session, update } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userInfoFunction = async () => {
      const user = await getUserFromSession();
      if (user) {
        setUserInfo(user);
        setChangedImage(user.image as string);
      }
    };
    userInfoFunction();
  }, []);

  //TODO: add this to hock and reuse it in this file and in sending image file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChangedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (changedImage) {
    //   console.log("====================================");
    //   console.log(changedImage);
    //   console.log("====================================");
    // }
    // console.log(await update({ name: "sssssssssss" }));
    // if (session) session.user.name = "ssss";

    // const userInfoFunction = async () => {
    //   const user = await getUserFromSession();
    //   if (user) {
    //     setUserInfo(user);
    //     setChangedImage(user.image as string);
    //   }
    // };
    // userInfoFunction();
    console.log(session);

    if (session) {
      if (changedName) {
        const updateUser = await updateUserInfo({
          name: changedName,
        });
        if (updateUser)
          console.log(
            await update({
              ...session,
              user: { ...session.user, name: changedName },
            })
          );
        setchangedName("");
        console.log(updateUser);
        setUserInfo(updateUser);
      }
      if (changedImage) {
        //upload the image
        //TODO: add the uploading the image to function
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: changedImage }),
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const data = await response.json();
        console.log("Uploaded image URL:", data.url);

        const updateUser = await updateUserInfo({
          image: data.url,
        });
        if (updateUser)
          console.log(
            await update({
              ...session,
              user: { ...session.user, image: data.url },
            })
          );
        setChangedImage("");
        setUserInfo(updateUser);
        setShowUserForm(!showUserForm);
      }
    }
  };

  return (
    <div className="w-16 h-16 relative flex flex-shrink-0">
      <img
        className="rounded-full w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
        alt="user-avatar"
        src={
          userInfo?.image || "https://randomuser.me/api/portraits/men/97.jpg"
        }
        onClick={() => setShowUserForm(true)}
      />

      {showUserForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
            onClick={() => {
              setShowUserForm(false);
              setChangedImage("");
              setError("");
              setSuccess("");
            }}
          ></div>
          <div className="relative bg-white p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
              Account Settings
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      changedImage ||
                      userInfo?.image ||
                      "https://randomuser.me/api/portraits/men/97.jpg"
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
                  value={changedName || (userInfo?.name as string)}
                  // onChange={handleNameChange}
                  className="h-10 border-b-4 border-gray-300 focus:outline-none focus:border-blue-500 transition-shadow duration-200"
                  onChange={(e) => setchangedName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  email{" "}
                </label>
                <input
                  type="email"
                  // onChange={handlePasswordChange}
                  className="w-full h-10 border-b-4 border-gray-300 focus:outline-none focus:border-blue-500 transition-shadow duration-200"
                  value={changedEmail || userInfo?.email}
                />
              </div>
              <div>
                {" "}
                <label className="block mb-2 font-medium text-gray-700">
                  phone
                </label>
                <input
                  type="password"
                  value={""}
                  placeholder="07XXXXXXXX"
                  className="w-full h-10 border-b-4 border-gray-300 focus:outline-none focus:border-blue-500 transition-shadow duration-200"
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
            <ChangingPasswordForm />

            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
};
