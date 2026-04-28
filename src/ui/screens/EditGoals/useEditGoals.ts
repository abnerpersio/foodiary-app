import { useUpdateGoal } from "@/app/hooks/mutations/useUpdateGoal";
import { useAccount } from "@/app/hooks/queries/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { goalsSchema } from "./schema";

export function useEditGoals() {
  const { account } = useAccount();
  const { updateGoals, isLoading } = useUpdateGoal();

  const form = useForm({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      calories: String(account?.goal.calories ?? ""),
      carbohydrates: String(account?.goal.carbohydrates ?? ""),
      proteins: String(account?.goal.proteins ?? ""),
      fats: String(account?.goal.fats ?? ""),
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateGoals({
        calories: Number(data.calories),
        carbohydrates: Number(data.carbohydrates),
        proteins: Number(data.proteins),
        fats: Number(data.fats),
      });
      Alert.alert("Sucesso!", "Metas atualizadas com sucesso");
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Ocorreu um erro ao atualizar suas metas");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
  };
}
