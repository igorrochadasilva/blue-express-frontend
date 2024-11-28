import { ErrorResponse } from '../error';

export interface ForgetPasswordResponse extends ErrorResponse {
  data: {
    message: string;
  };
  statusCode: number;
}
