import { ActivityLevel } from "../types/ActivityLevel";
import { Gender } from "../types/Gender";
import { Goal } from "../types/Goal";
import { HttpService } from "./HttpService";

export class ProfileService extends HttpService {
  static async updateProfile(
    params: ProfileService.UpdateProfileParams,
  ): Promise<void> {
    await this.client.put("/profile", params);
  }

  static async createProfile(
    params: ProfileService.CreateProfileParams,
  ): Promise<void> {
    await this.client.post("/profile", params);
  }
}

export namespace ProfileService {
  export type UpdateProfileParams = {
    name: string;
    birthDate: string;
    gender: Gender;
    weight: number;
    height: number;
  };

  export type CreateProfileParams = {
    name: string;
    birthDate: string;
    height: number;
    weight: number;
    gender: Gender;
    activityLevel: ActivityLevel;
    goal: Goal;
  };
}
