import React from "react";

export default function LodingSpinner({
  wordContent,
}: {
  wordContent: string;
}) {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white  dark:invert">
      <span className=" ">{wordContent} </span>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
