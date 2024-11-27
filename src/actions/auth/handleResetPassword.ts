import messages from '../../messages/messages';
import {
  notifyDefaultError,
  notifyError,
  notifySuccess,
} from '../../toast/notifications';
import { api } from '../api';

interface IResetPassword {
  password: string;
  token: string;
}

export async function handleResetPassword({ password, token }: IResetPassword) {
  if (!token) notifyError(messages.auth.reset_password_token_error);

  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/auth/reset`,
      ignoreCache: true,
      options: {
        method: 'POST',
      },
      params: {
        password,
        token,
      },
    });

    if (response.data.message) {
      notifySuccess(response.data.message);
      return true;
    } else {
      notifyDefaultError();
      return false;
    }
  } catch (e) {
    const error: any = e;
    if (error.response?.data.message) {
      notifyError(error.response.data.message);
      return false;
    } else {
      notifyDefaultError();
      return false;
    }
  }
}
