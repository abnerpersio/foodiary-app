import { OnboardingHeader } from "@/ui/components/OnboardingHeader";
import { theme } from "@/ui/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { CompleteProfileStack } from "./CompleteProfileStack";
import { CompleteProfileProvider } from "./context/CompleteProfileProvider";
import { useCompleteProfileContext } from "./context/useCompleteProfileContext";
import { completeProfileSchema, CompleteProfileSchema } from "./schema";
import { TOTAL_STEPS } from "./steps";

export function CompleteProfile() {
  const form = useForm<CompleteProfileSchema>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      birthDate: new Date(),
      height: "",
      weight: "",
      name: "",
    },
  });

  return (
    <CompleteProfileProvider>
      <FormProvider {...form}>
        <Header />

        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.colors.white }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={16}
        >
          <CompleteProfileStack />
        </KeyboardAvoidingView>
      </FormProvider>
    </CompleteProfileProvider>
  );
}

function Header() {
  const { currentStepIndex, previousStep } = useCompleteProfileContext();

  return (
    <OnboardingHeader
      currentStepIndex={currentStepIndex}
      totalSteps={TOTAL_STEPS}
      onBack={previousStep}
      isLastStep={currentStepIndex === TOTAL_STEPS - 1}
    />
  );
}
