import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import "server-only";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  // Repositories
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  // Repositories
}
