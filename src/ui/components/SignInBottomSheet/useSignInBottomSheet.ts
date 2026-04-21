import { AuthService } from "@/app/services/AuthService";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { Alert, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signInSchema } from "./schema";
import { SignInBottomSheetRef } from "./types";

export function useSignInBottomSheet(ref: React.Ref<SignInBottomSheetRef>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    [],
  );

  const handleSubmit = form.handleSubmit(async (formValues) => {
    try {
      const { accessToken, refreshToken } = await new AuthService().signIn(
        formValues,
      );
    } catch {
      Alert.alert("Oops!", "As credenciais informadas são inválidas");
    }
  });

  return {
    bottomSheetModalRef,
    passwordInputRef,
    bottom,
    handleSubmit,
    form,
  };
}
