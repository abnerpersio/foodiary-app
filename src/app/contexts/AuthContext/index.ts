import { AuthService } from "@/app/services/AuthService";
import { createContext } from "react";

type AuthContextValue = {
  signedIn: boolean;
  signIn: (params: AuthService.SignInParams) => Promise<void>;
  signUp: (params: AuthService.SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextValue);
