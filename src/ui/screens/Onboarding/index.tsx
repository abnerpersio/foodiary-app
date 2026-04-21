import { theme } from "@/ui/styles/theme";
import { KeyboardAvoidingView, Platform } from "react-native";
import { OnboardingStack } from "./OnboardingStack";
import { OnboardingHeader } from "./components/OnboardingHeader";
import { OnboardingProvider } from "./context/OnboardingProvider";

export function Onboarding() {
  return (
    <OnboardingProvider>
      <OnboardingHeader />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={16}
      >
        <OnboardingStack />
      </KeyboardAvoidingView>
    </OnboardingProvider>
  );
}
