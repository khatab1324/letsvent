import { chatInfoContext } from "@/app/(pages)/chats/page";
import { socket } from "@/app/clientSocket";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import { messageInfo } from "@/lib/types";
import clsx from "clsx";
import React, { useContext, useEffect, useRef, useState } from "react";

import { DeleteMassageButton } from "./deleteMassageButton";
import { EditMessage } from "./editMessage";
import { convertToValidDate } from "@/lib/action/convertToValidDate";

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

    const handleDeleteMessage = (message: messageInfo[0]) => {
      if (message)
        setChatInfo((prevChatInfo) => {
          if (prevChatInfo) {
            const updatedMessageInfo = prevChatInfo.messageInfo
              ? prevChatInfo.messageInfo.filter((mess) => {
                  return mess.id !== message.id;
                })
              : [];

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
    const handleEditMessage = (message: messageInfo[0]) => {
      if (message)
        setChatInfo((prevChatInfo) => {
          if (prevChatInfo) {
            const UpdateMessageInfo = prevChatInfo.messageInfo?.map(
              (prevMessage) => {
                if (prevMessage.id === message.id)
                  prevMessage.message = message.message;
                return prevMessage;
              }
            );
            return {
              ...prevChatInfo,
              messageInfo: UpdateMessageInfo,
            };
          }
          return undefined;
        });
    };
    socket.on("room message", handleMessage);
    socket.on("room deleteMessage", handleDeleteMessage);
    socket.on("room editMessage", handleEditMessage);
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
            <p className="p-4 text-center text-sm text-gray-500">
              {convertToValidDate(message.create_at)}
            </p>
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

                  {message.sender_id === currentUser?.id ? (
                    <>
                      <DeleteMassageButton
                        messageId={message.id}
                        senderId={message.sender_id}
                      />
                      <EditMessage
                        messageId={message.id}
                        senderId={message.sender_id}
                        textMessage={message.message}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
