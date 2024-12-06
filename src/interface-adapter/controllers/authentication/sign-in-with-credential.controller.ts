import { getInjection } from "@/di/container";
import {
  SignInInput,
  signInSchema,
} from "@/src/interface-adapter/schema-validation/auth.schemas";

export const signInWithCredentialController = async (input: SignInInput) => {
  const { error, data } = signInSchema.safeParse(input);

  if (error) {
    throw new Error("Input parse error");
  }
  const authenticationService = getInjection("IAuthenticationService");
  await authenticationService.signInWithCredentials(data);
};
