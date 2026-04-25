import { Gender } from "../types/Gender";
import { Goal } from "../types/Goal";
import { HttpService } from "./HttpService";

export class AccountService extends HttpService {
  static async getMe() {
    const { data } = await this.client.get<AccountService.GetMeResponse>("/me");

    return {
      ...data,
      profile: {
        ...data.profile,
        birthDate: new Date(data.profile.birthDate),
      },
    };
  }
}

export namespace AccountService {
  export type GetMeResponse = {
    profile: {
      name: string;
      birthDate: string;
      gender: Gender;
      height: number;
      weight: number;
      goal: Goal;
    };
    goal: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    };
  };
}
