'use server';

import { ErrorResponse } from '../types/error';

type FetchOptions = RequestInit;
type QueryParams = Record<string | number, string | number | boolean | null>;

interface APIProps {
  endpoint: string;
  options?: FetchOptions;
  params?: QueryParams;
  ignoreCache?: boolean;
  revalidateTag?: string;
}

export async function api({
  endpoint,
  options,
  params,
  ignoreCache,
  revalidateTag,
}: APIProps) {
  const url = new URL(endpoint);

  let headers: HeadersInit = {
    Accept: 'application/json',
    ...options?.headers,
  };

  if (!(options?.body instanceof FormData)) {
    headers = {
      ...headers,
      'Content-Type': 'application/json',
    };
  }

  const normalizedOptions: RequestInit = {
    ...options,
    headers,
    ...(ignoreCache
      ? { cache: 'no-store' }
      : {
          next: {
            tags: revalidateTag ? [revalidateTag] : undefined,
          },
        }),
  };

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const result = await fetch(url.toString(), normalizedOptions);
    if (!result.ok) {
      const errorDetails = (await result.json()) as { message: string };

      throw {
        statusCode: result.status,
        message: errorDetails.message,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await result.json();

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: data,
      statusCode: result.status,
    };
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    console.error('Fetch failed:', {
      endpoint: url.toString(),
      options: normalizedOptions,
      error: error.message,
    });

    throw error;
  }
}
