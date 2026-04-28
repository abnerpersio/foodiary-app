import { SimplifiedMeal } from "@/app/types/Meal";
import { createContext } from "react";

export type HomeContextValue = {
  selectedDate: Date;
  meals: SimplifiedMeal[];
  isLoading: boolean;
  isRefreshing: boolean;
  previousDay: () => void;
  nextDay: () => void;
};

export const HomeContext = createContext({} as HomeContextValue);
