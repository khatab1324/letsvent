export type Chat =
  | {
      chatId: string;
      friendId: string | undefined;
      friendName: string | null | undefined;
      messageInfo?: messageInfo;
      groupChats?: groupChats;
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
export type userInfoFromSession = {
  id: string;
  emailVerified: Date | null;
  image: string | null;
  name: string | null;
  email: string;
  password: string | null;
  phone: string | null;
  created_at: Date;
};

export type groupChats = ({
  participants: {
    id: string;
    user_id: string;
    joined_at: Date;
    group_id: string;
  }[];
} & {
  id: string;
  group_name: string;
  img_url: string | null;
  creator_id: string;
  create_at: Date;
})[];

