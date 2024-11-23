'use server';

interface IFetchData {
  router: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: FormData | any;
  params?: any;
  tag?: string[];
  token?: string;
}

export const fetchData = async ({
  router,
  method,
  body,
  params,
  tag,
  token,
}: IFetchData): Promise<Response | any> => {
  const urlSearchParams = new URLSearchParams(params);
  const urlSearchParamsString = urlSearchParams?.toString();
  const buildRouter = `${router}${urlSearchParamsString ? `?${urlSearchParamsString}` : ''}`;
  const buildHeaders = {
    Authorization: token ? `Bearer ${token}` : '',
  };

  try {
    const res = await fetch(buildRouter, {
      method,
      headers: buildHeaders,
      body,
      cache: 'force-cache',
      next: { tags: tag },
    });

    return res;
  } catch (error) {
    return error;
  }
};
