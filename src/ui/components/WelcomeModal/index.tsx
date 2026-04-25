import { useAuth } from "@/app/contexts/AuthContext/useAuth";
import { useAccount } from "@/app/hooks/queries/useAccount";
import { Goal } from "@/app/types/Goal";
import { theme } from "@/ui/styles/theme";
import { useState } from "react";
import { Modal, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../AppText";
import { Button } from "../Button";
import { GoalStats } from "../GoalStats";
import { styles } from "./styles";

const GOALS_MAP = {
  [Goal.GAIN]: { icon: "🥩", label: "Ganhar peso" },
  [Goal.LOSE]: { icon: "🥦", label: "Perder peso" },
  [Goal.MAINTAIN]: { icon: "🍍", label: "Manter peso" },
} as Record<Goal, { icon: string; label: string }>;

export function WelcomeModal() {
  const { bottom } = useSafeAreaInsets();
  const { signedUp } = useAuth();
  const [visible, setVisible] = useState(signedUp);

  const { account } = useAccount({ enabled: false });

  const goal = GOALS_MAP[account!.profile.goal];

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <StatusBar animated barStyle="light-content" />

      <View style={[styles.container, { paddingBottom: Math.max(bottom, 24) }]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.icon}>
              <AppText>{goal.icon}</AppText>
            </View>

            <View style={styles.headerContent}>
              <AppText
                color={theme.colors.gray[100]}
                size="3xl"
                align="center"
                weight="semiBold"
                style={styles.title}
              >
                Seu plano de dieta para{" "}
                <Text style={styles.titleHighlight}>{goal.label}</Text> está
                pronto!
              </AppText>

              <AppText color={theme.colors.gray[600]} align="center">
                Essa é a recomendação diária recomendada para seu plano. Fique
                tranquilo, você poderá editar depois caso deseje.
              </AppText>
            </View>
          </View>

          <View style={styles.body}>
            <GoalStats
              calories={{ goal: account!.goal.calories }}
              carbohydrates={{ goal: account!.goal.carbohydrates }}
              fats={{ goal: account!.goal.fats }}
              proteins={{ goal: account!.goal.proteins }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button onPress={handleClose}>Começar meu plano</Button>
        </View>
      </View>
    </Modal>
  );
}
