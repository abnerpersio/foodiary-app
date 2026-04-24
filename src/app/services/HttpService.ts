import axios from "axios";
import { Env } from "../config/env";

export abstract class HttpService {
  protected static client = axios.create({
    baseURL: Env.apiBaseUrl,
  });

  static setAccessToken(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  static removeAccessToken() {
    this.client.defaults.headers.common.Authorization = undefined;
  }
}
