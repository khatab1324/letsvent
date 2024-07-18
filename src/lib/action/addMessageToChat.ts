import { db } from "../db";
//TODO: note i split these file because it cause to probelm plz fix it
export async function addMessageToChat(
  message: string,
  sender_id: string,
  chat_id: string
) {
  try {
    console.log("arraive to here");

    const addmessaeg = await db.chatMessage.create({
      data: { message, sender_id, chat_id },
    });
    return addmessaeg;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
