import React, { useContext } from "react";
import { FriendInfoNavBar } from "./friendInfoNavBar";
import { ConversationSection } from "./conversationSection";
import { ConversationsInputSection } from "./conversationsInputSection";
import { chatInfoContext } from "@/app/(pages)/chats/page";

export const ChatingSection = () => {
  const { chatInfo } = useContext(chatInfoContext);
  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      {chatInfo && (
        <>
          <FriendInfoNavBar />
          <ConversationSection />
          <ConversationsInputSection />
        </>
      )}
    </section>
  );
};
