"use client";

import React, { useContext, useRef, useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { addMessageToChat } from "@/lib/action/Message";
import { getUserFromSession } from "@/lib/funcrions/getUserFromSession";
import { socket } from "@/app/clientSocket";
import { chatInfoContext } from "@/app/(pages)/chats/page";

export const SendingImg = () => {
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { chatInfo } = useContext(chatInfoContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendingImage = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageSrc) return;
    setUploading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: imageSrc }),
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data = await response.json();
      console.log("Uploaded image URL:", data.url);
      // Handle successful upload (e.g., save URL to state or database)
      const user = await getUserFromSession();
      console.log("user", user);
      if (user && data) {
        if (chatInfo?.role === "CHAT") {
          socket.emit("room message", {
            chat_id: chatInfo?.chatId,
            sender_id: user.id,
            message: "",
            media_link: data.url,
          });
        } else if (chatInfo?.role === "GROUP") {
          socket.emit("group message", {
            group_chat_id: chatInfo?.chatId,
            sender_id: user.id,
            message: "",
            media_link: data.url,
          });
        }
      }
      setImageSrc("");
    } catch (error) {
      console.error("Upload error:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setUploading(false);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <button
        type="button"
        className="flex flex-shrink-0 focus:outline-none mx-2  text-blue-600 hover:text-blue-700 w-6 h-6"
        onClick={handleButtonClick}
      >
        <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
          <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
        </svg>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleImageChange}
      />
      {imageSrc && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
            onClick={() => {
              setImageSrc(null);
            }}
          ></div>
          <div className="relative bg-zinc-900 p-8 rounded-lg shadow-2xl z-10 text-black w-full max-w-lg mx-4 sm:mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-white">
              Send Photo
            </h2>
            <img
              className="rounded-lg w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
              alt="user-avatar"
              src={imageSrc}
            />
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleSendingImage}
                disabled={uploading}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
