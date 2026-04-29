import { CompleteProfileStackParamList } from "../CompleteProfileStack";

export const ORDERED_STEPS: (keyof CompleteProfileStackParamList)[] = [
  "Goal",
  "Gender",
  "BirthDate",
  "Height",
  "Weight",
  "ActivityLevel",
  "Name",
];

export const TOTAL_STEPS = ORDERED_STEPS.length;
