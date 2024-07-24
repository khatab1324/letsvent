"use server";
import { signOut } from "@/auth";
import { db } from "../db";
import { getUserFromSession } from "../funcrions/getUserFromSession";

export async function createGroup(
  freindSelectedList: string[],
  groupName: string
) {
  const currentUser = await getUserFromSession();
  if (!currentUser) {
    signOut();
    return;
  }
  //TODO: add the current user in the front end and then pass it to create group
  freindSelectedList.push(currentUser.id);
  try {
    const createGroupInTheDatabase = await db.groupChat.create({
      data: {
        group_name: groupName,
        creator_id: currentUser.id,
      },
    });

    //this will loop to all id and see if they in the database and then it will add them
    freindSelectedList.map(async (friendId) => {
      console.log(friendId);
      const userExists = await db.user.findUnique({
        where: { id: friendId },
      });

      if (!userExists) {
        console.log(`User with id ${friendId} does not exist`);
        // Skip this friendId and move to the next one
      } else {
        const createGroupParticipant = await db.groupParticipant.create({
          data: { user_id: friendId, group_id: createGroupInTheDatabase.id },
        });
      }
    });
    console.log("createGroupInTheDatabase :", createGroupInTheDatabase);

    return { success: "group added" };
  } catch (error) { 
    console.log(error);
    return { error: "feild to create chat" };
  }
}
