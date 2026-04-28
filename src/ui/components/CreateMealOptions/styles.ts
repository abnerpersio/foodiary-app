import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderStyle: "solid",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    overflow: "hidden",
  },
  buttonLabel: {
    letterSpacing: -0.16,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
  },
});
