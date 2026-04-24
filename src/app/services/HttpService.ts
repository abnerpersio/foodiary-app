import axios, { isAxiosError } from "axios";
import { Env } from "../config/env";

export abstract class HttpService {
  private static refreshTokenInterceptorId: number | undefined;

  protected static client = axios.create({
    baseURL: Env.apiBaseUrl,
  });

  static setAccessToken(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  static removeAccessToken() {
    this.client.defaults.headers.common.Authorization = undefined;
  }

  static setRefreshTokenHandler(refreshHandler: () => Promise<void>) {
    this.removeRefreshTokenHandler();

    const interceptorId = this.client.interceptors.response.use(
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

    this.refreshTokenInterceptorId = interceptorId;
  }

  static removeRefreshTokenHandler() {
    if (this.refreshTokenInterceptorId !== undefined) {
      this.client.interceptors.response.eject(this.refreshTokenInterceptorId);
      this.refreshTokenInterceptorId = undefined;
    }
  }
}
