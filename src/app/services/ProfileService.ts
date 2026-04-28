import { Gender } from "../types/Gender";
import { HttpService } from "./HttpService";

export class ProfileService extends HttpService {
  static async updateProfile(
    params: ProfileService.UpdateProfileParams,
  ): Promise<void> {
    await this.client.put("/profile", params);
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
}
