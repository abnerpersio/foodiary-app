import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  food: {
    marginHorizontal: 20,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[400],
  },
});
