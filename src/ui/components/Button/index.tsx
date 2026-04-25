import { theme } from "@/ui/styles/theme";
import { VariantProps } from "@/ui/styles/utils/createVariants";
import { LucideIcon } from "lucide-react-native";
import { ActivityIndicator, Platform, Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { buttonStyles, styles } from "./styles";

type ButtonProps = React.ComponentProps<typeof Pressable> &
  Omit<VariantProps<typeof buttonStyles>, "disabled"> & {
    isLoading?: boolean;
    leftIcon?: LucideIcon;
  };

export function Button({
  size,
  variant,
  children,
  disabled: disabledProp,
  isLoading,
  leftIcon: LeftIcon,
  style,
  ...props
}: ButtonProps) {
  const childElement =
    typeof children === "string" ? (
      <AppText weight="medium">{children}</AppText>
    ) : (
      children
    );

  const disabled = disabledProp || isLoading;

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
        {isLoading ? (
          <ActivityIndicator color={theme.colors.black[700]} />
        ) : (
          <View style={styles.content}>
            {LeftIcon && <LeftIcon color={theme.colors.black[700]} size={20} />}
            {childElement as React.ReactElement}
          </View>
        )}
      </Pressable>
    </View>
  );
}
