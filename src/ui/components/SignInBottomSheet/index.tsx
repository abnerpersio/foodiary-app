import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { FormGroup } from "../FormGroup";
import { Input } from "../Input";
import { styles } from "./styles";
import { SignInBottomSheetRef } from "./types";
import { useSignInBottomSheet } from "./useSignInBottomSheet";

type SignInBottomSheetProps = {
  ref: React.Ref<SignInBottomSheetRef>;
};

export function SignInBottomSheet({ ref }: SignInBottomSheetProps) {
  const { bottom, bottomSheetModalRef, passwordInputRef, handleSubmit } =
    useSignInBottomSheet(ref);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView
          style={[styles.container, { paddingBottom: Math.max(bottom, 24) }]}
        >
          <AppText size="3xl" weight="semiBold" style={styles.heading}>
            Acesse a sua conta
          </AppText>

          <View style={styles.form}>
            <FormGroup label="E-mail">
              <Input
                InputComponent={BottomSheetTextInput}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </FormGroup>

            <FormGroup label="Senha">
              <Input
                ref={passwordInputRef}
                InputComponent={BottomSheetTextInput}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </FormGroup>

            <Button
            // onPress={handleSubmit}
            // isLoading={form.formState.isSubmitting}
            // disabled={isLoading}
            >
              Entrar
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
