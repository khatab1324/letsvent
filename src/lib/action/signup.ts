"use server";
import { signupSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail } from "../funcrions/userDatabase";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { createVerificationToken } from "../token";
import sendVerificationEmail from "@/app/api/send";
export async function signup(data: z.infer<typeof signupSchema>) {
  console.log("data", data);

  const validatedFields = signupSchema.safeParse(data);
  if (!validatedFields.success)
    return { error: "see we have server validation ^_^" };
  const { email, password, confirmPassword } = validatedFields.data;
  const userExist = await getUserByEmail(email);
  if (userExist)
    return { error: "sorry but it seems this email is already used" };
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      id: uuid(),
      email,
      password: hashedPassword,
    },
  });
  // TODO: add the verification token inside emailVerificationFunction
  const verificationToken = await createVerificationToken(email);
  console.log(verificationToken);
  const sendEmail = sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );
  return { success: "email verification send" };
}
