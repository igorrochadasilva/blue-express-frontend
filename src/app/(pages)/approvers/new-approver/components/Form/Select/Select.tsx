'use client';

import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';
import { PostApproverDTO } from '@/types/approvers/approvers';
import { SelectOptions, UserNames } from '@/types/approvers/newApprover';

interface SelectProps {
  labelText: string;
  inputName: keyof PostApproverDTO;
  validation?: RegisterOptions<PostApproverDTO, keyof PostApproverDTO>;
  required?: boolean;
  readonly?: boolean;
  options?: SelectOptions[];
  register: UseFormRegister<PostApproverDTO>;
  handleChangeApproverSelect?: (id: number) => void;
}

const Select = ({
  labelText,
  inputName,
  validation,
  required = false,
  options,
  register,
  handleChangeApproverSelect,
}: SelectProps) => {
  const registered = register(inputName, validation);

  return (
    <label htmlFor={String(inputName)} className="flex flex-col flex-1 mb-2">
      {labelText}

      <select
        {...registered}
        onChange={(e) => {
          registered.onChange(e);
          const selectedValue = Number(e.target.value);
          if (handleChangeApproverSelect) {
            handleChangeApproverSelect(selectedValue);
          }
        }}
        name={String(inputName)}
        required={required}
        className="rounded border-[1px] py-1 px-2 mt-2"
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
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
