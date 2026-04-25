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
  const [signedUp, setSignedUp] = useState(false);

  const { account, loadAccount } = useAccount({ enabled: false });
  const queryClient = useQueryClient();

  const forceRender = useForceRender();

  const signOut = useCallback(async () => {
    HttpService.removeAccessToken();
    HttpService.removeRefreshTokenHandler();

    queryClient.clear();
    forceRender();

    await AuthTokensManager.clear();
  }, [queryClient]);

  const setupAuth = useCallback(
    async ({ accessToken }: SetupAuthParams) => {
      HttpService.setAccessToken(accessToken);
      HttpService.setRefreshTokenHandler(async () => {
        try {
          const stored = await AuthTokensManager.load();
          if (!stored) throw new Error("Tokens not found");

          const newTokens = await AuthService.refreshToken(stored);
          HttpService.setAccessToken(newTokens.accessToken);
          await AuthTokensManager.save(newTokens);
        } catch (error) {
          signOut();
          throw error;
        }
      });

      await loadAccount();

      await SplashScreen.hideAsync();
      setIsReady(true);
    },
    [signOut],
  );

  const signIn = useCallback(async (params: AuthService.SignInParams) => {
    const tokens = await AuthService.signIn(params);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signUp = useCallback(async (params: AuthService.SignUpParams) => {
    const tokens = await AuthService.signUp(params);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
    setSignedUp(true);
  }, []);

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
      value={{
        signedIn: !!account,
        signedUp,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
