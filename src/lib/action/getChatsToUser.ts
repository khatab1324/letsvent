"use server";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";

export async function getChats() {
  const user = await getUserFromSession();
  if (!user) return;
  const chats = await db.user.findUnique({
    where: { id: user.id },
    include: {
      ChatsParticipant: {
        include: {
          chat: {
            include: {
              participants: {
                include: {
                  user: true, // Include user information to get names
                },
              },
            },
          },
        },
      },
    },
  });
  const chatDetails = chats?.ChatsParticipant.map((participant) => {
    const chat = participant.chat;
    const otherParticipant = chat.participants.find(
      (p) => p.user.id !== user.id
    );

    return {
      chatId: chat.id,
      friendId: otherParticipant?.id,
      friendName: otherParticipant?.user.name,
    };
  });
  // TODO chatDetails add to id the last message
  return chatDetails;
}
