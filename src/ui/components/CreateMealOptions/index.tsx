import { theme } from "@/ui/styles/theme";
import { CameraIcon, LucideIcon, MicIcon } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { AudioModal } from "../AudioModal";
import { styles } from "./styles";

type CreateMealOptionsProps = {
  disabled?: boolean;
};

type VisibleModal = "audio" | "picture";

export function CreateMealOptions({
  disabled = false,
}: CreateMealOptionsProps) {
  const [currentVisibleModal, setCurrentVisibleModal] =
    useState<VisibleModal | null>("audio");

  const handleOpenModal = (type: VisibleModal) => {
    setCurrentVisibleModal(type);
  };

  const handleCloseModal = () => {
    setCurrentVisibleModal(null);
  };

  return (
    <View style={styles.container}>
      <AudioModal
        visible={currentVisibleModal === "audio"}
        onClose={handleCloseModal}
      />

      <OptionButton
        onPress={() => handleOpenModal("audio")}
        disabled={disabled}
        icon={MicIcon}
        label="Áudio"
      />

      <OptionButton
        onPress={() => handleOpenModal("picture")}
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
