"use client";
import {
  getChatConversation,
  getChatFromId,
  getChats,
} from "@/lib/action/getChatsToUser";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { chatInfoContext } from "@/app/(pages)/chats/page";
import { Chat, ChatsList, messageInfo, Role } from "@/lib/types";
import { socket } from "@/app/clientSocket";
import {
  getGroupById,
  getGroupChatConversation,
  getGroupsFromDatabase,
} from "@/lib/action/getGroup";
export const FriendsList = () => {
  const { setChatInfo } = useContext(chatInfoContext);
  const [chatsList, setChatList] = useState<ChatsList[]>([]);

  useEffect(() => {
    //this code will be change
    //TODO: edit this no body will call function like this

    const callGetGroup = async () => {
      const userChats = await getChats();
      const groups = await getGroupsFromDatabase();
      if (userChats) {
        const userChatList = userChats.map((chat) => {
          return {
            role: chat.role as Role,
            chatId: chat.chatId,
            chatName: chat.chatName || "",
            img_url: chat.chatImage || null,
          };
        });
        setChatList(userChatList);
      }
      if (!groups) return;
      const newChats: ChatsList[] = groups.map((groupChat) => ({
        role: groupChat.role as Role,
        chatId: groupChat.chatId,
        chatName: groupChat.chatName,
        img_url: groupChat.chatImage,
      }));

      setChatList((chatsList) => [...chatsList, ...newChats]);
    };
    callGetGroup();
  }, []);

  const clickHandler = async (chat: ChatsList) => {
    if (chat) {
      // TODO make the select based on the role
      //  NOTE: this code written before the role
      let chatsInfo = await getChatFromId(chat.chatId);
      if (!chatsInfo) chatsInfo = await getGroupById(chat.chatId);
      //TODO : make the the chatInfo take group id and chat id
      let messageInfo = await getChatConversation(chat.chatId);
      if (!messageInfo || messageInfo.length == 0)
        messageInfo = await getGroupChatConversation(chat.chatId);
      console.log("====================================");
      console.log("messageInfo", messageInfo);
      console.log("====================================");
      chatsInfo?.map((chatInfo: Chat) => {
        //TODO :edit this any
        setChatInfo((prevChatInfo: any) => {
          return {
            ...prevChatInfo,
            role: chatInfo?.role,
            chatId: chatInfo?.chatId,
            chatName: chatInfo?.chatName,
            chatImage: chatInfo?.chatImage,
            friends: prevChatInfo?.friends,
            messageInfo,
          };
        });
      });

      socket.emit("join-chat", chat.chatId);
    }

    // TODO: make join for all user chats
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
                src={
                  chat?.img_url ||
                  "data:image/webp;base64,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"
                }
                alt=""
              />
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
              <p className="font-bold">{chat?.chatName}</p>
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
