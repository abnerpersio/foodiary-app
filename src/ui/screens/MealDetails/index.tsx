import { Alert, View } from "react-native";

import { useDeleteMeal } from "@/app/hooks/mutations/useDeleteMeal";
import { useMeal } from "@/app/hooks/queries/useMeal";
import { AppStackRouteProps } from "@/app/navigation/AppStack";
import { AppText } from "@/ui/components/AppText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./components/Header";
import { styles } from "./styles";

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<"MealDetails">>();
  const { bottom } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const { meal, isLoading } = useMeal(params.mealId);
  const { deleteMeal, isDeleting } = useDeleteMeal();

  function handleDelete() {
    if (!meal) return;

    Alert.alert("Excluir refeição", "Tem certeza que deseja excluir esta refeição?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteMeal({ mealId: meal.id, mealDate: meal.createdAt });
          goBack();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={meal?.foods ?? []}
        contentContainerStyle={[{ paddingBottom: Math.max(bottom, 24) + 24 }]}
        ListHeaderComponent={
          <Header
            meal={meal}
            isLoading={isLoading}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <>
              <View style={styles.food}>
                <Skeleton width="100%" height={24} colorMode="light" />
              </View>

              <View style={styles.food}>
                <Skeleton width="100%" height={24} colorMode="light" />
              </View>

              <View style={styles.food}>
                <Skeleton width="100%" height={24} colorMode="light" />
              </View>
            </>
          ) : null
        }
        renderItem={({ item: food }) => (
          <View style={styles.food}>
            <AppText>
              {food.quantity} {food.name}
            </AppText>
          </View>
        )}
      />
    </View>
  );
}
