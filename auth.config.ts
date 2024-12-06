import bcryptjs from "bcryptjs";
// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./src/interface-adapter/schema-validation/auth.schemas";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { users } from "./drizzle/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!existingUser || !existingUser.password) return null;

        const isMatchPassword = await bcryptjs.compare(
          password,
          existingUser.password
        );
        return isMatchPassword ? existingUser : null;
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
