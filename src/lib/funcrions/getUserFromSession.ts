"use server";
// TODO  this file was in userDatabase file but the userDatabse file run firstly
//becuase that it show you this message Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization
// i add the function in here
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import { getUserByEmail } from "./userDatabase";

export async function getUserFromSession() {
  const session = await auth();
  console.log("session", session?.user);
  if (!session?.user.email) {
    signOut(); //this mean he in some way enter witout premition
    return;
  }
  const user = await getUserByEmail(session?.user.email);
  if (!user) {
    signOut();
    return;
  }
  return user;
}
