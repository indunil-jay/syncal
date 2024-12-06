import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  name: varchar("name", { length: 100 }),
  email: text("email").unique().notNull(),
  password: varchar("password", { length: 96 }),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});
