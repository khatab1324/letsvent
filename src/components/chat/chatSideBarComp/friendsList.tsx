"use client";
import { getChatConversation, getChats } from "@/lib/action/getChatsToUser";
import React, { useContext, useEffect, useState } from "react";
import { chatInfoContext } from "@/app/(pages)/chats/page";
import { Chat, messageInfo } from "@/lib/types";
import { socket } from "@/app/clientSocket";
import { getGroupFromDatabase } from "@/lib/action/getGroup";
export const FriendsList = () => {
  const { setChatInfo } = useContext(chatInfoContext);
  const [chatsList, setChatList] = useState<Chat[]>([]);
  useEffect(() => {
    getChats().then((data) => {
      if (!data) return;
      setChatList(data);
    });
    //this code will be change
    //TODO: edit this no body will call function like this
    const callGetGroup = async () => {
      const saveDataInVarable = await getGroupFromDatabase();
      if (!saveDataInVarable) return;

      // Convert each group chat to the Chat type format
      const newChats: Chat[] = saveDataInVarable.map((groupChat) => ({
        chatId: groupChat.id,
        friendId: undefined,
        friendName: null,
        groupChats: [groupChat], // Wrapping groupChat in an array to match groupChats type
      }));

      setChatList((chatsList) => [...chatsList, ...newChats]);
    };
    callGetGroup();
  }, []);
  const clickHandler = async (chat: Chat) => {
    let messageInfo: messageInfo;
    if (chat)
      await getChatConversation(chat.chatId).then((data) => {
        if (data) {
          messageInfo = data;
          chat.messageInfo = messageInfo;
        }
        console.log("====================================");
        console.log("chat id :", chat.chatId);
        console.log("====================================");
        socket.emit("join-chat", chat.chatId);
      });
    //TODO: make join for all user chats
    setChatInfo(chat);
  };
  return (
    <div className="contacts p-2 flex-1 overflow-y-scroll">
      {chatsList.length > 0 &&
        chatsList.map((chat, index) => (
          <div
            key={index}
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
              <p className="font-bold">
                {chat?.friendName ||
                  (chat?.groupChats && chat.groupChats[0]?.group_name)}
              </p>
              <div className="flex items-center text-sm font-bold">
                {/* This is for the last message */}
                {/* <div className="min-w-0">
                  <p className="truncate">Hey, Are you there?</p>
                </div> */}
              </div>
            </div>
            <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
          </div>
        ))}
    </div>
  );
};
