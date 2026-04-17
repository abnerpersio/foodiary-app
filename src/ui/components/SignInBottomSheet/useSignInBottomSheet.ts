import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SignInBottomSheetRef } from "./types";

export function useSignInBottomSheet(ref: React.Ref<SignInBottomSheetRef>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const passwordInputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    [],
  );

  const handleSubmit = () => {};

  return {
    bottomSheetModalRef,
    passwordInputRef,
    bottom,
    handleSubmit,
  };
}
