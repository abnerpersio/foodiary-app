import { queryClient } from "@/app/lib/queryClient";
import { GoalService } from "@/app/services/GoalService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateGoal = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: GoalService.UpdateGoalsParams) =>
      GoalService.updateGoals(params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["account"] }),
  });

  return {
    updateGoals: mutateAsync,
    isLoading: isPending,
  };
};
