import React from "react";
import { SendingFile } from "./sendingFile";
import {SendingImg} from "./sendingImg";
import { SendingTextFrom } from "./sendingTextFrom";

export const ConversationsInputSection = () => {
  return (
    <div className="chat-footer flex-none">
      <div className="flex flex-row items-center p-4">
        <SendingFile />
        <SendingImg />
        <SendingTextFrom />
      </div>
    </div>
  );
};
