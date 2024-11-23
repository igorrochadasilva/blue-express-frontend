'use server';

import { IRequestBody, TUser } from '../types/global/types';
import { generateRequestFormData } from '../libs/utils';
import { revalidateTag } from 'next/cache';
import { fetchData } from '../libs/FetchData';

export async function listRequests(
  requestType: string,
  email: string | null | undefined,
  role: number | undefined
) {
  const res = await fetchData({
    router: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/${requestType}`,
    method: 'GET',
    params: {
      email,
      role,
    },
    tag: ['requests-tag'],
  });

  if (res.ok) {
    const data = await res.json();
    return { status: 200, data: data, message: 'successful' };
  } else {
    throw res;
  }
}

export async function createRequest(
  requestType: string,
  data: IRequestBody,
  user: TUser
) {
  const { files, ...dataRest } = data;

  const formatData = generateRequestFormData(requestType, dataRest, user);
  formatData.filesName = '';

  const newFormData = new FormData();
  const arrayFiles = Array.from(files);

  arrayFiles.forEach((file: any) => {
    newFormData.append(file.name, file);
    formatData.filesName += file.name + ',';
  });

  formatData.filesName = formatData.filesName.slice(0, -1);

  newFormData.append('data', JSON.stringify(formatData));

  const res = await fetchData({
    router: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/request/${requestType}`,
    method: 'POST',
    body: newFormData,
    token: user?.accessToken,
  });
  console.log('create new request', res);
  if (res.ok) {
    revalidateTag('requests-tag');

    return res;
  } else {
    throw res;
  }
}

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
  data: IRequestBody
) {
  const { files, ...requestData } = data;
  const newFormData = new FormData();
  const arrayFiles = Array.from(files);

  const formatData = generateRequestFormData(requestType, requestData);

  formatData.filesName = '';

  arrayFiles.forEach((file: any) => {
    newFormData.append(file.name, file);
    formatData.filesName += file.name + ',';
  });

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
  console.log('🚀 ~ updateRequest ~ res:', responseData);
  if (res.ok) {
    revalidateTag(`request-${requestData.id}-tag`);
    revalidateTag('requests-tag');
    return res.ok;
  } else {
    throw responseData;
  }
}
