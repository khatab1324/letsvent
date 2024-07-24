"use client";
import React, { useEffect, useState } from "react";
import { getChats } from "@/lib/action/getChatsToUser";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FriendListToAdd } from "./friendListToAdd";
import { Chat } from "@/lib/types";
import { createGroup } from "@/lib/action/group";

export const AddGroup = () => {
  //TODO add all this fucking state in reducer
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [groupName, setgroupName] = useState("");
  const [chatsList, setChatList] = useState<Chat[]>([]);
  const [error, setError] = useState("");
  const [freindSelected, setFreindSelected] = useState<string[]>([]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (freindSelected.length < 2) {
      setError("you should pick at lest two freind");
      return;
    }
    //TODO add vaildate to check if these users are exist just for more securty
    await createGroup(freindSelected,groupName);
  };

  const changeNameGroupInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setgroupName(e.target.value);
  };

  const callChats = () => {
    getChats().then((data) => {
      if (!data) return;
      setChatList(data);
      //   TODO: use memo to cach the chats
    });
  };
  
  console.log(chatsList);

  return (
    <div>
      <button
        className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 md:block group-hover:block"
        onClick={() => {
          setShowUserForm(true);
          callChats();
        }}
      >
        <AiOutlineUsergroupAdd />
      </button>
      {showUserForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setShowUserForm(false);
              setgroupName("");
              setError("");
            }}
          ></div>
          <div className="relative bg-white p-8 rounded shadow-lg z-10 text-black">
            <h2 className="mb-4 text-lg font-bold">Add group</h2>
            <form className="" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="group name"
                className="mb-4 px-4 py-2 border rounded w-full"
                value={groupName}
                onChange={(e) => {
                  changeNameGroupInputHandler(e);
                }}
              />
              {/* TODO: add search for user here */}
              <p className="text-red-600"></p>
              {/* friend list */}
              {chatsList && (
                <FriendListToAdd
                  chatsList={chatsList}
                  setFreindSelected={setFreindSelected}
                  freindSelected={freindSelected}
                />
              )}{" "}
              <p className="text-red-500">{error}</p>
              <button
                type="submit"
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
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
