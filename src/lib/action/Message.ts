import { db } from "../db";
//TODO: note i split these file because it cause to probelm plz fix it
export async function addMessageToChat(
  message: string,
  sender_id: string,
  chat_id: string,
  media_link?: string
) {
  try {
    console.log("arraive to hereeeee");
    const addmessaeg = await db.chatMessage.create({
      data: { message, sender_id, chat_id, media_link },
    });
    console.log("====================================");
    console.log("adddddddddddddd message", addmessaeg);
    console.log("====================================");
    return addmessaeg;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
export async function addMessageToGroup(
  message: string,
  sender_id: string,
  group_chat_id: string,
  media_link?: string
) {
  try {
    console.log("arraive to here");

    const addmessage = await db.groupChatMessage.create({
      data: { message, sender_id, group_id: group_chat_id, media_link },
    });
    return addmessage;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function deleteGroupMessageFromDatabase(messageId: string) {
  const deleteMessage = await db.groupChatMessage.delete({
    where: { id: messageId },
  });
  return deleteMessage;
}
export async function deleteChatMessageFromDatabase(messageId: string) {
  const deleteMessage = await db.chatMessage.delete({
    where: { id: messageId },
  });
  return deleteMessage;
}
