import clsx from "clsx";
import React, { useState } from "react";

export const FriendListToAdd = ({
  chatsList,
  setFreindSelected,
  freindSelected,
}: {
  chatsList: any;
  setFreindSelected: React.Dispatch<React.SetStateAction<string[]>>;
  freindSelected: string[];
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Your Chats</h3>
      <div className="h-80 overflow-y-auto">
        <ul className="space-y-4">
          {chatsList.map((chat: any) => (
            <li
              key={chat.chatId}
              className={clsx(
                "flex items-center justify-between p-4 rounded shadow-sm bg-gray-100 hover:bg-gray-200",
                {
                  "bg-gray-400 hover:bg-gray-400": freindSelected.includes(
                    chat.chatId
                  ),
                }
              )}
              onClick={() => {
                const isIdInFreindSelect = freindSelected.find((id) => {
                  return id === chat.chatId;
                });
                if (!isIdInFreindSelect) {
                  setFreindSelected((freindSelected) => [
                    ...freindSelected,
                    chat.chatId,
                  ]);
                } else {
                  setFreindSelected((freindSelected) =>
                    freindSelected.filter((id) => {
                      return id !== chat.chatId;
                    })
                  );
                }
              }}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src={
                      chat.chatImage ||
                      "https://randomuser.me/api/portraits/men/97.jpg"
                    }
                    alt=""
                  />
                </div>
                <p className="ml-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                  {chat.chatName || "Unknown Friend"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
