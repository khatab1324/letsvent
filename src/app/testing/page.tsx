"use client";

import { useEffect, useState } from "react";
import { socket } from "../clientSocket";
import ChatSideBar from "@/components/chat/chatSideBarComp/chatSideBar";
import { ChatingSection } from "@/components/chat/chatingSectionComp/chatingSection";

export default function Home() {
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

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  socket.on("welcome", (data) => {
    console.log("Received welcome message:", data.message);

    setData(data.message);
  });
  return (
    <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-row min-h-0">
          <ChatSideBar />
          <ChatingSection />
        </main>
      </div>
    </div>
  );
}
