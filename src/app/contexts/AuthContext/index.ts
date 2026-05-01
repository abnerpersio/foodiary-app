import { AuthService } from "@/app/services/AuthService";
import { createContext } from "react";

type AuthContextValue = {
  signedIn: boolean;
  signedUp: boolean;
  isGoogleLoading: boolean;
  isGoogleLastUsed: boolean;
  googleRedirectUri: string;
  needsProfileSetup: boolean;
  signIn: (params: AuthService.SignInParams) => Promise<void>;
  signUp: (params: AuthService.SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: (params: {
    code: string;
    redirectUri: string;
    codeVerifier: string;
  }) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextValue);
