"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRegistration } from "../hooks/use-registration";

export const registrationFormSchema = z
  .object({
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

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

type PasswordStrength = {
  length: boolean;
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
  noSpace: boolean;
};

const passwordRequirements = [
  {
    key: "length" as keyof PasswordStrength,
    message: "Be at least 8 characters long and less than 20 characters",
  },
  {
    key: "upperCase" as keyof PasswordStrength,
    message: "Include at least one uppercase letter (A-Z)",
  },
  {
    key: "lowerCase" as keyof PasswordStrength,
    message: "Include at least one lowercase letter (a-z)",
  },
  {
    key: "number" as keyof PasswordStrength,
    message: "Include at least one number (0-9)",
  },
  {
    key: "specialChar" as keyof PasswordStrength,
    message: "Include at least one special character (!@#$%^&*)",
  },
  {
    key: "noSpace" as keyof PasswordStrength,
    message: "Contain no spaces",
  },
];

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Track the password validation status
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
    noSpace: false,
  });
  // Track focus state
  const [isFocused, setIsFocused] = useState(false);

  //Track password visiblity
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate, isPending } = useRegistration();

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPasswordStrength({
      length: value.length >= 8 && value.length <= 20,
      upperCase: /[A-Z]/.test(value),
      lowerCase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      noSpace: !/\s/.test(value),
    });
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = (values: z.infer<typeof registrationFormSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="alexdoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="• • • • • • • •"
                  {...field}
                  type={isPasswordVisible ? "text" : "password"}
                  onChange={(e) => {
                    field.onChange(e);
                    onPasswordChange(e);
                  }}
                  onFocus={() => setIsFocused(true)} // Set focused state
                  onBlur={() => setIsFocused(false)} // Reset focused state
                />
              </FormControl>
              <FormDescription>
                Your password must:
                <ul className="list-disc pl-5 mt-2">
                  {passwordRequirements.map(({ key, message }) => (
                    <li
                      key={key}
                      className={`${
                        isFocused
                          ? passwordStrength[key]
                            ? "text-green-500"
                            : "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {message}
                    </li>
                  ))}
                </ul>
              </FormDescription>
              <FormMessage />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="mt-2 text-sm text-blue-500"
              >
                {isPasswordVisible ? "Hide" : "Show"} Password
              </button>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="• • • • • • • •"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full " type="submit" disabled={isPending}>
          {isPending ? "Creating an account" : "Create an account"}
        </Button>
      </form>
    </Form>
  );
};
