import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubtitle,
  StepTitle,
} from "../components/Step";
import { useOnboarding } from "../context/useOnboarding";

export function BirthDateStep() {
  const { nextStep } = useOnboarding();

  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

  const handleSelectDate = (_: DateTimePickerEvent, newDate?: Date) => {
    if (!newDate) return;

    setDate(newDate);

    if (Platform.OS === "android") {
      setIsDatePickerVisible(false);
    }
  };

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubtitle>Cada faixa etária responde de forma única</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        {isDatePickerVisible && (
          <DateTimePicker
            mode="date"
            value={date}
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={handleSelectDate}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
            <AppText
              weight="semiBold"
              size="3xl"
              color={theme.colors.gray[700]}
            >
              {formatDate(date)}
            </AppText>
          </TouchableOpacity>
        )}
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon />
        </Button>
      </StepFooter>
    </Step>
  );
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
