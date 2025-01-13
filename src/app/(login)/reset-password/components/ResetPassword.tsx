'use client';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ResetInput } from '@/types/auth/resetPassword';
import { handleResetPassword } from '@/services/auth/handleResetPassword';
import { Loading } from '@/components/Loading/loading';

import { notifyMessage } from '@/utils/notifyMessage';
import { messages } from '@/utils/messages';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/schemas/resetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { Root } from '../../components/Root';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ResetPasswordProps {
  token: string;
}

export const ResetPassword = ({ token }: ResetPasswordProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ResetInput> = async (data) => {
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
    <Root>
      <Link href={'/'}>
        <XMarkIcon className="absolute right-0 top-0 h-6 w-6 text-slate-800 text-end cursor-pointer" />
      </Link>
      <Image
        src="/eaton_logo.svg"
        width={150}
        height={150}
        alt="Logo"
        priority={true}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-[300]"
        >
          <FormDescription className="mt-4 text-center text-be_second_color text-lg font-bold">
            Reset Password
          </FormDescription>

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
          <Button
            type="submit"
            variant={'blue'}
            size={'lg'}
            className="rounded my-4 block w-full"
          >
            Send
          </Button>
        </form>
      </Form>
    </Root>
  );
};
