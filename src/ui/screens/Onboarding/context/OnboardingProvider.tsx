import { AuthStackNavigationProps } from "@/app/navigation/AuthStack";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { OnboardingContext } from ".";
import { onboardingNavigation } from "../OnboardingStack";
import { ORDERED_STEPS } from "../steps";

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const { goBack } = useNavigation<AuthStackNavigationProps>();

  // TODO:
  // useEffect(() => {
  //   return onboardingNavigation.addListener("state", (event) => {
  //     const { state } = event.data;
  //     if (typeof state?.index !== "number") return;
  //     setCurrentStepIndex(Math.max(state.index, 0));
  //   });
  // }, [onboardingNavigation]);

  const previousStep = useCallback(() => {
    if (!onboardingNavigation.canGoBack()) {
      goBack();
      return;
    }

    const index = currentStepIndex - 1;
    onboardingNavigation.goBack();
    setCurrentStepIndex(index);
  }, [goBack, currentStepIndex]);

  const nextStep = useCallback(() => {
    const index = currentStepIndex + 1;

    const step = ORDERED_STEPS[index];
    if (!step) return;

    onboardingNavigation.navigate(step);
    setCurrentStepIndex(index);
  }, [currentStepIndex]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStepIndex,
        previousStep,
        nextStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
