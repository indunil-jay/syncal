"use server";

import { z } from "zod";
import { loginFormSchema } from "../_features/auth/components/sign-in-form";
import { registrationFormSchema } from "../_features/auth/components/sign-up-form";
import { signUpController } from "@/src/interface-adapter/controllers/authentication/sign-up.controller";
import { signInWithCredentialController } from "@/src/interface-adapter/controllers/authentication/sign-in-with-credential.controller";
import { redirect } from "next/navigation";
import { signOutController } from "@/src/interface-adapter/controllers/authentication/sign-out.controller";

export const signin = async (values: z.infer<typeof loginFormSchema>) => {
  try {
    await signInWithCredentialController(values);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (
  values: z.infer<typeof registrationFormSchema>
) => {
  try {
    await signUpController(values);
  } catch (error) {
    throw error;
  }
  redirect("/sign-in");
};

export const signOut = async () => {
  try {
    await signOutController();
  } catch (error) {
    throw error;
  }
  redirect("/sign-in");
};
