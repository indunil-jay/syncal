import { users } from "@/drizzle/schemas";
import { InferSelectModel } from "drizzle-orm";

export type UsersCollection = InferSelectModel<typeof users>;
