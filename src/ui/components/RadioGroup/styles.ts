import { theme } from "@/ui/styles/theme";
import { createVariants } from "@/ui/styles/utils/createVariants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  containerHorizontal: {
    flexDirection: "row",
  },
  itemInfo: {
    gap: 2,
  },
  icon: {
    backgroundColor: theme.colors.gray[200],
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteIconBg: {
    backgroundColor: theme.colors["white/40"],
  },
  label: {
    letterSpacing: -0.32,
  },
});

export const itemStyles = createVariants({
  base: {
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  defaultVariants: {
    status: "default",
    orientation: "vertical",
  },
  variants: {
    status: {
      default: {
        borderColor: theme.colors.gray[300],
      },
      error: {
        borderColor: theme.colors.support.red,
        backgroundColor: theme.colors.support["red/10"],
      },
      selected: {
        borderColor: theme.colors.lime[700],
        backgroundColor: theme.colors.lime["700/10"],
      },
    },
    orientation: {
      vertical: {},
      horizontal: {
        flexDirection: "column",
        paddingVertical: 32,
        flex: 1,
      },
    },
  },
});
