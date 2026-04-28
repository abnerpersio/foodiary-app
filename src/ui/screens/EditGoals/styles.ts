import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 32,
    backgroundColor: theme.colors.white,
  },
  footer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[400],
  },
});
