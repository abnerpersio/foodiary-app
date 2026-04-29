import { ActivityLevelStep } from "@/ui/components/OnboardingSteps/ActivityLevelStep";
import { BirthDateStep } from "@/ui/components/OnboardingSteps/BirthDateStep";
import { GenderStep } from "@/ui/components/OnboardingSteps/GenderStep";
import { GoalStep } from "@/ui/components/OnboardingSteps/GoalStep";
import { HeightStep } from "@/ui/components/OnboardingSteps/HeightStep";
import { WeightStep } from "@/ui/components/OnboardingSteps/WeightStep";
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationIndependentTree,
  RouteProp,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NameStep } from "./steps/NameStep";

export type CompleteProfileStackParamList = {
  Goal: undefined;
  Gender: undefined;
  BirthDate: undefined;
  Height: undefined;
  Weight: undefined;
  ActivityLevel: undefined;
  Name: undefined;
};

export type CompleteProfileStackNavigationProps =
  NativeStackNavigationProp<CompleteProfileStackParamList>;

export type CompleteProfileStackScreenProps<
  TRouteName extends keyof CompleteProfileStackParamList,
> = NativeStackScreenProps<CompleteProfileStackParamList, TRouteName>;

export type CompleteProfileStackRouteProps<
  TRouteName extends keyof CompleteProfileStackParamList,
> = RouteProp<CompleteProfileStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<CompleteProfileStackParamList>();

export const completeProfileNavigation =
  createNavigationContainerRef<CompleteProfileStackParamList>();

export function CompleteProfileStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={completeProfileNavigation}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Goal"
        >
          <Stack.Screen name="Goal" component={GoalStep} />
          <Stack.Screen name="Gender" component={GenderStep} />
          <Stack.Screen name="BirthDate" component={BirthDateStep} />
          <Stack.Screen name="Height" component={HeightStep} />
          <Stack.Screen name="Weight" component={WeightStep} />
          <Stack.Screen name="ActivityLevel" component={ActivityLevelStep} />
          <Stack.Screen name="Name" component={NameStep} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
