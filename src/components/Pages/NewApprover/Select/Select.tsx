'use client';

import { UseFormRegister } from 'react-hook-form';
import { INewApproverData } from '../../../../types/global/types';
import { v4 as uuid4 } from 'uuid';

type TSelect = {
  labelText: string;
  inputName: any;
  validationSchema?: any;
  required?: boolean;
  readonly?: boolean;
  options: any;
  register: UseFormRegister<INewApproverData>;
};

const Select = ({
  labelText,
  inputName,
  validationSchema,
  required = false,
  options,
  register,
}: TSelect) => {
  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}

      <select
        {...register(inputName, validationSchema)}
        name={inputName}
        required={required}
        className="rounded border-[1px] py-1 px-2 mt-2"
      >
        {options?.map((option: any) => (
          <option key={uuid4()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
