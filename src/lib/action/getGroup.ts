"use server";
import { signOut } from "next-auth/react";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";
import { Chat } from "../types";

export async function getGroupsFromDatabase() {
  const currentUser = await getUserFromSession();
  if (!currentUser) {
    signOut();
    return;
  }
  console.log("currentUser:", currentUser.id);

  const groupParticipantIds = await db.groupParticipant.findMany({
    where: {
      user_id: currentUser.id,
    },
    select: {
      group_id: true,
    },
  });

  const groupIds = groupParticipantIds.map(
    (participant) => participant.group_id
  );

  const groupChats = await db.groupChat.findMany({
    where: {
      id: {
        in: groupIds,
      },
    },
    include: {
      participants: {
        include: {
          user: true, // Assuming you have a relation to fetch user details
        },
      },
    },
  });

  console.log("groupChats:+=================", groupChats);
  //TODO : return type that have chat[]
  const result = groupChats.map((groupChat) => {
    const friends = groupChat.participants.map((participant) => {
      const { id, name, image } = participant.user;
      return {
        friendId: id,
        friendName: name,
        friendImage: image,
      };
    });
    return {
      role: "GROUP",
      chatId: groupChat.id,
      chatName: groupChat.group_name,
      friends: friends,
      chatImage: groupChat.img_url,
    };
  });

  return result;
}

export async function getGroupById(groupId: string) {
  const user = await getUserFromSession();
  const chat = await db.groupChat.findUnique({
    where: {
      id: groupId,
    },
    include: {
      participants: {
        include: { user: true },
      },
    },
  });
  if (!chat) {
    console.log({ error: "chat not found" });
    return;
  }
  const result: Chat[] = [
    {
      role: "GROUP",
      chatId: chat.id,
      chatName: chat.group_name,
      friends: chat.participants.map((element) => {
        return {
          friendId: element.user.id,
          friendName: element.user.name,
          friendImage: element.user.image,
        };
      }),
      chatImage: chat.img_url,
    },
  ];

  return result;
}
export async function getGroupChatConversation(chatId: string) {
  const chatMessages = await db.groupChatMessage.findMany({
    where: { group_id: chatId },
  });
  console.log(chatMessages);
  //TODO : make the the chatInfo take group id and chat id
  return chatMessages.map((chatMessage) => {
    return {
      id: chatMessage.id,
      message: chatMessage.message,
      sender_id: chatMessage.sender_id,
      create_at: chatMessage.create_at,
      media_link: chatMessage.media_link,
      chat_id: chatMessage.group_id,
    };
  });
}
