import { MealService } from "@/app/services/MealService";
import { useQuery } from "@tanstack/react-query";

export function useMeals(dateToSearch: Date) {
  const [date] = dateToSearch.toISOString().split("T");
  console.log("date", date);

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["meals", date],
    queryFn: () => MealService.getMealsByDate(date),
    staleTime: Infinity,
  });

  return {
    meals: data?.meals ?? [],
    isInitialLoading: isLoading,
  };
}
