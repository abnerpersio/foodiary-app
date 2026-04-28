import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black[700],
  },
  image: {
    height: 211,
    width: "100%",
  },
  overlay: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 12,
  },
  blurContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
    height: 64,
  },
  pageTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  macrosContainer: {
    flexDirection: "row",
    padding: 20,
  },
  macro: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  macrosProgressContainer: {
    marginTop: 4,
    marginHorizontal: 20,
  },
  macrosProgress: {
    flex: 1,
    height: 4,
    flexDirection: "row",
  },
  progress: {
    height: "100%",
  },
  divider: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.colors.gray[400],
  },
  mealNameContainer: {
    margin: 20,
    marginBottom: 24,
  },
  mealName: {
    letterSpacing: -0.24,
  },
  mealItemsHeader: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
});
