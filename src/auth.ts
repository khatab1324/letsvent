import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./lib/funcrions/userDatabase";
declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: { signIn: "/signin", error: "/auth/error" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user.id ?? "");
        //here i prevent the signin without emial verification
        if (!existingUser?.emailVerified) return false;
      }
      return true;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
