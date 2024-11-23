'use client';

import ErrorComponent from '../../../components/Global/Error/Error';
interface IError {
  error: Error & { digest?: string };
}

export default function Error({ error }: IError) {
  return <ErrorComponent message={error.message} />;
}
