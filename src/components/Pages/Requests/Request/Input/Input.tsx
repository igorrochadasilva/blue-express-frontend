'use client';

import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { PostMaintenanceContractDTO } from '@/types/requests/maintenance.contract';
import { RequestsDTO } from '@/types/requests/requests';
import { TFiles } from '@/types/global/types';

interface InputProps {
  labelText: string;
  inputName: keyof PostMaintenanceContractDTO;
  inputType: string | undefined;
  inputValue?: string | number;
  validation?: RegisterOptions;
  readonly: boolean | undefined;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  step?: string | number | undefined;
  register: UseFormRegister<RequestsDTO>;
  getValues: (v: string) => TFiles; // TODO - Changes after
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
  step = 'any',
  register,
  getValues,
}: InputProps) => {
  const files = getValues('files');

  const linkFiles = (files: TFiles) => {
    if (!files || Object.keys(files).length === 0) return null;

    const arrayFiles = Array.from(files);

    return arrayFiles.map((file) => (
      <a key={file.name} href={file.link}>
        {file.name}
      </a>
    ));
  };

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
        step={step}
      />
      {inputName === 'files' && (
        <div className="flex flex-row gap-2">{linkFiles(files)}</div>
      )}
    </label>
  );
};

export default Input;
