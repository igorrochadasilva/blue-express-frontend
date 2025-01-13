'use server';

import {
  ResetPasswordDTO,
  ResetPasswordResponse,
} from '../../types/auth/resetPassword';
import { api } from '../api';

export async function handleResetPassword({
  password,
  token,
}: ResetPasswordDTO): Promise<ResetPasswordResponse> {
  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/auth/reset`,
      ignoreCache: true,
      options: {
        method: 'POST',
        body: JSON.stringify({
          password,
          token,
        }),
      },
    });

    return response;
  } catch (error) {
    return error as ResetPasswordResponse;
  }
}
