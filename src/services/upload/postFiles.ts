'use server';

import { api } from '../api';
import { getUserSession } from '../auth/getUserSession';
import { RequestsKeyEnum, RequestsTitleEnum } from '@/types/requests/enums';

interface PostFilesProps {
  files: File[];
  additionalData: {
    contractId: string;
    requestAcronym: RequestsKeyEnum;
    contractType: RequestsTitleEnum;
  };
}

export async function postFiles({ files, additionalData }: PostFilesProps) {
  try {
    const user = await getUserSession();
    const formData = new FormData();

    files?.forEach((file) => {
      formData.append('files', file);
    });

    Object.entries({
      userId: String(user.id),
      ...additionalData,
    }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log('🚀 ~ postFiles ~ formData:', formData);

    const response = await api({
      endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/upload`,
      options: {
        method: 'POST',
        body: formData,
      },
    });
    console.log('🚀 ~ postFiles ~ response:', response);

    return response;
  } catch (error) {
    return error;
  }
}
