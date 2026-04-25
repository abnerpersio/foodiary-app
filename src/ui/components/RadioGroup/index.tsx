import { theme } from "@/ui/styles/theme";
import { createContext, use } from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { itemStyles, styles } from "./styles";

type RadioGroupContextType = {
  value: string | null;
  setValue: (selectedValue: string) => void;
  orientation: "horizontal" | "vertical";
  error: boolean;
};

const RadioGroupContext = createContext({} as RadioGroupContextType);

type RadioGroupProps = {
  children: React.ReactNode;
  value: string | null;
  onChangeValue: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  error?: boolean;
};

export function RadioGroup({
  value,
  onChangeValue,
  children,
  orientation = "vertical",
  error = false,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider
      value={{
        value,
        setValue: onChangeValue,
        orientation,
        error,
      }}
    >
      <View
        style={[
          styles.container,
          orientation === "horizontal" && styles.containerHorizontal,
        ]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

const RadioGroupItemContext = createContext({ isSelected: false });

type RadioGroupItemProps = {
  children: React.ReactNode;
  value: string;
};

export function RadioGroupItem({ children, value }: RadioGroupItemProps) {
  const {
    value: selectedValue,
    setValue,
    orientation,
    error,
  } = use(RadioGroupContext);
  const isSelected = value === selectedValue;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        style={itemStyles({
          orientation,
          status: error ? "error" : isSelected ? "selected" : "default",
        })}
        onPress={() => setValue(value)}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

export function RadioGroupIcon({ children }: { children: string }) {
  const { error } = use(RadioGroupContext);
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, (isSelected || error) && styles.whiteIconBg]}>
      <AppText size="base">{children}</AppText>
    </View>
  );
}

export function RadioGroupItemInfo({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View style={styles.itemInfo}>{children}</View>;
}

export function RadioGroupLabel({ children }: { children: string }) {
  const { orientation } = use(RadioGroupContext);

  return (
    <AppText
      size="base"
      weight="semiBold"
      align={orientation === "horizontal" ? "center" : undefined}
      style={styles.label}
    >
      {children}
    </AppText>
  );
}

export function RadioGroupDescription({ children }: { children: string }) {
  return (
    <AppText size="sm" color={theme.colors.gray[700]} align="center">
      {children}
    </AppText>
  );
}
