"use client";
import React, { useContext, useState } from "react";
import { Sendingemoji } from "./sendingemoji";
import { socket } from "@/app/clientSocket";
import { chatInfoContext } from "@/app/(pages)/chats/page";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
export const SendingTextFrom = () => {
  const [inputValue, setInputValue] = useState("");
  const { chatInfo } = useContext(chatInfoContext);
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await getUserFromSession();
    console.log("user", user);
    if (user) {
      console.log("====================================");
      console.log("chatInfo", chatInfo);
      console.log("====================================");
      if (chatInfo?.role === "CHAT") {
        socket.emit("room message", {
          chat_id: chatInfo?.chatId,
          sender_id: user.id,
          message: inputValue,
        });
      } else if (chatInfo?.role === "GROUP") {
        socket.emit("group message", {
          group_chat_id: chatInfo?.chatId,
          sender_id: user.id,
          message: inputValue,
        });
      }
    }
    setInputValue("");
  };
  return (
    <div className="relative flex-grow">
      <form onSubmit={onSubmitHandler}>
        <input
          className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Aa"
        />
        {/* TODO you can send emoji with the text */}
        {/* <Sendingemoji /> */}
      </form>
    </div>
  );
};
