'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SignInDTO } from '@/types/auth/sign';

import { Loading } from '@/components/Loading/loading';
import { handleForgetPassword } from '@/actions/auth/handleForgetPassword';
import { notifyMessage } from '@/utils/notifyMessage';
import { Button } from '@/components/ui/button';
import { IconClose } from './components/IconClose/IconClose';
import { Root } from './components/Root/Root';
import { Form } from './components/Form/Form';
import { LogoImg } from './components/LogoImg/LogoImg';
import { Content } from './components/Content/Content';
import { ForgetPasswordMsg } from './components/ForgetPasswordMsg/ForgetPasswordMessage';
import { Input } from './components/Input/Input';
import { ForgetButton } from './components/ForgetButton/ForgetButton';

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
    <Root>
      {showForgetPassword && (
        <IconClose
          handleShowForgetPassword={handleShowForgetPassword}
          showForgetPassword
        />
      )}
      <Form onSubmitLogin={handleSubmit(onSubmitForm)}>
        <LogoImg />
        <Content>
          {showForgetPassword && <ForgetPasswordMsg />}
          <Input
            inputName="email"
            inputType="email"
            labelText="E-mail"
            message="Entered value does not match email format"
            patternValue={/\S+@\S+\.\S+/}
            errors={errors}
            register={register}
          />
          {!showForgetPassword && (
            <Input
              inputName="password"
              inputType="password"
              labelText="Password"
              message="Entered value does not match password format"
              errors={errors}
              register={register}
            />
          )}
          <Button
            type="submit"
            variant={'blue'}
            size={'lg'}
            className="rounded my-4"
          >
            {showForgetPassword ? 'Continue' : 'Log in'}
          </Button>

          {!showForgetPassword && (
            <ForgetButton handleShowForgetPassword={handleShowForgetPassword} />
          )}
        </Content>
      </Form>
    </Root>
  );
}
