import { AppText } from "@/ui/components/AppText";
import { View } from "react-native";
import { useHomeContext } from "../../context/useHome";
import { CurrentGoal } from "../CurrentGoal";
import { DateSwitcher } from "../DateSwitcher";
import { UserHeader } from "../UserHeader";
import { styles } from "./styles";

export function Header() {
  const { isLoading } = useHomeContext();

  return (
    <View>
      <UserHeader style={{ paddingBottom: 28 }} />

      <View style={[styles.container, { marginTop: -16 }]}>
        <DateSwitcher />

        <CurrentGoal style={styles.currentGoal} />

        <View style={styles.divider} />

        <AppText
          style={[styles.mealsLabel, { opacity: isLoading ? 0.5 : 1 }]}
          weight="medium"
        >
          Refeições
        </AppText>
      </View>
    </View>
  );
}
