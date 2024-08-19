"use server";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";
import { Chat } from "../types";

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
    //TODO : return variable that have type chat[]
    return {
      role: "CHAT",
      chatId: chat.id,
      chatName: otherParticipant?.user.name,
      friends: [
        {
          friendId: otherParticipant?.user.id,
          friendName: otherParticipant?.user.name,
          friendImage: otherParticipant?.user.image,
        },
      ],
      chatImage: otherParticipant?.user.image,
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

export async function getChatFromId(chatId: string) {
  const user = await getUserFromSession();
  if (!user) return;
  const chat = await db.chat.findUnique({
    where: { id: chatId },
    include: {
      participants: {
        include: { user: true },
      },
    },
  });
  // const friend = chat?.participants.find(
  //   (element) => element.user.id !== user.id
  // );
  if (!chat) {
    console.log({ error: "chat not found" });
    return;
  }
  const friendsInfo: Chat[] = chat?.participants.map((participant) => {
    if (participant.user.id !== user.id) {
      return {
        role: "CHAT",
        chatId,
        chatName: participant?.user.name,
        friends: [
          {
            friendId: participant?.user.id,
            friendName: participant?.user.name,
            friendImage: participant?.user.image,
          },
        ],
        chatImage: participant.user.image,
      };
    }
    return undefined;
  });
  return friendsInfo;
}

export async function getImageToMediaInChatInfo(chatId: string) {
  const mediaLink = await db.chatMessage.findMany({
    where: {
      chat_id: chatId,
      media_link: {
        not: null,
      },
    },
    select: { media_link: !null },
  });
  console.log("====================================");
  console.log(mediaLink);
  console.log("====================================");
  return mediaLink;
}
