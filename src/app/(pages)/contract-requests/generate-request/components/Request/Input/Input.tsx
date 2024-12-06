import { TFiles } from '@/types/global/types';
import {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

interface InputProps<TFormValues extends FieldValues> {
  labelText: string;
  inputName: Path<TFormValues>; // Ensure inputName is a valid path of TFormValues
  inputType: string | undefined;
  inputValue?: string | number;
  validation?: RegisterOptions<TFormValues, Path<TFormValues>>;
  readonly: boolean | undefined;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  step?: string | number | undefined;
  register: UseFormRegister<TFormValues>;
  getValues: (v: string) => TFiles;
}

const Input = <TFormValues extends FieldValues>({
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
}: InputProps<TFormValues>) => {
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
    <label htmlFor={String(inputName)} className="flex flex-col flex-1 mb-2">
      {labelText}
      <input
        type={inputType}
        className="rounded border-[1px] py-1 px-2 mt-2"
        {...register(inputName, validation)}
        name={String(inputName)}
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
