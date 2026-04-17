import { theme } from "@/ui/styles/theme";
import { cloneElement } from "react";
import { View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

type FormGroupProps = {
  label: string;
  children: React.ReactElement<{ error?: string }>;
  error?: string;
};

export function FormGroup({ label, error, children }: FormGroupProps) {
  return (
    <View style={styles.container}>
      <AppText weight="medium">{label}</AppText>

      {cloneElement(children, { error })}

      {error && (
        <AppText size="sm" color={theme.colors.support.red}>
          {error}
        </AppText>
      )}
    </View>
  );
}
