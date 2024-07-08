"use server";
import { auth } from "../../../auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  console.log("session", session.user.email);
  return session.user.email;
}
