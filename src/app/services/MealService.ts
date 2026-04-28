import { Meal, SimplifiedMeal } from "../types/Meal";
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

  static async getMeal(id: string): Promise<MealService.GetMealResponse> {
    const { data } = await this.client.get<MealService.GetMealHttpResponse>(
      `/meals/${id}`,
    );

    return {
      ...data,
      createdAt: new Date(data.createdAt),
    };
  }

  static async createMeal(
    params: MealService.CreateMealParams,
  ): Promise<MealService.CreateMealResponse> {
    const { data } = await this.client.post<MealService.CreateMealHttpResponse>(
      "/meals",
      params,
    );

    await this.uploadPresignedPOST({
      uploadSignature: data.uploadSignature,
      file: {
        name: params.file.name,
        type: params.file.type,
        uri: params.file.uri,
      },
    });

    return { mealId: data.mealId };
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
    meals: SimplifiedMeal[];
  };

  export type GetMealHttpResponse = Meal & {
    createdAt: string;
  };

  export type GetMealResponse = Meal;

  export type CreateMealParams = {
    file: {
      type: "audio/m4a" | "image/jpeg" | "image/png";
      size: number;
      uri: string;
      name: string;
    };
  };

  export type CreateMealHttpResponse = {
    mealId: string;
    uploadSignature: string;
  };

  export type CreateMealResponse = {
    mealId: string;
  };
}
