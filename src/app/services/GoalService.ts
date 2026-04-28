import { HttpService } from "./HttpService";

export class GoalService extends HttpService {
  static async updateGoals(
    params: GoalService.UpdateGoalsParams,
  ): Promise<void> {
    await this.client.put("/goals", params);
  }
}

export namespace GoalService {
  export type UpdateGoalsParams = {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };
}
