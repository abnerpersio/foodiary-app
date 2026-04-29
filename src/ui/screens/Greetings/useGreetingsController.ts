import { Env } from "@/app/config/env";
import { useAuth } from "@/app/contexts/AuthContext/useAuth";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export function useGreetingsController() {
  const { signInWithGoogle } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  useEffect(() => {
    if (response?.type !== "success") return;

    setIsGoogleLoading(true);
    signInWithGoogle(response.params.code, redirectUri)
      .catch(() => Alert.alert("Erro", "Não foi possível entrar com Google."))
      .finally(() => setIsGoogleLoading(false));
  }, [response]);

  return {
    googleAuthReady: !!request,
    isGoogleLoading,
    promptGoogleAuth: promptAsync,
  };
}
