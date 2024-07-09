"use client";
import { getChatConversation, getChats } from "@/lib/action/getChatsToUser";
import React, { useContext, useEffect, useState } from "react";
import { chatInfoContext } from "@/app/(pages)/chats/page";
import { Chat, messageInfo } from "@/lib/types";
export const FriendsList = () => {
  const { setChatInfo } = useContext(chatInfoContext);
  const [chatsList, setChatList] = useState<Chat[]>([]);
  useEffect(() => {
    getChats().then((data) => {
      if (!data) return;
      setChatList(data);
    });
  }, []);
  const clickHandler = async (chat: Chat) => {
    let messageInfo: messageInfo;
    if (chat)
      await getChatConversation(chat.chatId).then((data) => {
        if (data) {
          messageInfo = data;
          chat.messageInfo = messageInfo;
        }
      });

    setChatInfo(chat);
  };
  return (
    <div className="contacts p-2 flex-1 overflow-y-scroll">
      {chatsList.length > 0 &&
        chatsList.map((chat) => (
          <div
            className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative hover:cursor-pointer"
            onClick={() => clickHandler(chat)}
          >
            <div className="w-16 h-16 relative flex flex-shrink-0">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/men/97.jpg"
                alt=""
              />
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
              <p className="font-bold">{chat?.friendName}</p>
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
