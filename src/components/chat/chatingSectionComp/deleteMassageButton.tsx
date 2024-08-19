import { chatInfoContext } from "@/app/(pages)/chats/page";
import { socket } from "@/app/clientSocket";
import React, { useContext, useEffect } from "react";
import { MdDelete } from "react-icons/md";

export const DeleteMassageButton = ({ messageId }: { messageId: string }) => {
  const { chatInfo } = useContext(chatInfoContext);
  const handleDeleteClick = async (messageId: string) => {
    console.log(messageId);

    if (chatInfo?.role === "CHAT") {
      socket.emit("room deleteMessage", { chatId: chatInfo.chatId, messageId });
    } else if (chatInfo?.role === "GROUP") {
      socket.emit("group deleteMessage", messageId);
    }
  };
  return (
    <button
      type="button"
      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8  "
      onClick={() => handleDeleteClick(messageId)}
    >
      <MdDelete size={20} className="ml-2" />
    </button>
  );
};
