import { useIsKeyboardVisible } from "@/app/hooks/useIsKeyboardVisible";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { ChevronLeftIcon } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOnboardingContext } from "../../context/useOnboardingContext";
import { TOTAL_STEPS } from "../../steps";
import { styles } from "./styles";

export function OnboardingHeader() {
  const { top } = useSafeAreaInsets();
  const { currentStepIndex, previousStep } = useOnboardingContext();
  const isKeyboardVisible = useIsKeyboardVisible();

  const widthAnimation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnimation.current, {
      toValue: (currentStepIndex + 1) * (100 / TOTAL_STEPS),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStepIndex]);

  const shouldHideHeader =
    isKeyboardVisible && currentStepIndex === TOTAL_STEPS - 1;

  return (
    <View style={{ paddingTop: top, backgroundColor: theme.colors.white }}>
      <View
        style={[
          styles.container,
          shouldHideHeader && { height: 0, display: "none" },
        ]}
      >
        <Button size="icon" variant="ghost" onPress={previousStep}>
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
