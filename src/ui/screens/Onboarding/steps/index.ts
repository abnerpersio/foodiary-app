import { OnboardingStackParamList } from "../OnboardingStack";

export const ORDERED_STEPS: (keyof OnboardingStackParamList)[] = [
  "Goal",
  "Gender",
  "BirthDate",
  "Height",
  "Weight",
  "ActivityLevel",
  "CreateAccount",
];

export const TOTAL_STEPS = ORDERED_STEPS.length;
