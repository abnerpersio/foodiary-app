import { ActivityLevel } from "@/app/types/ActivityLevel";
import { Button } from "@/ui/components/Button";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupItemInfo,
  RadioGroupLabel,
} from "@/ui/components/RadioGroup";
import { ArrowRightIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepTitle,
} from "../components/Step";
import { useOnboardingContext } from "../context/useOnboardingContext";
import { OnboardingSchema } from "../schema";

export function ActivityLevelStep() {
  const { nextStep } = useOnboardingContext();
  const form = useFormContext<OnboardingSchema>();

  const handleNext = async () => {
    const isValid = await form.trigger("activityLevel");
    if (isValid) nextStep();
  };

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual seu nível de atividade?</StepTitle>
      </StepHeader>

      <StepContent>
        <Controller
          control={form.control}
          name="activityLevel"
          render={({ field, fieldState }) => (
            <RadioGroup
              value={field.value ?? null}
              onChangeValue={(value) => {
                field.onChange(value);
                form.trigger("activityLevel");
              }}
              error={!!fieldState.error?.message}
            >
              <RadioGroupItem value={ActivityLevel.SEDENTARY}>
                <RadioGroupIcon>🪑</RadioGroupIcon>
                <RadioGroupItemInfo>
                  <RadioGroupLabel>Sedentário</RadioGroupLabel>
                  <RadioGroupDescription>Não me exercito</RadioGroupDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>

              <RadioGroupItem value={ActivityLevel.LIGHT}>
                <RadioGroupIcon>🍃</RadioGroupIcon>
                <RadioGroupItemInfo>
                  <RadioGroupLabel>Leve</RadioGroupLabel>
                  <RadioGroupDescription>
                    1 a 2 vezes por semana
                  </RadioGroupDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>

              <RadioGroupItem value={ActivityLevel.MODERATE}>
                <RadioGroupIcon>⚡️</RadioGroupIcon>
                <RadioGroupItemInfo>
                  <RadioGroupLabel>Moderado</RadioGroupLabel>
                  <RadioGroupDescription>
                    3 a 5 vezes por semana
                  </RadioGroupDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>

              <RadioGroupItem value={ActivityLevel.HEAVY}>
                <RadioGroupIcon>🔥</RadioGroupIcon>
                <RadioGroupItemInfo>
                  <RadioGroupLabel>Pesado</RadioGroupLabel>
                  <RadioGroupDescription>
                    6 a 7 vezes por semana
                  </RadioGroupDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>

              <RadioGroupItem value={ActivityLevel.ATHLETE}>
                <RadioGroupIcon>🏋️‍♂️</RadioGroupIcon>
                <RadioGroupItemInfo>
                  <RadioGroupLabel>Atleta</RadioGroupLabel>
                  <RadioGroupDescription>
                    2 vezes por semana
                  </RadioGroupDescription>
                </RadioGroupItemInfo>
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
