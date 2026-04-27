import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    right: 16,
  },
  bottomSheet: {
    shadowColor: theme.colors.black[900],
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 24,
  },
  title: {
    letterSpacing: -0.4,
  },
});
