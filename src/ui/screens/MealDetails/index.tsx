import { View } from "react-native";

import { AppStackRouteProps } from "@/app/navigation/AppStack";
import { AppText } from "@/ui/components/AppText";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<"MealDetails">>();

  return (
    <View style={styles.container}>
      <AppText>{params.mealId}</AppText>
    </View>
  );
}
