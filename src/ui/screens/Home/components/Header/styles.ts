import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  currentGoal: {
    paddingTop: 8,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.gray[200],
    marginTop: 12,
    marginBottom: 20,
  },
  mealsLabel: {
    textTransform: "uppercase",
    letterSpacing: 1.28,
    paddingHorizontal: 12,
  },
});
