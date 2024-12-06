import { DEFAULT_LOGIN_REDIRECT } from "./../../../routes";
import { injectable } from "inversify";
import bcryptjs from "bcryptjs";
import { db } from "@/drizzle";
import { eq } from "drizzle-orm";

import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import {
  SignInInput,
  SignUpInput,
} from "@/src/interface-adapter/schema-validation/auth.schemas";
import { users } from "@/drizzle/schemas";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async signInWithCredentials(data: SignInInput): Promise<void> {
    //check user
    let existingUser;
    try {
      existingUser = await db.query.users.findFirst({
        where: eq(users.email, data.email),
      });
    } catch (error) {
      console.error("Error getting user:", error);
    }

    //if there is no user not a registerd user,
    //if there is a user with email without password,it is not credentially registered user.
    if (!existingUser || !existingUser.password) {
      throw new Error("Invalid credentials.");
    }
    //check password match
    const isMatchPassword = await bcryptjs.compare(
      data.password,
      existingUser.password
    );

    if (!isMatchPassword) {
      throw new Error("Invalid credentials.");
    }

    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        // callbackUrl: DEFAULT_LOGIN_REDIRECT,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.error("Error sign in user:", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw new Error("Invalid credentials!");
          default:
            throw new Error("Something went wrong!");
        }
      }
      throw error;
    }
  }

  public async signUp(data: SignUpInput): Promise<void> {
    //check user
    let existingUser;
    try {
      existingUser = await db.query.users.findFirst({
        where: eq(users.email, data.email),
      });
    } catch (error) {
      console.error("Error getting user:", error);
    }

    if (existingUser) {
      throw new Error("Invalid Credentilas");
    }
    //hash the password
    const hashedPassword = await bcryptjs.hash(data.password, 12);

    //insert doc
    try {
      await db.insert(users).values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        image: data.image,
      });
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  }
  public async signout(): Promise<void> {
    try {
      await signOut();
    } catch (error) {
      console.log("signout error", error);
    }
  }
}
