import axios from 'axios';
import { notifyDefaultError, notifyError } from '../toast/notifications';

export async function listUsers(token: string | undefined) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: 200, data: res.data, message: 'successful' };
  } catch (e) {
    const error: any = e;
    if (error.response?.data.message) {
      return { status: 400, data: null, message: error.response.data.message };
    } else {
      return {
        status: 500,
        data: null,
        message: 'An error occurred. Please try again later.',
      };
    }
  }
}

export async function getUser(
  id: number | undefined,
  token: string | undefined,
  approvers: boolean
) {
  const queryApprovers = approvers && '?approvers=true';

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/users/${id}${queryApprovers}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data) {
      return res.data;
    } else {
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
