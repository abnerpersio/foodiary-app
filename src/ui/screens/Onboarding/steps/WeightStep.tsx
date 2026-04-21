import { Button } from "@/ui/components/Button";
import { FormGroup } from "@/ui/components/FormGroup";
import { Input } from "@/ui/components/Input";
import { formatDecimal } from "@/ui/utils/formatDecimal";
import { ArrowRightIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from "../components/Step";
import { useOnboarding } from "../context/useOnboarding";
import { OnboardingSchema } from "../schema";

export function WeightStep() {
  const { nextStep } = useOnboarding();
  const form = useFormContext<OnboardingSchema>();

  const handleNext = async () => {
    const isValid = await form.trigger("weight");
    if (isValid) nextStep();
  };

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu peso?</StepTitle>
        <StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <Controller
          control={form.control}
          name="weight"
          render={({ field, fieldState }) => (
            <FormGroup
              label="Peso"
              error={fieldState.error?.message}
              style={{ width: "100%" }}
            >
              <Input
                placeholder="80"
                keyboardType="numeric"
                formatter={formatDecimal}
                autoFocus
                value={field.value}
                onChangeText={(value) => {
                  field.onChange(value);
                  form.trigger("weight");
                }}
                onBlur={field.onBlur}
              />
            </FormGroup>
          )}
        />
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={handleNext}>
          <ArrowRightIcon />
        </Button>
      </StepFooter>
    </Step>
  );
}
