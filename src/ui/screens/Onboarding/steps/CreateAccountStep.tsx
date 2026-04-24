import { useAuth } from "@/app/contexts/AuthContext/useAuth";
import { ErrorCode } from "@/app/types/ErrorCode";
import { ErrorResponse } from "@/app/types/Http";
import { Button } from "@/ui/components/Button";
import { FormGroup } from "@/ui/components/FormGroup";
import { Input } from "@/ui/components/Input";
import { theme } from "@/ui/styles/theme";
import { isAxiosError } from "axios";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Alert, TextInput, View } from "react-native";
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from "../components/Step";
import { OnboardingSchema } from "../schema";

export function CreateAccountStep() {
  const form = useFormContext<OnboardingSchema>();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const { signUp } = useAuth();

  const handleSubmit = form.handleSubmit(async (formValues) => {
    const isValid = await form.trigger("account");
    if (!isValid) return;

    const [birthDate] = formValues.birthDate.toISOString().split("T");

    try {
      await signUp({
        account: {
          email: formValues.account.email,
          password: formValues.account.password,
        },
        profile: {
          name: formValues.account.name,
          activityLevel: formValues.activityLevel,
          birthDate,
          gender: formValues.gender,
          goal: formValues.goal,
          height: Number(formValues.height),
          weight: Number(formValues.weight),
        },
      });
    } catch (error) {
      const isAlreadyInUse =
        isAxiosError<ErrorResponse>(error) &&
        error.response?.data?.error?.code === ErrorCode.EMAIL_ALREADY_IN_USE;

      if (isAlreadyInUse) {
        Alert.alert(
          "Oops!",
          "Este e-mail já está sendo usado por outro usuário.",
        );
        return;
      }

      Alert.alert("Oops!", "Dados inválidos");
    }
  });

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Para poder visualizar seu progresso</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 16, backgroundColor: theme.colors.white }}>
          <Controller
            control={form.control}
            name="account.name"
            render={({ field, fieldState }) => (
              <FormGroup label="Nome" error={fieldState.error?.message}>
                <Input
                  placeholder="João Silva"
                  autoComplete="name"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  autoFocus
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.email"
            render={({ field, fieldState }) => (
              <FormGroup label="E-mail" error={fieldState.error?.message}>
                <Input
                  ref={emailInputRef}
                  keyboardType="email-address"
                  placeholder="joaosilva@gmail.com"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.password"
            render={({ field, fieldState }) => (
              <FormGroup label="Senha" error={fieldState.error?.message}>
                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  placeholder="Mínimo 8 caracteres"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current?.focus()
                  }
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.confirmPassword"
            render={({ field, fieldState }) => (
              <FormGroup
                label="Confirmar Senha"
                error={fieldState.error?.message}
              >
                <Input
                  ref={confirmPasswordInputRef}
                  secureTextEntry
                  placeholder="Mínimo 8 caracteres"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button
          style={{ width: "100%" }}
          onPress={handleSubmit}
          isLoading={form.formState.isSubmitting}
        >
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  );
}
