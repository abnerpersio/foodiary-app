import { MealService } from "@/app/services/MealService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useMeals(dateToSearch: Date) {
  const [date] = dateToSearch.toISOString().split("T");

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["meals", date],
    queryFn: () => MealService.getMealsByDate(date),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });

  return {
    meals: data?.meals ?? [],
    isInitialLoading: isLoading,
    isLoading: isFetching,
    reloadMeals: refetch,
  };
}
