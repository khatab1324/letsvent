"use server";
import { signOut } from "@/auth";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";
import { getUserByName } from "../funcrions/userDatabase";

export async function validateCreateChat(freindName: string) {
  if (!freindName) {
    return { error: "Input value is required" };
  }
  const friend = await getUserByName(freindName);
  if (!friend) return { error: "username not found" };

  const currentUser = await getUserFromSession();
  if (!currentUser) {
    await signOut();
    return;
  }

  const currentUserChats = await db.chat.findMany({
    where: {
      participants: {
        some: {
          user_id: currentUser.id,
        },
      },
    },
    include: {
      participants: true,
    },
  });
  console.log(currentUserChats);
  const existingChat = currentUserChats.find((chat) => {
    return chat.participants.some((user) => user.user_id === friend.id);
  });
  if (!!existingChat) return { error: "the chat is exist" };
  return;
}
