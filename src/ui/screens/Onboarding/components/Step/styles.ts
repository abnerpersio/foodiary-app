import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  header: {
    paddingVertical: 4,
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    letterSpacing: -0.32,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 24,
  },
});
