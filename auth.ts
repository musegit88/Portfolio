import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import { prisma } from "./lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });
        if (!admin || !admin.password) {
          throw new Error("Invalid credentials");
        }

        // password verification
        const passwordCheck = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        if (!passwordCheck) {
          throw new Error("Invalid credentials");
        }
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      // When update() is called client-side, merge the new values into the token
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string ?? "";
        session.user.name = token.name as string ?? session.user.name;
        session.user.email = token.email as string ?? session.user.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
