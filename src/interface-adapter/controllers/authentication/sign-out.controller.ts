import { getInjection } from "@/di/container";

export const signOutController = async () => {
  const authenticationService = getInjection("IAuthenticationService");
  await authenticationService.signout();
};
