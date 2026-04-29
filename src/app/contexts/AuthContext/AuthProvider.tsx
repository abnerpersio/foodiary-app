import { useForceRender } from "@/app/hooks/app/useForceRender";
import { useAccount } from "@/app/hooks/queries/useAccount";
import { AuthTokensManager } from "@/app/lib/AuthTokensManager";
import { AuthService } from "@/app/services/AuthService";
import { HttpService } from "@/app/services/HttpService";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const { account, loadAccount } = useAccount({ enabled: false });
  const queryClient = useQueryClient();

  const forceRender = useForceRender();

  const signOut = useCallback(async () => {
    HttpService.removeAccessToken();
    HttpService.removeRefreshTokenHandler();

    setIsAuthenticated(false);
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

          const newTokens = await AuthService.refreshToken({
            refreshToken: stored.refreshToken,
          });
          HttpService.setAccessToken(newTokens.accessToken);

          await AuthTokensManager.save(newTokens);
        } catch (error) {
          signOut();
          throw error;
        }
      });

      const result = await loadAccount();
      setIsAuthenticated(true);

      if (result.isError) {
        const isProfileMissing =
          isAxiosError(result.error) && result.error.response?.status === 404;

        if (!isProfileMissing) {
          await signOut();
        }
      }

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

  const signInWithGoogle = useCallback(
    async (code: string, redirectUri: string) => {
      const tokens = await AuthService.signInWithCode({ code, redirectUri });
      await AuthTokensManager.save(tokens);
      await setupAuth(tokens);
    },
    [setupAuth],
  );

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        await SplashScreen.hideAsync();
        return;
      }

      await setupAuth(tokens);
    }

    load();
  }, [loadAccount]);

  if (!isReady) {
    return;
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn: isAuthenticated,
        signedUp,
        needsProfileSetup: isAuthenticated && !account,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
