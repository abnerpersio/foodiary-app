import { AppText } from "@/ui/components/AppText";
import { View } from "react-native";
import { CurrentGoal } from "../CurrentGoal";
import { DateSwitcher } from "../DateSwitcher";
import { UserHeader } from "../UserHeader";
import { styles } from "./styles";

export function Header() {
  return (
    <View>
      <UserHeader style={{ paddingBottom: 28 }} />

      <View style={[styles.container, { marginTop: -16 }]}>
        <DateSwitcher />

        <CurrentGoal style={styles.currentGoal} />

        <View style={styles.divider} />

        <AppText style={styles.mealsLabel} weight="medium">
          Refeições
        </AppText>
      </View>
    </View>
  );
}
