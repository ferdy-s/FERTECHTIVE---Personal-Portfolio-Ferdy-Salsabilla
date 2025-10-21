// lib/auth.ts (NextAuth v4)
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        try {
          const email = String(creds?.email ?? "")
            .trim()
            .toLowerCase();
          const password = String(creds?.password ?? "");

          if (!email || !password) return null;

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return null;

          const ok = await compare(password, user.password);
          if (!ok) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (e) {
          // sementara: log ke server untuk debug
          console.error("Authorize error:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role;
        session.user.email = session.user.email?.toLowerCase() ?? null;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
