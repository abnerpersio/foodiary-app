import { ImageBackground, TouchableOpacity, View } from "react-native";

import { AuthStackNavigationProps } from "@/app/navigation/AuthStack";
import greetingsBg from "@/ui/assets/greetings-bg/image.jpg";
import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { Logo } from "@/ui/components/Logo";
import { SignInBottomSheet } from "@/ui/components/SignInBottomSheet";
import { SignInBottomSheetRef } from "@/ui/components/SignInBottomSheet/types";
import { theme } from "@/ui/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export function Greetings() {
  const signInBottomSheetRef = useRef<SignInBottomSheetRef>(null);
  const navigation = useNavigation<AuthStackNavigationProps>();

  return (
    <>
      <ImageBackground
        source={greetingsBg}
        resizeMode="cover"
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <Logo />

          <View style={styles.ctaContainer}>
            <AppText
              color={theme.colors.white}
              weight="semiBold"
              size="3xl"
              style={styles.heading}
            >
              Controle sua dieta de forma simples
            </AppText>

            <View style={styles.ctaContent}>
              <Button onPress={() => navigation.navigate("Onboarding")}>
                Criar conta
              </Button>

              <View style={styles.signInContainer}>
                <AppText color={theme.colors.white}>Já tem uma conta?</AppText>

                <TouchableOpacity
                  onPress={() => signInBottomSheetRef.current?.open()}
                >
                  <AppText color={theme.colors.lime[500]}>
                    Acesse a sua conta
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SignInBottomSheet ref={signInBottomSheetRef} />
    </>
  );
}
