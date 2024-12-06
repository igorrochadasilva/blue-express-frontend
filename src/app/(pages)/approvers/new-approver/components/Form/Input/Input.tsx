'use client';

import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { PostApproverDTO } from '@/types/approvers/approvers';

interface InputProps {
  labelText: string;
  inputName: keyof PostApproverDTO;
  inputType: string | undefined;
  inputValue?: string | number;
  validation?: RegisterOptions<PostApproverDTO, keyof PostApproverDTO>;
  readonly: boolean | undefined;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  register: UseFormRegister<PostApproverDTO>;
}

const Input = ({
  inputName,
  inputType,
  validation,
  labelText,
  readonly = false,
  required = false,
  placeholder,
  pattern,
  register,
}: InputProps) => {
  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}
      <input
        type={inputType}
        className="rounded border-[1px] py-1 px-2 mt-2"
        {...register(inputName, validation)}
        name={inputName}
        readOnly={readonly}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        multiple={inputType === 'file' ? true : undefined}
      />
    </label>
  );
};

export default Input;
