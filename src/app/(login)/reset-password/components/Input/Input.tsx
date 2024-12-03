import { FieldErrors, UseFormRegister } from 'react-hook-form';

type LoginInputs = {
  password: string;
};

interface IInputProps {
  labelText: string;
  inputName: 'password';
  inputType: string;
  message: string;
  errors: FieldErrors;
  minLength?: number;
  register: UseFormRegister<LoginInputs>;
}

export function Input({
  labelText,
  inputName,
  inputType,
  errors,
  message,
  minLength = 6,
  register,
}: IInputProps) {
  return (
    <>
      <label htmlFor={labelText} className="mb-2 mt-2">
        {labelText}
      </label>
      <input
        className="w-full p-4 rounded bg-slate-200"
        id={inputName}
        {...register(inputName, {
          required: 'required',
          minLength: {
            value: minLength,
            message: message,
          },
        })}
        type={inputType}
      />
      {errors.inputName && (
        <span className="text-sm text-red-500">{errors.inputName.message}</span>
      )}
    </>
  );
}
