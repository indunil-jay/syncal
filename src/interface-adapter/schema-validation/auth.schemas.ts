import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name must contain only letters.",
    }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name must contain only letters.",
    }),

  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .min(1, { message: "Email is required." }),

  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter.",
    })
    .regex(/\d/, { message: "Password must include at least one number." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message:
        "Password must include at least one special character (!@#$%^&*).",
    }),
  image: z.string().optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
