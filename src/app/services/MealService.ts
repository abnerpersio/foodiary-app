import { Meal } from "../types/Meal";
import { HttpService } from "./HttpService";

export class MealService extends HttpService {
  static async getMealsByDate(
    date: string,
  ): Promise<MealService.GetMealsByDateResponse> {
    const { data } =
      await this.client.get<MealService.GetMealsByDateHttpResponse>("/meals", {
        params: { date },
      });

    return {
      meals: data.meals.map((meal) => ({
        ...meal,
        createdAt: new Date(meal.createdAt),
      })),
    };
  }
}

export namespace MealService {
  export type GetMealsByDateHttpResponse = {
    meals: {
      id: string;
      createdAt: string;
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
    }[];
  };

  export type GetMealsByDateResponse = {
    meals: Meal[];
  };
}
