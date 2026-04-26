import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { View } from "react-native";
import { useHomeContext } from "../../context/useHome";
import { styles } from "./styles";

export function DateSwitcher() {
  const { selectedDate, previousDay, nextDay, isLoading } = useHomeContext();

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <Button
        onPress={previousDay}
        size="icon"
        variant="ghost"
        disabled={isLoading}
      >
        <ChevronLeftIcon />
      </Button>

      <AppText
        style={styles.selectedDate}
        weight="medium"
        color={theme.colors.gray[700]}
      >
        {formatDate(selectedDate)}
      </AppText>

      <Button
        onPress={nextDay}
        size="icon"
        variant="ghost"
        disabled={isLoading}
      >
        <ChevronRightIcon />
      </Button>
    </View>
  );
}

const formatDate = (date: Date) => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    weekday: isToday ? undefined : "long",
    month: "long",
  }).format(date);

  const prefix = isToday ? `hoje, ` : "";
  return prefix.concat(formatted);
};
