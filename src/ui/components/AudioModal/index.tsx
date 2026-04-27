import { Modal, StatusBar, View } from "react-native";

import { MealInputType } from "@/app/types/Meal";
import { theme } from "@/ui/styles/theme";
import { XIcon } from "lucide-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { CreateMealLoader } from "../CreateMealLoader";
import { Actions } from "./Actions";
import { styles } from "./styles";
import { useAudioModal } from "./useAudioModal";

type AudioModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function AudioModal({ visible, onClose }: AudioModalProps) {
  const {
    state,
    isLoading,
    audioUri,
    handleStartRecording,
    handleStopRecording,
    handleTryAgain,
    handleConfirm,
  } = useAudioModal();

  const isRecording = state === "recording";

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <StatusBar animated translucent barStyle="light-content" />

      {isLoading && <CreateMealLoader type={MealInputType.AUDIO} />}

      {!isLoading && (
        <View style={styles.container}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.content}>
              <View style={styles.header}>
                <Button
                  onPress={onClose}
                  variant="neutral"
                  size="icon"
                  rippleStyle="light"
                >
                  <XIcon size={20} color={theme.colors.white} />
                </Button>
              </View>

              <View style={styles.body}>
                <View
                  style={[
                    styles.circle1,
                    isRecording && styles.circle1Recording,
                  ]}
                >
                  <View
                    style={[
                      styles.circle2,
                      isRecording && styles.circle2Recording,
                    ]}
                  >
                    <View
                      style={[
                        styles.circle3,
                        isRecording && styles.circle3Recording,
                      ]}
                    />
                  </View>
                </View>

                <AppText
                  color={theme.colors.gray[500]}
                  style={styles.instructionsLabel}
                  align="center"
                >
                  Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
                </AppText>
              </View>

              <View style={styles.footer}>
                <View style={styles.actionsContainer}>
                  <Actions
                    state={state}
                    audioUri={audioUri}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    onTryAgain={handleTryAgain}
                    onConfirm={handleConfirm}
                  />
                </View>
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  );
}
