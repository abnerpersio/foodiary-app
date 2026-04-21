import { createContext } from "react";

type OnboardingContextValue = {
  currentStepIndex: number;
  previousStep: () => void;
  nextStep: () => void;
};

export const OnboardingContext = createContext({} as OnboardingContextValue);
