import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
});
