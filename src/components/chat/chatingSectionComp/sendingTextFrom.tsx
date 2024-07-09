"use client";
import React, { useContext, useState } from "react";
import { Sendingemoji } from "./sendingemoji";
import { socket } from "@/app/clientSocket";
import { chatInfoContext } from "@/app/(pages)/chats/page";
export const SendingTextFrom = () => {
  const [inputValue, setInputValue] = useState("");
  const { chatInfo } = useContext(chatInfoContext);
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", { message: inputValue, chat_id: chatInfo?.chatId });
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
