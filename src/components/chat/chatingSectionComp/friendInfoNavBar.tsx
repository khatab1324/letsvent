"use client";
import React, { useContext, useState } from "react";
import { chatInfoContext } from "@/app/(pages)/chats/page";
import { ChatInfo } from "./chatInfo";
import { getImageToMediaInChatInfo } from "@/lib/action/getChatsToUser";
export const FriendInfoNavBar = () => {
  const { chatInfo } = useContext(chatInfoContext);
  const [IsChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const [mediaImage, setMediaImage] = useState<
    {
      media_link: string | null;
    }[]
  >([]);

  const clickHandler = async () => {
    let mediaImageFromDatabase: {
      media_link: string | null;
    }[] = [];
    if (chatInfo)
      mediaImageFromDatabase = await getImageToMediaInChatInfo(
        chatInfo?.chatId
      );
    setMediaImage((prevState) => (prevState = mediaImageFromDatabase));
    setIsChatInfoOpen((preState) => !preState);
  };

  return (
    <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
      <div onClick={clickHandler} className="flex w-full">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src={chatInfo?.chatImage as string}
            alt=""
          />
        </div>
        <div className="text-sm ">
          <p className="font-bold mt-3">{chatInfo?.chatName}</p>
        </div>
      </div>
      {IsChatInfoOpen && (
        <ChatInfo
          mediaImage={mediaImage}
          setIsChatInfoOpen={setIsChatInfoOpen}
        />
      )}
    </div>
  );
};
