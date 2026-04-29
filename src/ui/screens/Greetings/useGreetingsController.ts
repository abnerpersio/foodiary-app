import { Env } from "@/app/config/env";
import { useAuth } from "@/app/contexts/AuthContext/useAuth";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo } from "react";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export function useGreetingsController() {
  const { signInWithGoogle, isGoogleLoading, isGoogleLastUsed } = useAuth();

  const redirectUri = useMemo(
    () =>
      AuthSession.makeRedirectUri({
        preferLocalhost: true,
        path: "/auth/callback",
      }),
    [],
  );

  const discovery = useMemo(
    () => ({
      authorizationEndpoint: `https://${Env.cognitoDomain}/oauth2/authorize`,
    }),
    [],
  );

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Env.cognitoClientId,
      scopes: ["openid", "email", "profile"],
      redirectUri,
      extraParams: { identity_provider: "Google" },
    },
    discovery,
  );

  const error = response?.type === "error" ? response.error : null;

  useEffect(() => {
    if (response?.type === "error") {
      console.log(response.error);
      Alert.alert("Erro", "Não foi possível entrar com Google.");
    }
  }, [error?.message]);

  useEffect(() => {
    async function setupAuth() {
      if (response?.type !== "success") return;

      try {
        await signInWithGoogle({ code: response.params.code, redirectUri });
      } catch {
        Alert.alert("Erro", "Não foi possível entrar com Google.");
      }
    }

    setupAuth();
  }, [response?.type, signInWithGoogle]);

  return {
    googleAuthReady: !!request,
    isGoogleLoading,
    isGoogleLastUsed,
    promptGoogleAuth: promptAsync,
  };
}
