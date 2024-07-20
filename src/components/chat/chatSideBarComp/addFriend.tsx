"use client";
import { auth } from "@/auth";
import { createChat } from "@/lib/action/createChat";
import React, { useState } from "react";
import { RiUserAddFill } from "react-icons/ri";
import { SessionProvider, useSession } from "next-auth/react";
import { validateCreateChat } from "@/lib/action/validateCreateChat";

export const AddFriend = () => {
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const validate = await validateCreateChat(inputValue);
    console.log(validate);
    if (validate?.error) {
      setError(validate.error);
    } else {
      createChat(inputValue);
      setShowUserForm(false);
    }
  };
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    //TODO: add suggestion list , i don't know
    //like the user search and he will find the close name friend
  };
  return (
    <div>
      <button
        className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 md:block group-hover:block"
        onClick={() => {
          setShowUserForm(true);
        }}
      >
        <RiUserAddFill />
      </button>
      {showUserForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setShowUserForm(false);
              setInputValue("");
              setError("");
            }}
          ></div>
          <div className="relative bg-white p-8 rounded shadow-lg z-10 text-black">
            <h2 className="mb-4 text-lg font-bold">Add Friend</h2>
            <form className="" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Search"
                className="mb-4 px-4 py-2 border rounded w-full"
                value={inputValue}
                onChange={(e) => {
                  changeInputHandler(e);
                }}
              />
              <p className="text-red-600">{error}</p>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
