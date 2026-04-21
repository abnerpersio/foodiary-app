import { theme } from "@/ui/styles/theme";
import { cloneElement } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

type FormGroupProps = {
  label: string;
  children: React.ReactElement<{ error?: string }>;
  error?: string;
  style?: StyleProp<ViewStyle>;
};

export function FormGroup({ label, error, children, style }: FormGroupProps) {
  return (
    <View style={[styles.container, style]}>
      <AppText weight="medium">{label}</AppText>

      {cloneElement(children, { error })}

      {error && <FormError>{error}</FormError>}
    </View>
  );
}

export function FormError({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <AppText size="sm" color={theme.colors.support.red}>
      {children}
    </AppText>
  );
}
