"use server";
import { signIn } from "@/auth";
import { signinSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "../funcrions/userDatabase";
import { defaultSigninRedirect } from "../routes";
import { createVerificationToken } from "../token";
import sendVerificationEmail from "@/app/api/send";
export async function signin(data: z.infer<typeof signinSchema>) {
  const validatedFields = signinSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid field" };
  }
  const { email, password } = validatedFields.data;
  const userExist = await getUserByEmail(email);
  console.log(userExist);

  if (!userExist || !userExist.email) {
    return { error: "email doesn't exist" };
  }
  if (!userExist.password) {
    return { error: "maybe you register by google or github" };
  }
  //i can use validate password here but i validate it in the signin Crential just for training
  if (!userExist.emailVerified) {
    const verificationToken = await createVerificationToken(userExist.email);
    sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "we send the verification again to your email" };
  } 
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultSigninRedirect,
    });
    return { success: "email verification send" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "email or password is wrong" };
        default:
          return { error: "somthing went wrong " };
      }
    }
    throw error;
  }
}
