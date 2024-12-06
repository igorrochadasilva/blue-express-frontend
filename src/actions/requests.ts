'use server';

import { TUser } from '../types/global/types';
import { generateRequestFormData } from '../libs/utils';
import { revalidateTag } from 'next/cache';
import { fetchData } from '../libs/FetchData';

export async function getRequest(requestType: string, id: string) {
  const res = await fetchData({
    router: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/${requestType}/${id}`,
    method: 'GET',
    tag: [`request-${id}-tag`],
  });

  if (res.ok) {
    const data = await res?.json();
    return { data: data };
  } else {
    throw res;
  }
}

export async function updateRequest(
  user: TUser,
  requestType: string,
  data: any
) {
  const { files, ...requestData } = data;
  const newFormData = new FormData();
  const arrayFiles = Array.from(files);

  const formatData = generateRequestFormData(requestType, requestData);

  formatData.filesName = '';

  formatData.filesName = formatData.filesName.slice(0, -1);

  newFormData.append('data', JSON.stringify(formatData));

  const res = await fetchData({
    router: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/${requestType}/${requestData.id}`,
    method: 'PUT',
    params: {
      user: user?.id,
    },
    body: newFormData,
    tag: [`request-${requestData.id}-tag`],
  });
  const responseData = await res.json();

  if (res.ok) {
    revalidateTag(`request-${requestData.id}-tag`);
    revalidateTag('requests-tag');
    return res.ok;
  } else {
    throw responseData;
  }
}
