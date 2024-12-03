import { FormEventHandler, ReactNode } from 'react';

interface IFormProps {
  onSubmitLogin: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export function Form({ onSubmitLogin, children }: IFormProps) {
  return (
    <form onSubmit={onSubmitLogin} className="px-12 py-6" action="">
      {children}
    </form>
  );
}
