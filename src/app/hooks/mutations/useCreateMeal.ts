import { getFileInfo } from "@/app/lib/file";
import { MealService } from "@/app/services/MealService";
import { useMutation } from "@tanstack/react-query";

export const useCreateMeal = () => {
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { size, filename, type } = getFileInfo(fileUri);

      const { mealId } = await MealService.createMeal({
        file: {
          type,
          size,
          name: filename,
          uri: fileUri,
        },
      });

      return { mealId };
    },
  });

  return {
    createMeal: mutateAsync,
    isLoading: isPending,
    createdMealId: data?.mealId,
  };
};
