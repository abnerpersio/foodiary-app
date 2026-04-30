import { queryClient } from "@/app/lib/queryClient";
import { MealService } from "@/app/services/MealService";
import { formatDateToAPI } from "@/ui/utils/date";
import { useMutation } from "@tanstack/react-query";

type DeleteMealParams = {
  mealId: string;
  mealDate: Date;
};

export const useDeleteMeal = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ mealId }: DeleteMealParams) => MealService.deleteMeal(mealId),
    onSuccess: (_, { mealDate }) => {
      queryClient.invalidateQueries({
        queryKey: ["meals", formatDateToAPI(mealDate)],
      });
    },
  });

  return {
    deleteMeal: mutateAsync,
    isDeleting: isPending,
  };
};
