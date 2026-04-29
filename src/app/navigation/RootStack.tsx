import { useAuth } from "../contexts/AuthContext/useAuth";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { CompleteProfile } from "@/ui/screens/CompleteProfile";

export type RootStackParamList = {
  Auth: undefined;
  CompleteProfile: undefined;
  App: undefined;
};

export type RootStackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackScreenProps<TRouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, TRouteName>;

export type RootStackRouteProps<TRouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  const { signedIn, needsProfileSetup } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!signedIn && (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ animationTypeForReplace: "pop" }}
        />
      )}
      {signedIn && needsProfileSetup && (
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      )}
      {signedIn && !needsProfileSetup && (
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{ animationTypeForReplace: "push" }}
        />
      )}
    </Stack.Navigator>
  );
}
