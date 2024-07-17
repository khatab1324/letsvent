"use client";

import { createContext, useEffect, useState } from "react";
import { socket } from "../../clientSocket";
import ChatSideBar from "@/components/chat/chatSideBarComp/chatSideBar";
import { ChatingSection } from "@/components/chat/chatingSectionComp/chatingSection";
import { Chat } from "@/lib/types";
//TODO :refact these code
interface ChatInfoContextType {
  chatInfo: Chat;
  setChatInfo: React.Dispatch<React.SetStateAction<Chat>>;
}
const chatInfoDefaultValue: ChatInfoContextType = {
  chatInfo: { chatId: "", friendId: "", friendName: "" },
  setChatInfo: () => {},
};
export const chatInfoContext = createContext(chatInfoDefaultValue);
export default function Home() {
  const [chatInfo, setChatInfo] = useState<Chat>();
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("room message", (data) => {
      console.log("====================================");
      console.log("helolo");
      console.log("====================================");
      console.log(socket.id);

      console.log(data);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  socket.on("welcome", (data) => {
    console.log("Received welcome message:", data.message);

    setData(data.message);
  });
  console.log(chatInfo);

  return (
    <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-row min-h-0">
          <chatInfoContext.Provider value={{ chatInfo, setChatInfo }}>
            <ChatSideBar />
            <ChatingSection />
          </chatInfoContext.Provider>
        </main>
      </div>
    </div>
  );
}
