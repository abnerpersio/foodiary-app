import { MealInputType } from "@/app/types/Meal";
import { theme } from "@/ui/styles/theme";
import { CameraIcon, LucideIcon, MicIcon } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { AudioModal } from "../AudioModal";
import { PictureModal } from "../PictureModal";
import { styles } from "./styles";

type CreateMealOptionsProps = {
  disabled?: boolean;
};

export function CreateMealOptions({
  disabled = false,
}: CreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] =
    useState<MealInputType | null>(MealInputType.PICTURE);

  const handleOpenModal = (type: MealInputType) => {
    setCurrentVisibleModal(type);
  };

  const handleCloseModal = () => {
    setCurrentVisibleModal(null);
  };

  return (
    <View style={styles.container}>
      <AudioModal
        visible={currentVisibleModal === MealInputType.AUDIO}
        onClose={handleCloseModal}
      />

      <PictureModal
        visible={currentVisibleModal === MealInputType.PICTURE}
        onClose={handleCloseModal}
      />

      <OptionButton
        onPress={() => handleOpenModal(MealInputType.AUDIO)}
        disabled={disabled}
        icon={MicIcon}
        label="Áudio"
      />

      <OptionButton
        onPress={() => handleOpenModal(MealInputType.PICTURE)}
        disabled={disabled}
        icon={CameraIcon}
        label="Foto"
      />
    </View>
  );
}

type OptionButtonProps = {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

export function OptionButton({
  icon: Icon,
  label,
  disabled,
  onPress,
}: OptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        android_ripple={{ color: theme.colors["black/10"], foreground: true }}
        style={({ pressed }) => [
          styles.button,
          pressed && Platform.OS === "ios" && { opacity: 0.5 },
        ]}
      >
        <View style={styles.icon}>
          <Icon color={theme.colors.black[700]} size={24} />
        </View>

        <AppText weight="semiBold" style={styles.buttonLabel}>
          {label}
        </AppText>
      </Pressable>
    </View>
  );
}
