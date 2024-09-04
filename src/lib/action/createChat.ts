"use server";
import { auth, signOut } from "@/auth";
import { getUserByEmail, getUserByName } from "../funcrions/userDatabase";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";

//TODO: scurity risk!!!!!!
//add auth for function that export fom use server becase the use server make end point for every function that is exported
//use header to check

export async function createChat(friendName: string) {
  const user = await getUserFromSession();

  if (!user) return;
  //   add these adding to sprete file that locat in funcitons file
  const chat = await db.chat.create({ data: {} });
  await db.chatParticipant.create({
    data: {
      chat_id: chat.id,
      user_id: user.id,
    },
  });
  const friend = await getUserByName(friendName);
  if (!friend) return { error: "username is not found" };
  await db.chatParticipant.create({
    data: {
      chat_id: chat.id,
      user_id: friend.id,
    },
  });
}
