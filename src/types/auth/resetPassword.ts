import { ErrorResponse } from '../error';

export interface ResetPasswordDTO {
  password: string;
  token: string | null;
}

export interface ResetPasswordResponse extends ErrorResponse {
  data: {
    message: string;
  };
  statusCode: number;
}

export type ResetInput = {
  password: string;
};
