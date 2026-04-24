import { ActivityLevel } from "../types/ActivityLevel";
import { Gender } from "../types/Gender";
import { Goal } from "../types/Goal";
import { HttpService } from "./HttpService";

export class AuthService extends HttpService {
  static async signIn(params: AuthService.SignInParams) {
    const { data } = await this.client.post<AuthService.SignInResponse>(
      "/sign-in",
      params,
    );
    return data;
  }

  static async signUp(params: AuthService.SignUpParams) {
    const { data } = await this.client.post<AuthService.SignUpResponse>(
      "/sign-up",
      params,
    );
    return data;
  }

  static async refreshToken(params: AuthService.RefreshTokenParams) {
    const { data } = await this.client.post<AuthService.RefreshTokenResponse>(
      "/refresh-token",
      params,
    );
    return data;
  }
}

export namespace AuthService {
  export type SignInParams = {
    email: string;
    password: string;
  };

  export type SignInResponse = {
    accessToken: string;
    refreshToken: string;
  };

  export type SignUpParams = {
    account: {
      email: string;
      password: string;
    };
    profile: {
      name: string;
      birthDate: string;
      height: number;
      weight: number;
      gender: Gender;
      goal: Goal;
      activityLevel: ActivityLevel;
    };
  };

  export type SignUpResponse = {
    accessToken: string;
    refreshToken: string;
  };

  export type RefreshTokenParams = {
    refreshToken: string;
  };

  export type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
  };
}
