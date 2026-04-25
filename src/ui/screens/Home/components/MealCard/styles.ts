import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 8,
  },
  cardWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  card: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.gray[400],
  },
  cardHeader: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealTitle: {
    gap: 2,
    flexShrink: 1,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    padding: 16,
  },
  mealStatRow: {
    flexDirection: "row",
  },
  mealStat: {
    width: "50%",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
