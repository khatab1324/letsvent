"use server";
import { v4 as uuid4 } from "uuid";
import {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "../funcrions/verificationTokenDatabase";
import { db } from "../db";
import { getUserByEmail } from "../funcrions/userDatabase";
import email from "next-auth/providers/email";
import { emit } from "process";
export async function createVerificationToken(email: string) {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //new Date(1719254413974) this will give us   Mon Jun 24 2024 21:40:13 GMT+0300 (GMT+03:00) {}
  const verificationToken = db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
}
export async function checkAndverifiedToken(token: string) {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    console.log(existingToken);
    return { error: "your token is unvalid" };
  }

  const isExpiresToken = new Date(existingToken.expires) < new Date();
  if (isExpiresToken) return { error: "your token is expired" };

  const existUser = await getUserByEmail(existingToken.email);
  if (!existUser) return { error: "email not found" };

  return { success: "email verified" };
}
