import { MealService } from "@/app/services/MealService";
import { formatDateToAPI } from "@/ui/utils/date";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useMeals(dateToSearch: Date) {
  const date = formatDateToAPI(dateToSearch);

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
