import { useUpdateProfile } from "@/app/hooks/mutations/useUpdateProfile";
import { useAccount } from "@/app/hooks/queries/useAccount";
import { formatDateToAPI } from "@/ui/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { EditProfileSchema, editProfileSchema } from "./schema";

export function useEditProfile() {
  const { account } = useAccount();
  const { updateProfile, isLoading } = useUpdateProfile();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: account?.profile.name ?? "",
      birthDate: account?.profile.birthDate,
      height: String(account?.profile.height ?? ""),
      weight: String(account?.profile.weight ?? ""),
      gender: account?.profile.gender,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateProfile({
        name: data.name,
        birthDate: formatDateToAPI(data.birthDate),
        gender: data.gender,
        height: Number(data.height),
        weight: Number(data.weight),
      });
      Alert.alert("Sucesso!", "Perfil atualizado com sucesso");
    } catch {
      Alert.alert("Oops!", "Ocorreu um erro ao atualizar seu perfil");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
  };
}
