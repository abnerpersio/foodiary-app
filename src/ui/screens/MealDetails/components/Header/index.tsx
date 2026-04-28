import { ImageBackground, StatusBar, View } from "react-native";

import { Meal } from "@/app/types/Meal";
import { AppText } from "@/ui/components/AppText";
import { Button } from "@/ui/components/Button";
import { theme } from "@/ui/styles/theme";
import { getFoodCaloriesSummary } from "@/ui/utils/food";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeftIcon } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type HeaderProps = {
  meal: Meal | undefined;
  isLoading: boolean;
};

export function Header({ meal, isLoading }: HeaderProps) {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const isImageInput = meal?.inputType === Meal.InputType.PICTURE;

  const summary = useMemo(
    () =>
      (meal?.foods || []).reduce(
        (acc, food) => {
          const calories = getFoodCaloriesSummary(food);

          return {
            proteins: acc.proteins + food.proteins,
            carbohydrates: acc.carbohydrates + food.carbohydrates,
            fats: acc.fats + food.fats,
            calories: {
              proteins: acc.calories.proteins + calories.proteins,
              carbohydrates:
                acc.calories.carbohydrates + calories.carbohydrates,
              fats: acc.calories.fats + calories.fats,
              total: acc.calories.total + calories.total,
            },
          };
        },
        {
          calories: {
            proteins: 0,
            carbohydrates: 0,
            fats: 0,
            total: 0,
          },
          proteins: 0,
          carbohydrates: 0,
          fats: 0,
        },
      ),
    [meal?.foods],
  );

  const percentages = useMemo(() => {
    if (summary.calories.total === 0) {
      return { proteins: 0, carbohydrates: 0, fats: 0 };
    }

    const percents = {
      proteins: Math.round(
        (summary.calories.proteins / summary.calories.total) * 100,
      ),
      carbohydrates: Math.round(
        (summary.calories.carbohydrates / summary.calories.total) * 100,
      ),
      fats: Math.round((summary.calories.fats / summary.calories.total) * 100),
    };

    return percents;
  }, [summary]);

  return (
    <>
      <StatusBar animated translucent barStyle="light-content" />

      <View style={styles.container}>
        {isImageInput && (
          <ImageBackground
            source={{ uri: meal.inputFileUrl }}
            style={styles.image}
          >
            <LinearGradient
              style={[styles.overlay, { paddingTop: Math.max(top, 24) + 8 }]}
              colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 1 }}
            >
              <BlurView style={styles.blurContainer}>
                <Button onPress={goBack} size="icon" variant="ghost">
                  <ChevronLeftIcon size={20} color={theme.colors.white} />
                </Button>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        )}

        <View
          style={[
            styles.content,
            !isImageInput && { marginTop: Math.max(top, 24) },
          ]}
        >
          <View
            style={[
              styles.pageTitleContainer,
              isImageInput && { paddingLeft: 16 },
            ]}
          >
            {!isImageInput && (
              <Button onPress={goBack} size="icon" variant="ghost">
                <ChevronLeftIcon size={20} color={theme.colors.white} />
              </Button>
            )}

            <AppText weight="medium" color={theme.colors.gray[300]}>
              Refeição
            </AppText>
          </View>

          <View style={styles.caloriesContainer}>
            <AppText color={theme.colors.gray[300]}>Calorias</AppText>

            <Skeleton width={61} height={24} colorMode="dark">
              {isLoading ? null : (
                <AppText color={theme.colors.white} weight="medium">
                  {summary.calories.total}kcal
                </AppText>
              )}
            </Skeleton>
          </View>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Proteínas</AppText>

          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.teal}>
                {summary.proteins} ({percentages.proteins}%)
              </AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Carboídratos</AppText>

          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.yellow}>
                {summary.carbohydrates} ({percentages.carbohydrates}%)
              </AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Gorduras</AppText>

          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.orange}>
                {summary.fats} ({percentages.fats}%)
              </AppText>
            )}
          </Skeleton>
        </View>
      </View>

      <View style={styles.macrosProgressContainer}>
        <Skeleton width="100%" height={4} colorMode="light">
          {isLoading ? null : (
            <View style={styles.macrosProgress}>
              <View
                style={[
                  styles.progress,
                  {
                    backgroundColor: theme.colors.support.teal,
                    width: `${percentages.proteins}%`,
                  },
                ]}
              />
              <View
                style={[
                  styles.progress,
                  {
                    backgroundColor: theme.colors.support.yellow,
                    width: `${percentages.carbohydrates}%`,
                  },
                ]}
              />
              <View
                style={[
                  styles.progress,
                  {
                    backgroundColor: theme.colors.support.orange,
                    width: `${percentages.fats}%`,
                  },
                ]}
              />
            </View>
          )}
        </Skeleton>
      </View>

      <View style={styles.divider} />

      <View style={styles.mealNameContainer}>
        <Skeleton width="50%" height={24} colorMode="light">
          {isLoading ? null : (
            <AppText size="xl" weight="semiBold" style={styles.mealName}>
              {meal?.name}
            </AppText>
          )}
        </Skeleton>
      </View>

      <AppText
        color={theme.colors.gray[700]}
        weight="medium"
        style={styles.mealItemsHeader}
      >
        Items
      </AppText>
    </>
  );
}
