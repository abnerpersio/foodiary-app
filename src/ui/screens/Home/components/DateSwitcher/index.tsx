import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { View } from "react-native";
import { styles } from "./styles";

export function DateSwitcher() {
  return (
    <View style={styles.container}>
      <Button size="icon" variant="ghost">
        <ChevronLeftIcon />
      </Button>

      <AppText
        style={styles.selectedDate}
        weight="medium"
        color={theme.colors.gray[700]}
      >
        {formatDate(new Date())}
      </AppText>

      <Button size="icon" variant="ghost">
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
