import React from "react";
import { FriendInfoNavBar } from "./friendInfoNavBar";
import { ConversationSection } from "./conversationSection";
import { ConversationsInputSection } from "./conversationsInputSection";

export const ChatingSection = () => {
  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <FriendInfoNavBar />
      <ConversationSection />
      <ConversationsInputSection />
    </section>
  );
};
