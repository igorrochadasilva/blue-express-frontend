'use client';

import { UseFormRegister } from 'react-hook-form';
import { INewApproverData } from '../../../../types/global/types';

type TInput = {
  labelText: string;
  inputName: any;
  inputType: string | undefined;
  inputValue?: string | number;
  validationSchema?: any;
  readonly: boolean | undefined;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  register: UseFormRegister<INewApproverData>;
};

const Input = ({
  inputName,
  inputType,
  validationSchema,
  labelText,
  readonly = false,
  required = false,
  placeholder,
  pattern,
  register,
}: TInput) => {
  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}
      <input
        type={inputType}
        className="rounded border-[1px] py-1 px-2 mt-2"
        {...register(inputName, validationSchema)}
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
