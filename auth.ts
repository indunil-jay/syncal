import NextAuth from "next-auth";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: DrizzleAdapter(db),
  providers: [],
});
