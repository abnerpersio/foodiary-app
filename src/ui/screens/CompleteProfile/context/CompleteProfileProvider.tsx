import { OnboardingContext } from "@/ui/screens/Onboarding/context";
import { useCallback, useEffect, useState } from "react";
import { CompleteProfileContext } from ".";
import {
  CompleteProfileStackParamList,
  completeProfileNavigation,
} from "../CompleteProfileStack";
import { ORDERED_STEPS } from "../steps";

export function CompleteProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = completeProfileNavigation.addListener("state", () => {
      const route = completeProfileNavigation.getCurrentRoute();
      if (!route) return;

      const index = ORDERED_STEPS.indexOf(
        route.name as keyof CompleteProfileStackParamList,
      );
      if (index !== -1) setCurrentStepIndex(index);
    });

    return unsubscribe;
  }, []);

  const previousStep = useCallback(() => {
    if (!completeProfileNavigation.canGoBack()) return;

    completeProfileNavigation.goBack();
    setCurrentStepIndex((i) => i - 1);
  }, []);

  const nextStep = useCallback(() => {
    const step = ORDERED_STEPS[currentStepIndex + 1];
    if (!step) return;

    completeProfileNavigation.navigate(step);
    setCurrentStepIndex((i) => i + 1);
  }, [currentStepIndex]);

  const contextValue = { currentStepIndex, previousStep, nextStep };

  return (
    <CompleteProfileContext.Provider value={contextValue}>
      <OnboardingContext.Provider value={contextValue}>
        {children}
      </OnboardingContext.Provider>
    </CompleteProfileContext.Provider>
  );
}
