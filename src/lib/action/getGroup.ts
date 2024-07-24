"use server";
import { signOut } from "next-auth/react";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";

export async function getGroupFromDatabase() {
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
      participants: true,
    },
  });

  console.log("groupChats:+=================", groupChats);

  return groupChats;
}
