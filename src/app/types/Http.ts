import { ErrorCode } from "./ErrorCode";

export type ErrorResponse = {
  error?: {
    code?: ErrorCode | string;
  };
};
