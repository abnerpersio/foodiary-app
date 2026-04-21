import { theme } from "@/ui/styles/theme";
import { createContext, use, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

type RadioGroupContextType = {
  value: string | null;
  setValue: (selectedValue: string) => void;
  isHorizontal: boolean;
};

const RadioGroupContext = createContext({} as RadioGroupContextType);

type RadioGroupProps = {
  children: React.ReactNode;
  initialValue?: string;
  orientation?: "horizontal" | "vertical";
};

export function RadioGroup({
  children,
  initialValue,
  orientation = "vertical",
}: RadioGroupProps) {
  const [value, setValue] = useState<string | null>(initialValue ?? null);

  const isHorizontal = orientation === "horizontal";

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        setValue,
        isHorizontal,
      }}
    >
      <View
        style={[styles.container, isHorizontal && styles.containerHorizontal]}
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
    isHorizontal,
  } = use(RadioGroupContext);
  const isSelected = value === selectedValue;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        style={[
          styles.item,
          isSelected && styles.selectedItem,
          isHorizontal && styles.horizontalItem,
        ]}
        onPress={() => setValue(value)}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

export function RadioGroupIcon({ children }: { children: string }) {
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, isSelected && styles.selectedIcon]}>
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
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText
      size="base"
      weight="semiBold"
      style={[styles.label, isHorizontal && styles.textCenter]}
    >
      {children}
    </AppText>
  );
}

export function RadioGroupDescription({ children }: { children: string }) {
  return (
    <AppText size="sm" color={theme.colors.gray[700]} style={styles.textCenter}>
      {children}
    </AppText>
  );
}
