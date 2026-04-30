import { useAccount } from "@/app/hooks/queries/useAccount";
import { ProfileService } from "@/app/services/ProfileService";
import { Button } from "@/ui/components/Button";
import { FormGroup } from "@/ui/components/FormGroup";
import { Input } from "@/ui/components/Input";
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from "@/ui/components/Step";
import { formatDateToAPI } from "@/ui/utils/date";
import { isAxiosError } from "axios";
import { Controller, useFormContext } from "react-hook-form";
import { Alert } from "react-native";
import { CompleteProfileSchema } from "../schema";

export function NameStep() {
  const form = useFormContext<CompleteProfileSchema>();
  const { handleRefresh } = useAccount();

  const handleSubmit = form.handleSubmit(async (values) => {
    const isValid = await form.trigger("name");
    if (!isValid) return;

    try {
      await ProfileService.createProfile({
        name: values.name,
        birthDate: formatDateToAPI(values.birthDate),
        height: Number(values.height),
        weight: Number(values.weight),
        gender: values.gender,
        activityLevel: values.activityLevel,
        goal: values.goal,
      });

      handleRefresh();
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert(
          "Oops!",
          "Não foi possível salvar seu perfil. Tente novamente.",
        );
        return;
      }

      Alert.alert("Oops!", "Ocorreu um erro inesperado.");
    }
  });

  return (
    <Step>
      <StepHeader>
        <StepTitle>Como você se chama?</StepTitle>
        <StepSubtitle>
          Informe seu nome para personalizar sua experiência
        </StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Nome"
              error={fieldState.error?.message}
              style={{ width: "100%" }}
            >
              <Input
                placeholder="João Silva"
                autoComplete="name"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                autoFocus
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                disabled={form.formState.isSubmitting}
              />
            </FormGroup>
          )}
        />
      </StepContent>

      <StepFooter align="start">
        <Button
          style={{ width: "100%" }}
          onPress={handleSubmit}
          isLoading={form.formState.isSubmitting}
        >
          Salvar perfil
        </Button>
      </StepFooter>
    </Step>
  );
}
