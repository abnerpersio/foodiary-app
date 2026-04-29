import { createContext } from "react";

type CompleteProfileContextValue = {
  currentStepIndex: number;
  previousStep: () => void;
  nextStep: () => void;
};

export const CompleteProfileContext = createContext(
  {} as CompleteProfileContextValue,
);
