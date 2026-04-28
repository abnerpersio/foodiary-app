import axios, { isAxiosError } from "axios";
import base64 from "react-native-base64";
import { Env } from "../config/env";

export abstract class HttpService {
  private static tokenInterceptorId: number | undefined;
  private static refreshTokenInterceptorId: number | undefined;

  private static accessToken: string | undefined;

  protected static client = axios.create({
    baseURL: Env.apiBaseUrl,
  });

  static setAccessToken(token: string) {
    this.accessToken = token;

    this.removeTokenHandler();
    this.tokenInterceptorId = this.client.interceptors.request.use((config) => {
      if (!this.accessToken) return config;
      config.headers.set("Authorization", `Bearer ${this.accessToken}`);
      return config;
    });
  }

  static removeAccessToken() {
    this.accessToken = undefined;
    this.removeTokenHandler();
  }

  static setRefreshTokenHandler(refreshHandler: () => Promise<void>) {
    this.removeRefreshTokenHandler();

    this.refreshTokenInterceptorId = this.client.interceptors.response.use(
      null,
      async (error) => {
        if (
          !isAxiosError(error) ||
          error.response?.status !== 401 ||
          !error.config ||
          error.config.url === "/refresh-token"
        ) {
          return Promise.reject(error);
        }

        await refreshHandler();
        return this.client(error.config);
      },
    );
  }

  static removeRefreshTokenHandler() {
    if (this.refreshTokenInterceptorId !== undefined) {
      this.client.interceptors.response.eject(this.refreshTokenInterceptorId);
      this.refreshTokenInterceptorId = undefined;
    }
  }

  static removeTokenHandler() {
    if (this.tokenInterceptorId !== undefined) {
      this.client.interceptors.request.eject(this.tokenInterceptorId);
      this.tokenInterceptorId = undefined;
    }
  }

  static async uploadPresignedPOST({
    file,
    uploadSignature,
  }: HttpService.UploadPresignedPostParams) {
    const decoded = base64.decode(uploadSignature);
    const { url, fields } = JSON.parse(decoded) as HttpService.DecodedSignature;

    const formData = new FormData();

    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }

    formData.append("file", file as any);

    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export namespace HttpService {
  export type UploadPresignedPostParams = {
    uploadSignature: string;
    file: {
      name: string;
      type: string;
      uri: string;
    };
  };

  export type DecodedSignature = {
    url: string;
    fields: Record<string, string>;
  };
}
