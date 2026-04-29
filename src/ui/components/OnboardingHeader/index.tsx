import { useIsKeyboardVisible } from "@/app/hooks/useIsKeyboardVisible";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type OnboardingHeaderProps = {
  currentStepIndex: number;
  totalSteps: number;
  onBack: () => void;
  isLastStep: boolean;
};

export function OnboardingHeader({
  currentStepIndex,
  totalSteps,
  onBack,
  isLastStep,
}: OnboardingHeaderProps) {
  const { top } = useSafeAreaInsets();
  const isKeyboardVisible = useIsKeyboardVisible();

  const widthAnimation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnimation.current, {
      toValue: (currentStepIndex + 1) * (100 / totalSteps),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStepIndex, totalSteps]);

  const shouldHideHeader = isKeyboardVisible && isLastStep;

  return (
    <View style={{ paddingTop: top, backgroundColor: theme.colors.white }}>
      <View
        style={[
          styles.container,
          shouldHideHeader && { height: 0, display: "none" },
        ]}
      >
        <Button size="icon" variant="ghost" onPress={onBack}>
          <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
        </Button>

        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarForeground,
              {
                width: widthAnimation.current.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        <View style={styles.rightActionPlaceholder} />
      </View>
    </View>
  );
}
