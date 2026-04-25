import { useAccount } from "@/app/hooks/queries/useAccount";
import { GoalStats } from "@/ui/components/GoalStats";
import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";

export function CurrentGoal({ style }: { style: StyleProp<ViewStyle> }) {
  const { account } = useAccount();

  return (
    <View style={[styles.container, style]}>
      <GoalStats
        calories={{ goal: account!.goal.calories }}
        carbohydrates={{ goal: account!.goal.carbohydrates }}
        fats={{ goal: account!.goal.fats }}
        proteins={{ goal: account!.goal.proteins }}
      />
    </View>
  );
}
