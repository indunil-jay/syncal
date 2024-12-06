import { getInjection } from "@/di/container";
import {
  SignUpInput,
  signUpSchema,
} from "@/src/interface-adapter/schema-validation/auth.schemas";

export const signUpController = async (input: SignUpInput) => {
  const { data, error: inputParseError } = signUpSchema.safeParse(input);

  if (inputParseError) {
    throw new Error("validation Error");
  }

  const authenticationService = getInjection("IAuthenticationService");
  await authenticationService.signUp(data);
};
