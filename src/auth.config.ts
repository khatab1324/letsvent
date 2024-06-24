import { signinSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/funcrions/userDatabase";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        //when you send info to the providers you should be sure 100% it will not return null for you
        //make some research in sign in page i add try signIn() catch error if the error type is CredentialsSignin this mean one of the field is wrong then thorw error
        const validationCredentials = signinSchema.safeParse(credentials);
        console.log("you arrive bro");
        if (validationCredentials.success) {
          const { email, password } = validationCredentials.data;
          const user = await getUserByEmail(email);
          //i should check on the user if it exist , or the authorize will send you error
          if (!user || !user.password) return null; //what is !user.password ? this happen if the user sign in from google or github
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user; //this will go to the cookie
        }
        return null;
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUP_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
