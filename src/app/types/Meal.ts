export type Meal = {
  id: string;
  createdAt: Date;
  name: string;
  icon: string;
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};

enum MealInputTypeEnum {
  AUDIO = "AUDIO",
  PICTURE = "PICTURE",
}
export const MealInputType = MealInputTypeEnum;
export type MealInputType = `${MealInputTypeEnum}`;
