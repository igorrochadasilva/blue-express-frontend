'use server';

import { api } from '../api';

interface PostFilesProps {
  formData: FormData;
}

export async function postFiles({ formData }: PostFilesProps) {
  try {
    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/upload`,
      options: {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}
