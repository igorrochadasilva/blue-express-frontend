'use client';

import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';
import { PostApproverDTO } from '@/types/approvers/approvers';
import { SelectOptions, UserNames } from '@/types/approvers/newApprover';

interface SelectProps {
  labelText: string;
  inputName: keyof PostApproverDTO;
  validation?: RegisterOptions;
  required?: boolean;
  readonly?: boolean;
  options?: SelectOptions[];
  register: UseFormRegister<PostApproverDTO>;
  setValue?: UseFormSetValue<PostApproverDTO>;
  handleChangeApproverSelect?: (id: number) => void;
}

const Select = ({
  labelText,
  inputName,
  validation,
  required = false,
  options,
  register,
  setValue,
  handleChangeApproverSelect,
}: SelectProps) => {
  return (
    <label htmlFor={inputName} className="flex flex-col flex-1 mb-2">
      {labelText}

      <select
        {...register(inputName, validation)}
        name={inputName}
        required={required}
        className="rounded border-[1px] py-1 px-2 mt-2"
        onChange={(e) => {
          const selectedValue = Number(e.target.value);
          if (setValue) setValue(inputName, selectedValue);
          if (handleChangeApproverSelect)
            handleChangeApproverSelect(selectedValue);
        }}
      >
        {options?.map((option: UserNames) => (
          <option key={uuid4()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
