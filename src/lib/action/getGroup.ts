"use server";
import { signOut } from "next-auth/react";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";

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
      chatId: groupChat.id,
      chatName: groupChat.group_name,
      friends: friends,
      chatImage: groupChat.img_url,
    };
  });

  return result;
}
