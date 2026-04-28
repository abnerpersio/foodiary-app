import { AuthStackNavigationProps } from "@/app/navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { OnboardingContext } from ".";
import { OnboardingStackParamList, onboardingNavigation } from "../OnboardingStack";
import { ORDERED_STEPS } from "../steps";

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const { goBack } = useNavigation<AuthStackNavigationProps>();

  useEffect(() => {
    const unsubscribe = onboardingNavigation.addListener("state", () => {
      const route = onboardingNavigation.getCurrentRoute();
      if (!route) return;

      const index = ORDERED_STEPS.indexOf(
        route.name as keyof OnboardingStackParamList
      );
      if (index !== -1) setCurrentStepIndex(index);
    });

    return unsubscribe;
  }, []);

  const previousStep = useCallback(() => {
    if (!onboardingNavigation.canGoBack()) {
      goBack();
      return;
    }

    const index = currentStepIndex - 1;
    onboardingNavigation.goBack();
    setCurrentStepIndex(index);
  }, [goBack, currentStepIndex]);

  const nextStep = useCallback(() => {
    const index = currentStepIndex + 1;

    const step = ORDERED_STEPS[index];
    if (!step) return;

    onboardingNavigation.navigate(step);
    setCurrentStepIndex(index);
  }, [currentStepIndex]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStepIndex,
        previousStep,
        nextStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
