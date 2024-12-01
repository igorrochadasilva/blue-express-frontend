'use server';

import { ForgetPasswordResponse } from '../../types/auth/forgetPassword';
import { api } from '../api';

export async function handleForgetPassword(
  email: string
): Promise<ForgetPasswordResponse> {
  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/auth/forget`,
      options: {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
      },
      ignoreCache: true,
    });

    return response;
  } catch (error) {
    return error as ForgetPasswordResponse;
  }
}
