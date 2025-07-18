'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleResetPassword } from '../../actions/auth/handleResetPassword';
import { ResetPassword } from '../../components/Pages/ResetPassword';
import { notifyMessage } from '../../toast/notifications';
import messages from '../../messages/messages';
import { useState } from 'react';
import { ResetInput } from '../../types/auth/resetPassword';
import Loading from '../../components/Global/Loading/loading';

export default function PageResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>();

  const onSubmitLogin: SubmitHandler<ResetInput> = async (data) => {
    setLoading(true);
    if (!token)
      notifyMessage({
        message: messages.auth.reset_password_token_error,
        statusCode: 400,
      });

    const { password } = data;
    const response = await handleResetPassword({ password, token });

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response.statusCode,
    });

    if (response?.statusCode === 201) return router.push('/');
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <ResetPassword.Root>
      <ResetPassword.IconClose />
      <ResetPassword.Form onSubmitLogin={handleSubmit(onSubmitLogin)}>
        <ResetPassword.LogoImg />
        <ResetPassword.Content>
          <ResetPassword.Text />
          <ResetPassword.Input
            inputName="password"
            inputType="password"
            labelText="Enter with your new password."
            message="min length is 6"
            errors={errors}
            minLength={6}
            register={register}
          />
          <ResetPassword.Button />
        </ResetPassword.Content>
      </ResetPassword.Form>
    </ResetPassword.Root>
  );
}
