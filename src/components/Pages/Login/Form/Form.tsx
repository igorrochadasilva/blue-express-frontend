import { FormEventHandler, ReactNode } from 'react';

type LoginInputs = {
  email: string;
  password: string;
};

interface IFormProps {
  onSubmitLogin: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export function Form({ onSubmitLogin, children }: IFormProps) {
  return (
    <form onSubmit={onSubmitLogin} className="px-12 py-6">
      {children}
    </form>
  );
}
