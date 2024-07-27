import { ErrorCode } from "../constants/errorCode.constant";

export interface ErrorResponse {
    status: number;
    code: keyof typeof ErrorCode;
    path: number;
    method: string;
    timeStamp: string;
    message: string;
  }
  