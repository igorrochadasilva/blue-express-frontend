'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SignInDTO } from '@/types/auth/sign';
import { notifyMessage } from '@/toast/notifications';
import Loading from '@/components/Global/Loading/loading';
import { handleForgetPassword } from '@/actions/auth/handleForgetPassword';
import { Login } from './components';

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDTO>();

  const handleShowForgetPassword = () =>
    setShowForgetPassword(!showForgetPassword);

  const handleLogin = async (data: SignInDTO) => {
    const { email, password } = data;
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.status === 200) return router.push('/dashboard');

    notifyMessage({
      message: res?.error as string,
      statusCode: res?.status,
    });
    setIsLoading(false);
  };

  const onSubmitForm: SubmitHandler<SignInDTO> = async (data) => {
    setIsLoading(true);

    if (!showForgetPassword) return handleLogin(data);

    const response = await handleForgetPassword(data.email);

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response.statusCode,
    });

    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Login.Root>
      {showForgetPassword && (
        <Login.IconClose
          handleShowForgetPassword={handleShowForgetPassword}
          showForgetPassword
        />
      )}
      <Login.Form onSubmitLogin={handleSubmit(onSubmitForm)}>
        <Login.LogoImg />
        <Login.Content>
          {showForgetPassword && <Login.ForgetPasswordMsg />}
          <Login.Input
            inputName="email"
            inputType="email"
            labelText="E-mail"
            message="Entered value does not match email format"
            patternValue={/\S+@\S+\.\S+/}
            errors={errors}
            register={register}
          />
          {!showForgetPassword && (
            <Login.Input
              inputName="password"
              inputType="password"
              labelText="Password"
              message="Entered value does not match password format"
              errors={errors}
              register={register}
            />
          )}
          <Login.Button showForgetPassword={showForgetPassword} />
          {!showForgetPassword && (
            <Login.ForgetButton
              handleShowForgetPassword={handleShowForgetPassword}
            />
          )}
        </Login.Content>
      </Login.Form>
    </Login.Root>
  );
}
