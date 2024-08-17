import { chatInfoContext } from "@/app/(pages)/chats/page";
import { socket } from "@/app/clientSocket";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import { messageInfo } from "@/lib/types";
import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState } from "react";

export const ConversationSection = () => {
  const { chatInfo, setChatInfo } = useContext(chatInfoContext);
  const [currentUser, setCurrentUser] = useState<any>();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserFromSession();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("chatInfo", chatInfo);

    const handleMessage = (message: messageInfo[0]) => {
      if (message)
        setChatInfo((prevChatInfo) => {
          if (prevChatInfo) {
            const updatedMessageInfo = prevChatInfo.messageInfo
              ? [...prevChatInfo.messageInfo, message]
              : [message];

            return {
              ...prevChatInfo,
              messageInfo: updatedMessageInfo,
            };
          }
          return undefined;
        });
      else {
        console.log("recive null");
        return;
      }
    };

    socket.on("room message", handleMessage);

    //clean the listner
    return () => {
      socket.off("room message", handleMessage);
    };
  }, [chatInfo]);

  //this to auto scroll when new message added
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  // Scroll to the bottom whenever chatInfo changes
  useEffect(() => {
    scrollToBottom();
  }, [chatInfo]);
  return (
    <div ref={chatBodyRef} className="chat-body p-4 flex-1 overflow-y-auto">
      {chatInfo?.messageInfo &&
        chatInfo.messageInfo.map((message, index) => (
          <div key={index}>
            <p className="p-4 text-center text-sm text-gray-500">8:04 PM</p>
            <div
              className={clsx("flex flex-row", {
                "justify-end": message.sender_id === currentUser?.id,
                "justify-start": message.sender_id !== currentUser?.id,
              })}
            >
              <p className="w-3 relative flex flex-shrink-0"></p>
              <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                <div className="flex items-center group">
                  {message.media_link && (
                    <img className="w-30 h-36" src={message.media_link} />
                  )}
                  {message.message && (
                    <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                      {message.message}
                    </p>
                  )}

                  <button
                    type="button"
                    className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-full h-full fill-current"
                    >
                      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
