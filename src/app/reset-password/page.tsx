'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import Container from '../../components/Global/Container/Container';
import { useSearchParams } from 'next/navigation';
import { handleResetPassword } from '../../actions/auth/handleResetPassword';
import { ResetPassword } from '../../components/Pages/ResetPassword';

type ResetInput = {
  password: string;
};

export default function PageResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>();

  const onSubmitLogin: SubmitHandler<ResetInput> = async (data) => {
    const { password } = data;
    const response = await handleResetPassword({ password, token });
  };

  return (
    <Container bgColor="bg-gray-400" showSideMenu={false} isLoginPage={true}>
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
    </Container>
  );
}
