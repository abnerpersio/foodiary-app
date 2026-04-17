import { theme } from "@/ui/styles/theme";
import { useState } from "react";
import { BlurEvent, FocusEvent, TextInput, TextInputProps } from "react-native";
import { inputStyles } from "./styles";

type InputProps = Omit<TextInputProps, "readOnly"> & {
  disabled?: boolean;
  error?: boolean;
  InputComponent?: React.ComponentType<TextInputProps>;
  ref?: React.Ref<TextInput>;
};

export function Input({
  disabled,
  style,
  onFocus,
  onBlur,
  error,
  InputComponent = TextInput,
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

  return (
    <InputComponent
      style={[
        inputStyles({
          status: error ? "error" : isFocused ? "focus" : "default",
          disabled: disabled ? "true" : "false",
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.gray[700]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={disabled}
      {...props}
    />
  );
}
