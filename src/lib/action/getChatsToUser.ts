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
                  user: true,
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
    console.log(
      {
        chatId: chat.id,
        friendId: otherParticipant?.user.id,
        friendName: otherParticipant?.user.name,
      }
    );

    return {
      chatId: chat.id,
      friendId: otherParticipant?.user.id,
      friendName: otherParticipant?.user.name,
      friendImage: otherParticipant?.user.image,
    };
  });
  // TODO chatDetails add to id the last message
  return chatDetails;
}
export async function getChatConversation(chatId: string) {
  const chatMessages = await db.chatMessage.findMany({
    where: { chat_id: chatId },
  });
  console.log(chatMessages);
  return chatMessages;
}
