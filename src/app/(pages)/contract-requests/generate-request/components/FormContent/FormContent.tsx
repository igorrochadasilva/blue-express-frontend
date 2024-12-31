import { Content } from '@/components/Content/Content';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MaintenanceContractFormInputsProps } from '@/libs/Forms/MaintenanceContractFormInputs';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

interface FormContentProps {
  formData: MaintenanceContractFormInputsProps[][];
}

export const FormContent = ({ formData }: FormContentProps) => {
  const { control } = useFormContext();

  return (
    <Content>
      <div className="flex flex-col gap-4">
        {formData.map((data) => (
          <div
            className="flex flex-row justify-between gap-4 text-sm"
            key={uuid4()}
          >
            {data.map((item) => {
              return (
                <FormField
                  key={item.id}
                  control={control}
                  name={item.inputName}
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{item.inputName}</FormLabel>
                      <FormControl>
                        {item.type === 'select' ? (
                          <Select
                            value={value as string}
                            onValueChange={onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a period" />
                            </SelectTrigger>
                            <SelectContent>
                              {item.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            {...fieldProps}
                            type={item.inputType}
                            placeholder={item.inputName}
                            id={item.inputName}
                            readOnly={item.readonly}
                            value={
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                              item.inputType === 'file' ? undefined : value
                            }
                            multiple={item.inputType === 'file'}
                            accept={
                              item.inputType === 'file'
                                ? 'image/*,application/pdf'
                                : undefined
                            }
                            onChange={(event) => {
                              if (item.inputType === 'file') {
                                const file = event.target.files
                                  ? event.target.files[0]
                                  : null;
                                onChange(file);
                              } else {
                                onChange(event.target.value);
                              }
                            }}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Content>
  );
};
