import { theme } from "@/ui/styles/theme";
import { VariantProps } from "@/ui/styles/utils/createVariants";
import { Platform, Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { buttonStyles, styles } from "./styles";

type ButtonProps = React.ComponentProps<typeof Pressable> &
  Omit<VariantProps<typeof buttonStyles>, "disabled">;

export function Button({
  size,
  variant,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const childElement =
    typeof children === "string" ? (
      <AppText weight="medium">{children}</AppText>
    ) : (
      children
    );

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          buttonStyles({
            size,
            variant,
            disabled: disabled ? "true" : "false",
          }),
          pressed && Platform.OS === "ios" && { opacity: 0.75 },
          typeof style === "function" ? style({ pressed }) : style,
        ]}
        disabled={disabled}
        android_ripple={{ color: theme.colors["black/10"] }}
        {...props}
      >
        {childElement}
      </Pressable>
    </View>
  );
}
