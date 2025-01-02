import { ErrorResponse } from '../error';

export interface SignInDTO {
  email: string;
  password?: string;
}

export interface UserSession {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  role: number;
  accessToken: string;
}

export interface PostSignInResponse extends ErrorResponse {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
      department: string;
      position: string;
      createdAt: string;
      updatedAt: string;
      role: number;
    };
    token: string;
  };
  statusCode: number;
}
