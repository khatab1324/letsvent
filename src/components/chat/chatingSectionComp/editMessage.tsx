import React from "react";
import { MdModeEdit } from "react-icons/md";

export const EditMessage = ({ messageId }: { messageId: string }) => {
  return (
    <button
      type="button"
      className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2"
    >
      <MdModeEdit />
    </button>
  );
};
