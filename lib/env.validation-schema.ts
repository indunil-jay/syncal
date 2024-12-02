import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const envSchema = z.object({
  SUPABASE_DATABASE_PASSWORD: z.string().min(1),
  SUPABASE_DATABASE_URL: z.string().min(1),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
});

export type EnvSchema = z.infer<typeof envSchema>;

expand(config());

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default envSchema.parse(process.env);
