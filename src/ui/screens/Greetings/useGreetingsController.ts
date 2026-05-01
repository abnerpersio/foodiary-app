import { Env } from "@/app/config/env";
import { useAuth } from "@/app/contexts/AuthContext/useAuth";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo } from "react";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export function useGreetingsController() {
  const {
    signInWithGoogle,
    googleRedirectUri,
    isGoogleLoading,
    isGoogleLastUsed,
  } = useAuth();

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
      redirectUri: googleRedirectUri,
      extraParams: { identity_provider: "Google" },
      prompt: AuthSession.Prompt.SelectAccount,
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    },
    discovery,
  );

  const error = response?.type === "error" ? response.error : null;
  const code = response?.type === "success" ? response.params.code : null;

  useEffect(() => {
    if (response?.type === "error") {
      console.error(error);
      Alert.alert("Erro", "Não foi possível entrar com Google.");
    }
  }, [error?.message]);

  useEffect(() => {
    async function setupAuth() {
      if (response?.type !== "success") return;

      try {
        await signInWithGoogle({
          code: code!,
          redirectUri: googleRedirectUri,
          codeVerifier: request!.codeVerifier!,
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Não foi possível entrar com Google.");
      }
    }

    setupAuth();
  }, [response?.type, code, googleRedirectUri, signInWithGoogle]);

  return {
    googleAuthReady: !!request,
    isGoogleLoading,
    isGoogleLastUsed,
    promptGoogleAuth: promptAsync,
  };
}
