import {
  SignInInput,
  SignUpInput,
} from "@/src/interface-adapter/schema-validation/auth.schemas";

export interface IAuthenticationService {
  signInWithCredentials(data: SignInInput): Promise<void>;
  signUp(data: SignUpInput): Promise<void>;
  signout(): Promise<void>;
}
