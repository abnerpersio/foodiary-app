import { theme } from "@/ui/styles/theme";
import { CameraIcon, LucideIcon, MicIcon } from "lucide-react-native";
import { Platform, Pressable, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

export function CreateMealOptions() {
  return (
    <View style={styles.container}>
      <OptionButton icon={MicIcon} label="Áudio" />

      <OptionButton icon={CameraIcon} label="Foto" />
    </View>
  );
}

type OptionButtonProps = {
  icon: LucideIcon;
  label: string;
};

export function OptionButton({ icon: Icon, label }: OptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        android_ripple={{ color: theme.colors["black/10"] }}
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
