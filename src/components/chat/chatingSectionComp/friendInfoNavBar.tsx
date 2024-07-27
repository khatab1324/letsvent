"use client";
import React, { useContext } from "react";
import { chatInfoContext } from "@/app/(pages)/chats/page";
export const FriendInfoNavBar = () => {
  const { chatInfo } = useContext(chatInfoContext);
  return (
    <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
      <div className="flex">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src={chatInfo?.chatImage}
            alt=""
          />
        </div>
        <div className="text-sm ">
          <p className="font-bold mt-3">{chatInfo?.chatName}</p>
        </div>
      </div>
    </div>
  );
};
