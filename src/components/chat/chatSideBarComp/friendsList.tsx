import { getChats } from "@/lib/action/getChatsToUser";
import React, { useEffect, useState } from "react";
type Chat = {
  chatId: string;
  friendId: string | undefined;
  friendName: string | null | undefined;
};
export const FriendsList = () => {
  const [chatsList, setChatList] = useState<Chat[]>([]);
  useEffect(() => {
    getChats().then((data) => {
      if (!data) return;
      setChatList(data);
    });
  }, []);
  const clickHandler = () => {
    
  };
  return (
    <div className="contacts p-2 flex-1 overflow-y-scroll">
      {chatsList.length > 0 &&
        chatsList.map((chat) => (
          <div
            className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative hover:cursor-pointer"
            onClick={clickHandler}
          >
            <div className="w-16 h-16 relative flex flex-shrink-0">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/men/97.jpg"
                alt=""
              />
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
              <p className="font-bold">{chat.friendName}</p>
              <div className="flex items-center text-sm font-bold">
                {/* this for the last message */}
                {/* <div className="min-w-0">
                  <p className="truncate">Hey, Are you there?</p>
                </div>
             */}
              </div>
            </div>
            <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
          </div>
        ))}
    </div>
  );
};
