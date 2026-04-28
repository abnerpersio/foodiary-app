import { useAccount } from "@/app/hooks/queries/useAccount";
import { AppStackNavigationProps } from "@/app/navigation/AppStack";
import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { TargetIcon } from "lucide-react-native";
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

export function UserHeader({ style }: { style?: StyleProp<ViewStyle> }) {
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { account } = useAccount();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => navigate("EditProfile")}
        style={styles.userInfo}
      >
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
      </TouchableOpacity>

      <Button
        variant="ghost"
        leftIcon={TargetIcon}
        onPress={() => navigate("EditGoals")}
      >
        <AppText>Metas</AppText>
      </Button>
    </View>
  );
}
