import { View } from "react-native";

import { useMeal } from "@/app/hooks/queries/useMeal";
import { AppStackRouteProps } from "@/app/navigation/AppStack";
import { AppText } from "@/ui/components/AppText";
import { useRoute } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./components/Header";
import { styles } from "./styles";

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<"MealDetails">>();
  const { bottom } = useSafeAreaInsets();

  const { meal, isLoading } = useMeal(params.mealId);

  return (
    <View style={styles.container}>
      <FlatList
        alwaysBounceVertical={false}
        data={meal?.foods ?? []}
        contentContainerStyle={[{ paddingBottom: Math.max(bottom, 24) + 24 }]}
        ListHeaderComponent={<Header meal={meal} isLoading={isLoading} />}
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
