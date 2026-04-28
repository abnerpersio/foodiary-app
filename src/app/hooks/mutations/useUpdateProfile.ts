import { queryClient } from "@/app/lib/queryClient";
import { ProfileService } from "@/app/services/ProfileService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: ProfileService.UpdateProfileParams) =>
      ProfileService.updateProfile(params),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["account"] }),
  });

  return {
    updateProfile: mutateAsync,
    isLoading: isPending,
  };
};
