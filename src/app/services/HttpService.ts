import axios from "axios";
import { Env } from "../config/env";

export abstract class HttpService {
  protected client = axios.create({
    baseURL: Env.apiBaseUrl,
  });
}
