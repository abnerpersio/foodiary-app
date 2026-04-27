import { Image, Modal, StatusBar, View } from "react-native";

import { MealInputType } from "@/app/types/Meal";
import { theme } from "@/ui/styles/theme";
import { CameraView } from "expo-camera";
import {
  CameraIcon,
  CheckIcon,
  Trash2Icon,
  UnlockIcon,
  XIcon,
} from "lucide-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { CreateMealLoader } from "../CreateMealLoader";
import { styles } from "./styles";
import { usePictureModal } from "./usePictureModal";

type PictureModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function PictureModal({ visible, onClose }: PictureModalProps) {
  const {
    cameraRef,
    isLoading,
    permission,
    pictureUri,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleConfirm,
  } = usePictureModal();

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <StatusBar animated translucent barStyle="light-content" />

      {isLoading && <CreateMealLoader type={MealInputType.PICTURE} />}

      {!isLoading && permission && (
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

              {permission.granted && (
                <>
                  <View style={styles.body}>
                    {!pictureUri && (
                      <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        mode="picture"
                        facing="back"
                      />
                    )}

                    {pictureUri && (
                      <Image
                        source={{ uri: pictureUri }}
                        style={styles.picture}
                      />
                    )}
                  </View>

                  <View style={styles.footer}>
                    <View style={styles.actionsContainer}>
                      {!pictureUri && (
                        <>
                          <Button
                            onPress={handleTakePicture}
                            size="icon"
                            variant="secondary"
                            rippleStyle="light"
                          >
                            <CameraIcon
                              size={20}
                              color={theme.colors.black[700]}
                            />
                          </Button>

                          <AppText
                            onPress={handleTakePicture}
                            color={theme.colors.gray[500]}
                            style={styles.actionLabel}
                            align="center"
                          >
                            Tirar foto
                          </AppText>
                        </>
                      )}

                      {pictureUri && (
                        <View style={styles.actionsGroup}>
                          <Button
                            onPress={handleTryAgain}
                            size="icon"
                            variant="neutral"
                            rippleStyle="light"
                          >
                            <Trash2Icon
                              size={20}
                              color={theme.colors.gray[500]}
                            />
                          </Button>

                          <Button
                            onPress={handleConfirm}
                            size="icon"
                            variant="primary"
                          >
                            <CheckIcon
                              size={20}
                              color={theme.colors.black[700]}
                            />
                          </Button>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}

              {!permission.granted && (
                <View style={styles.body}>
                  <View style={styles.permissionContainer}>
                    <CameraIcon color={theme.colors.gray[500]} size={32} />

                    <AppText
                      color={theme.colors.gray[500]}
                      align="center"
                      style={styles.permissionLabel}
                    >
                      Para registrar sua refeição com uma foto, precisamos de
                      acesso à câmera do seu dispositivo
                    </AppText>
                  </View>

                  <Button onPress={requestPermission} leftIcon={UnlockIcon}>
                    Conceder acesso
                  </Button>
                </View>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      )}
    </Modal>
  );
}
