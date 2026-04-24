import { useForceRender } from "@/app/hooks/app/useForceRender";
import { useAccount } from "@/app/hooks/useAccount";
import { AuthTokensManager } from "@/app/lib/AuthTokensManager";
import { AuthService } from "@/app/services/AuthService";
import { HttpService } from "@/app/services/HttpService";
import { useQueryClient } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useLayoutEffect, useState } from "react";
import { AuthContext } from ".";

SplashScreen.preventAutoHideAsync();

type SetupAuthParams = {
  accessToken: string;
  refreshToken: string;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const { account, loadAccount } = useAccount({ enabled: false });
  const queryClient = useQueryClient();

  const forceRender = useForceRender();

  const setupAuth = useCallback(async (tokens: SetupAuthParams) => {
    HttpService.setAccessToken(tokens.accessToken);

    await loadAccount();

    await SplashScreen.hideAsync();
    setIsReady(true);
  }, []);

  const signIn = useCallback(async (params: AuthService.SignInParams) => {
    const tokens = await AuthService.signIn(params);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signUp = useCallback(async (params: AuthService.SignUpParams) => {
    const tokens = await AuthService.signUp(params);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signOut = useCallback(async () => {
    HttpService.removeAccessToken();

    queryClient.clear();
    forceRender();

    await AuthTokensManager.clear();
  }, [queryClient]);

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        await SplashScreen.hideAsync();
        return;
      }

      setupAuth(tokens);
    }

    load();
  }, [loadAccount]);

  if (!isReady) {
    return;
  }

  return (
    <AuthContext.Provider
      value={{ signedIn: !!account, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
