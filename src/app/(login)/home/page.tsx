'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SignInDTO } from '@/types/auth/sign';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/Loading/loading';
import { handleForgetPassword } from '@/services/auth/handleForgetPassword';
import { notifyMessage } from '@/utils/notifyMessage';
import { Button } from '@/components/ui/button';
import { Root } from '../components/Root';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { loginSchema, LoginSchema } from '@/schemas/login';

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState<boolean>(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema(showForgetPassword)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

  const onSubmit: SubmitHandler<SignInDTO> = async (data) => {
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
        <XMarkIcon
          onClick={handleShowForgetPassword}
          className={`absolute right-0 top-0 h-6 w-6 text-slate-800 text-end cursor-pointer ${showForgetPassword ? 'block' : 'hidden'}`}
        />
      )}
      <Image
        src="/eaton_logo.svg"
        width={150}
        height={150}
        alt="Logo"
        priority
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-[300]"
        >
          {showForgetPassword && (
            <FormDescription className="mt-4 text-center text-be_second_color text-base">
              Enter your email and we will send you instructions to reset your
              password.
            </FormDescription>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="email"
                    id="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!showForgetPassword && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="password"
                      id="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            variant={'blue'}
            size={'lg'}
            className="rounded my-4 block w-full"
          >
            {showForgetPassword ? 'Continue' : 'Log in'}
          </Button>
          {!showForgetPassword && (
            <Button
              className="w-full"
              variant={'link'}
              onClick={handleShowForgetPassword}
            >
              Forgot password?
            </Button>
          )}
        </form>
      </Form>
    </Root>
  );
}
