import { useAccount } from "@/app/hooks/useAccount";
import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { TargetIcon } from "lucide-react-native";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";

export function UserHeader({ style }: { style?: StyleProp<ViewStyle> }) {
  const { account } = useAccount();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://github.com/abnerpersio.png" }}
        />

        <View style={styles.greetings}>
          <AppText size="sm" color={theme.colors.gray[700]}>
            Olá 👋
          </AppText>

          <AppText weight="semiBold">{account!.profile.name}</AppText>
        </View>
      </View>

      <Button variant="ghost" leftIcon={TargetIcon}>
        <AppText>Metas</AppText>
      </Button>
    </View>
  );
}
