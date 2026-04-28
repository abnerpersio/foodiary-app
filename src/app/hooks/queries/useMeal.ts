import { MealService } from "@/app/services/MealService";
import { Meal } from "@/app/types/Meal";
import { SECOND } from "@/ui/utils/date";
import { useQuery } from "@tanstack/react-query";

const PROCESSING_STATUSES = [
  Meal.Status.UPLOADING,
  Meal.Status.QUEUED,
  Meal.Status.PROCESSING,
];

export function useMeal(mealId: string | undefined) {
  const { data: meal, isFetching } = useQuery({
    queryKey: ["meal", mealId],
    queryFn: async () => await MealService.getMeal(mealId!),
    staleTime: Infinity,
    enabled: !!mealId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (!status) return false;

      if (PROCESSING_STATUSES.includes(status)) {
        return 3 * SECOND;
      }

      return false;
    },
  });

  const isProcessing = !!meal && PROCESSING_STATUSES.includes(meal.status);

  return {
    meal,
    isLoading: isFetching,
    isProcessing,
  };
}
