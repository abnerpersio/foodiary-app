import { Meal } from "@/app/types/Meal";

const PROTEINS_MULTIPLIER = 4;
const CARBOHYDRATES_MULTIPLIER = 4;
const FATS_MULTIPLIER = 9;

// TODO: move this percentage calculate to API and return percentages from API
// and remove this util
export const getFoodCaloriesSummary = (food: Meal.Food) => {
  const proteinsCalories = food.proteins * PROTEINS_MULTIPLIER;
  const carbohydratesCalories = food.carbohydrates * CARBOHYDRATES_MULTIPLIER;
  const fatsCalories = food.fats * FATS_MULTIPLIER;
  const calories = Math.round(
    proteinsCalories + carbohydratesCalories + fatsCalories,
  );

  return {
    proteins: proteinsCalories,
    carbohydrates: carbohydratesCalories,
    fats: fatsCalories,
    total: calories,
  };
};
