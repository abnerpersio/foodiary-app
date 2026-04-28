import { AppStackNavigationProps } from "@/app/navigation/AppStack";
import { theme } from "@/ui/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "lucide-react-native";
import { View } from "react-native";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { styles } from "./styles";

type Props = {
  title: string;
  rightAction?: React.ReactNode;
};

export function AppHeader({ title, rightAction }: Props) {
  const { goBack } = useNavigation<AppStackNavigationProps>();

  return (
    <View style={styles.container}>
      <Button variant="ghost" size="icon" onPress={goBack}>
        <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
      </Button>

      <AppText size="sm" color={theme.colors.black[700]} style={styles.title}>
        {title}
      </AppText>

      {rightAction ?? <View style={styles.rightActionPlaceholder} />}
    </View>
  );
}
