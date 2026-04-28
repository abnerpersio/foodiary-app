import { theme } from "@/ui/styles/theme";
import { createVariants } from "@/ui/styles/utils/createVariants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export const buttonStyles = createVariants({
  defaultVariants: {
    size: "default",
    variant: "primary",
    disabled: "false",
  },
  base: {
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: theme.colors.lime[500],
      },
      secondary: {
        backgroundColor: theme.colors.gray[300],
      },
      ghost: {
        backgroundColor: "transparent",
      },
      neutral: {
        backgroundColor: theme.colors.lime["700/5"],
      },
    },
    size: {
      default: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        minHeight: 52,
      },
      icon: {
        width: 48,
        height: 48,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
      false: {
        opacity: 1,
      },
    },
  },
});
