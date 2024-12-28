import { ResetPassword } from './components/ResetPassword';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams?.token || '';

  return <ResetPassword token={token} />;
}
