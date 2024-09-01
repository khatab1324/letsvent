import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./lib/funcrions/userDatabase";
declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      isOAuth: boolean;
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
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      const existingUser = await getUserById(token.sub as string);
      if (!existingUser) return token;
      token.useOAuth = !!existingUser;
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  trustHost: true,
});
