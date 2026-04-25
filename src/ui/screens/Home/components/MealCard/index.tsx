import { AppText } from "@/ui/components/AppText";
import { theme } from "@/ui/styles/theme";
import { Platform, Pressable, View } from "react-native";
import { styles } from "./styles";

export function MealCard() {
  return (
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]}>12h15</AppText>

      <View style={styles.cardWrapper}>
        <Pressable
          android_ripple={{ color: theme.colors["black/10"] }}
          style={({ pressed }) => [
            styles.card,
            pressed && Platform.OS === "ios" && { opacity: 0.5 },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.icon}>
              <AppText>🍞</AppText>
            </View>

            <View style={styles.mealTitle}>
              <AppText
                color={theme.colors.gray[700]}
                size="sm"
                numberOfLines={1}
              >
                Café da manhã
              </AppText>

              <AppText weight="medium" numberOfLines={2}>
                Pão, manteiga
              </AppText>
            </View>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.mealStatRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.tomato} weight="medium">
                  200
                </AppText>

                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.teal} weight="medium">
                  5g
                </AppText>

                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
            </View>

            <View style={styles.mealStatRow}>
              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.yellow} weight="medium">
                  200
                </AppText>

                <AppText color={theme.colors.gray[700]}>Carboídratos</AppText>
              </View>

              <View style={styles.mealStat}>
                <AppText color={theme.colors.support.orange} weight="medium">
                  5g
                </AppText>

                <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
