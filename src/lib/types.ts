export type Chat =
  | {
      chatId: string;
      friendId: string | undefined;
      friendName: string | null | undefined;
      messageInfo?: messageInfo;
    }
  | undefined;

export type messageInfo = {
  id: string;
  message: string;
  sender_id: string;
  create_at: Date;
  media_link: string | null;
  chat_id: string;
}[];
