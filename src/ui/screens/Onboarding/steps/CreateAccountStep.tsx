import { Button } from "@/ui/components/Button";
import { FormGroup } from "@/ui/components/FormGroup";
import { Input } from "@/ui/components/Input";
import { theme } from "@/ui/styles/theme";
import { useRef } from "react";
import { TextInput, View } from "react-native";
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from "../components/Step";
import { useOnboarding } from "../context/useOnboarding";

export function CreateAccountStep() {
  const { nextStep } = useOnboarding();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {};

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Para poder visualizar seu progresso</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View
          style={{
            gap: 16,
            backgroundColor: theme.colors.white,
          }}
        >
          <FormGroup label="Nome">
            <Input
              placeholder="João Silva"
              autoComplete="name"
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              autoFocus
            />
          </FormGroup>

          <FormGroup label="E-mail">
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              placeholder="joaosilva@gmail.com"
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
              secureTextEntry
              placeholder="Mínimo 8 caracteres"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Confirmar Senha">
            <Input
              ref={confirmPasswordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </FormGroup>
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button style={{ width: "100%" }} onPress={nextStep}>
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  );
}
