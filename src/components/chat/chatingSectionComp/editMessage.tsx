import { chatInfoContext } from "@/app/(pages)/chats/page";
import { socket } from "@/app/clientSocket";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import React, { useContext, useState } from "react";
import { MdModeEdit } from "react-icons/md";

export const EditMessage = ({
  messageId,
  senderId,
  textMessage,
}: {
  messageId: string;
  senderId: string;
  textMessage: string;
}) => {
  const { chatInfo } = useContext(chatInfoContext);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleShowFromEditeClick = () => {
    setInputValue(textMessage);
    setIsEditFormOpen((prevState) => !prevState);
  };

  const handleSendEditMessage = async () => {
    console.log(messageId);
    const user = await getUserFromSession();
    if (inputValue) {
      if (chatInfo?.role === "CHAT") {
        if (user?.id === senderId)
          socket.emit("room editMessage", {
            chatId: chatInfo.chatId,
            messageId,
            textMessage: inputValue,
          });
      } else if (chatInfo?.role === "GROUP") {
        if (user?.id === senderId)
          socket.emit("group editMessage", {
            groupChatId: chatInfo.chatId,
            messageId,
            textMessage: inputValue,
          });
      }
      setInputValue("");
      setIsEditFormOpen((prevState) => !prevState);
    }
  };
  return (
    <div>
      <button
        type="button"
        className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
        onClick={handleShowFromEditeClick}
      >
        <MdModeEdit />
      </button>
      {isEditFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
            onClick={() => {
              setIsEditFormOpen((preState) => !preState);
            }}
          ></div>
          <div className="relative bg-zinc-900 p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
            <div className="w-full flex justify-start">
              <div className="w-full">
                <div>
                  <h2 className="text-3xl font-extrabold  text-white">
                    edit message{" "}
                  </h2>
                </div>
                <div className="py-3 mt-6 w-full flex justify-between">
                  <input
                    className="rounded-full py-2 pl-3 pr-10 mr-3 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    placeholder="Aa"
                  />
                  <button
                    className="bg-blue-900 p-3 rounded-2xl px-5 "
                    onClick={handleSendEditMessage}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
