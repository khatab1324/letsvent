import { chatInfoContext } from "@/app/(pages)/chats/page";
import { getImageToMediaInChatInfo } from "@/lib/action/getChatsToUser";
import React, { useContext, useEffect } from "react";

export const ChatInfo = ({
  mediaImage,
  setIsChatInfoOpen,
}: {
  mediaImage: {
    media_link: string | null;
  }[];
  setIsChatInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { chatInfo } = useContext(chatInfoContext);

  console.log("====================================");
  console.log(mediaImage);
  console.log("====================================");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
        onClick={() => {
          setIsChatInfoOpen((preState) => !preState);
        }}
      ></div>
      <div className="relative bg-zinc-900 p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
        <div className="w-full flex justify-center">
          <div className="w-full flex justify-start items-center">
            <div className="w-14 h-14 mr-4 ">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src={chatInfo?.chatImage as string}
                alt=""
              />
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              {chatInfo?.chatName}
            </h2>
          </div>
        </div>
        <div className="w-full py-4 mt-10">
          <h2 className="text-white text-2xl">Media</h2>
        </div>
        <hr />
        <div className="flex flex-wrap gap-4 justify-center mt-4 max-h-64 overflow-y-auto">
          {mediaImage.map((image, index) => (
            <div
              key={index}
              className="w-28 h-24 bg-gray-800 p-1 rounded-md overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
            >
              {image.media_link && (
                <img
                  src={image.media_link}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
