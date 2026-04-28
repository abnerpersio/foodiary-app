import { theme } from "@/ui/styles/theme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AppText } from "../AppText";
import { dateInputStyles, styles } from "./styles";

type DateInputProps = {
  value?: Date;
  onChange: (date: Date) => void;
  error?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

export function DateInput({
  value,
  onChange,
  error,
  disabled,
  style,
}: DateInputProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handlePress = () => {
    if (disabled) return;

    if (Platform.OS === "ios") {
      setIsPickerVisible((prev) => !prev);
      return;
    }

    setIsPickerVisible(true);
  };

  const handleChange = (_: DateTimePickerEvent, newDate?: Date) => {
    if (!newDate) return;

    onChange(newDate);

    if (Platform.OS === "android") {
      setIsPickerVisible(false);
    }
  };

  const shouldRenderOk = Platform.OS === "ios" && isPickerVisible;

  return (
    <View style={[{ flex: 1 }, style]}>
      <TouchableOpacity
        style={dateInputStyles({
          status: error ? "error" : "default",
          disabled: disabled ? "true" : "false",
        })}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <AppText
          color={value ? theme.colors.black[700] : theme.colors.gray[700]}
        >
          {value ? formatDate(value) : "DD/MM/AAAA"}
        </AppText>

        {shouldRenderOk && <AppText color={theme.colors.gray[700]}>Ok</AppText>}
        {!shouldRenderOk && (
          <CalendarIcon size={20} color={theme.colors.gray[700]} />
        )}
      </TouchableOpacity>

      {isPickerVisible && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            mode="date"
            value={value ?? new Date()}
            maximumDate={new Date()}
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={handleChange}
          />
        </View>
      )}
    </View>
  );
}
