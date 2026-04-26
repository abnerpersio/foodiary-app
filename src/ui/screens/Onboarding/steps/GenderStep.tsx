import { Gender } from "@/app/types/Gender";
import { Button } from "@/ui/components/Button";
import {
  RadioGroup,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupLabel,
} from "@/ui/components/RadioGroup";
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
import { useOnboardingContext } from "../context/useOnboardingContext";
import { OnboardingSchema } from "../schema";

export function GenderStep() {
  const { nextStep } = useOnboardingContext();
  const form = useFormContext<OnboardingSchema>();

  const handleNext = async () => {
    const isValid = await form.trigger("gender");
    if (isValid) nextStep();
  };

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu gênero</StepTitle>
        <StepSubtitle>Seu gênero influencia no tipo da dieta</StepSubtitle>
      </StepHeader>

      <StepContent>
        <Controller
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <RadioGroup
              value={field.value ?? null}
              onChangeValue={(value) => {
                field.onChange(value);
                form.trigger("gender");
              }}
              orientation="horizontal"
              error={!!fieldState.error?.message}
            >
              <RadioGroupItem value={Gender.MALE}>
                <RadioGroupIcon>🧔</RadioGroupIcon>
                <RadioGroupLabel>Masculino</RadioGroupLabel>
              </RadioGroupItem>

              <RadioGroupItem value={Gender.FEMALE}>
                <RadioGroupIcon>‍👩‍🦰</RadioGroupIcon>
                <RadioGroupLabel>Feminino</RadioGroupLabel>
              </RadioGroupItem>
            </RadioGroup>
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
