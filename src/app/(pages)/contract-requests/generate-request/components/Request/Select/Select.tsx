'use client';

import {
  RegisterOptions,
  FieldValues,
  Path,
  useFormContext,
} from 'react-hook-form';
import { SelectOptions } from '@/types/approvers/newApprover';

type SelectProps<TFormValues extends FieldValues> = {
  labelText: string;
  inputName: Path<TFormValues>;
  validation?: RegisterOptions<TFormValues, Path<TFormValues>>;
  required?: boolean;
  readonly?: boolean;
  options?: SelectOptions[];
};

const Select = <TFormValues extends FieldValues>({
  labelText,
  inputName,
  validation,
  required = false,
  options,
}: SelectProps<TFormValues>) => {
  const { register } = useFormContext<TFormValues>();
  return (
    <label htmlFor={String(inputName)} className="flex flex-col flex-1 mb-2">
      {labelText}
      <select
        {...register(inputName, validation)}
        name={String(inputName)}
        required={required}
        className="rounded border-[1px] py-1 px-2 mt-2"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
