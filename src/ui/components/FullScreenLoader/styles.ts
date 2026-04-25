import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 48,
    flex: 1,
    backgroundColor: theme.colors.lime[700],
    justifyContent: "center",
    alignItems: "center",
  },
});
