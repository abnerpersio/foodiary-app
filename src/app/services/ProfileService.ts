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

  static async uploadPicture(params: ProfileService.UploadPictureParams) {
    const { data } =
      await this.client.post<ProfileService.UploadPictureHttpResponse>(
        "/profile/picture",
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

  export type UploadPictureParams = {
    file: {
      type: "image/jpeg" | "image/png";
      size: number;
      uri: string;
      name: string;
    };
  };

  export type UploadPictureHttpResponse = {
    uploadSignature: string;
  };
}
