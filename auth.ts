import NextAuth, { type DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle";
import authConfig from "./auth.config";
import { eq } from "drizzle-orm";
import { users } from "./drizzle/schemas";
import { UsersCollection } from "./src/domain/entities/user.entity";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      firstName: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,

  callbacks: {
    //cab be use for add checking boundary before sign-in
    // async signIn({ user }) {
    //   let existingUser: UsersCollection | undefined;

    //   if (!user || !user.id) return false;

    //   try {
    //     existingUser = await db.query.users.findFirst({
    //       where: eq(users.id, user.id),
    //     });
    //   } catch (error) {
    //     console.log("session:", error);
    //   }

    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },

    async jwt({ token }) {
      // //get user by jwt session token.sub
      // const existingUser = await db.query.users.findFirst({
      //   where: eq(users.id, token.sub),
      // });

      // if (!existingUser) return token;

      // //add more into token
      // token.firstName = existingUser.firstName;

      return token;
    },

    async session({ token, session }) {
      //extend the session adding user id
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.sub) {
        //get user by jwt session token.sub
        let existingUser: UsersCollection | undefined;

        try {
          existingUser = await db.query.users.findFirst({
            where: eq(users.id, token.sub),
          });
        } catch (error) {
          console.log("session:", error);
        }

        if (!existingUser) return session;

        session.user.firstName = existingUser.firstName;
      }

      return session;
    },
  },
});
