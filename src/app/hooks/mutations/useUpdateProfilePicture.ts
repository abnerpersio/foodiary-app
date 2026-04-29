import { getFileInfo } from "@/app/lib/file";
import { queryClient } from "@/app/lib/queryClient";
import { ProfileService } from "@/app/services/ProfileService";
import { useMutation } from "@tanstack/react-query";

export function useUpdateProfilePicture() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { size, filename } = getFileInfo(fileUri);

      await ProfileService.uploadPicture({
        file: {
          type: "image/jpeg",
          size,
          name: filename ?? "picture.jpeg",
          uri: fileUri,
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["account"] }),
  });

  return {
    uploadPicture: mutateAsync,
    isLoading: isPending,
  };
}
