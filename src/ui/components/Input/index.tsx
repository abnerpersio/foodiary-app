import { theme } from "@/ui/styles/theme";
import { useState } from "react";
import { BlurEvent, FocusEvent, TextInput, TextInputProps, View } from "react-native";
import { AppText } from "../AppText";
import { inputStyles, suffixStyles } from "./styles";

type InputProps = Omit<TextInputProps, "readOnly"> & {
  disabled?: boolean;
  error?: boolean;
  InputComponent?: React.ComponentType<TextInputProps>;
  ref?: React.Ref<TextInput>;
  formatter?: (value: string) => string;
  suffix?: string;
};

export function Input({
  disabled,
  style,
  onFocus,
  onBlur,
  error,
  InputComponent = TextInput,
  formatter,
  onChangeText,
  suffix,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: BlurEvent) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleChangeText = (value: string) => {
    const formattedValue = formatter?.(value) ?? value;
    onChangeText?.(formattedValue);
  };

  const inputElement = (
    <InputComponent
      style={[
        inputStyles({
          status: error ? "error" : isFocused ? "focus" : "default",
          disabled: disabled ? "true" : "false",
        }),
        suffix ? { flex: 1 } : style,
      ]}
      placeholderTextColor={theme.colors.gray[700]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={disabled}
      onChangeText={handleChangeText}
      {...props}
    />
  );

  if (!suffix) return inputElement;

  return (
    <View style={[suffixStyles.row, style]}>
      {inputElement}
      <View style={suffixStyles.suffix}>
        <AppText color={theme.colors.gray[700]}>{suffix}</AppText>
      </View>
    </View>
  );
}
