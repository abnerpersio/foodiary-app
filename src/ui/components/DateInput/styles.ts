import { theme } from "@/ui/styles/theme";
import { createVariants } from "@/ui/styles/utils/createVariants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: "center",
  },
  pickerDoneRow: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
});

export const dateInputStyles = createVariants({
  defaultVariants: {
    status: "default",
    disabled: "false",
  },
  base: {
    backgroundColor: theme.colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  variants: {
    status: {
      default: {
        borderColor: theme.colors.gray[400],
      },
      error: {
        borderColor: theme.colors.support.red,
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
