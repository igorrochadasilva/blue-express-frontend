import { Content } from '@/components/Content/Content';
import { Button } from '@/components/ui/button';
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
import { useAlertUploadFile } from '@/hooks/useAlertUploadFile';
import { DistributorRepresentativesContractFormInputsProps } from '@/lib/Forms/DistributionRepresentativesContractFormInputs';
import { MaintenanceContractFormInputsProps } from '@/lib/Forms/MaintenanceContractFormInputs';
import { SoftwareServiceContractFormInputsProps } from '@/lib/Forms/SoftwareServiceFormInputs';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid4 } from 'uuid';

interface FormContentProps {
  formData:
    | MaintenanceContractFormInputsProps[][]
    | SoftwareServiceContractFormInputsProps[][]
    | DistributorRepresentativesContractFormInputsProps[][];
}

export const FormContent = ({ formData }: FormContentProps) => {
  const { control } = useFormContext();
  const { setIsAlertDialogOpen } = useAlertUploadFile();

  return (
    <Content>
      <div className="flex flex-col gap-4">
        {formData.map((data) => (
          <div
            className="flex flex-row justify-between gap-4 text-sm"
            key={uuid4()}
          >
            {data.map((item) => {
              const isFileInput = item.inputType === 'file';

              return (
                <FormField
                  key={item.id}
                  control={control}
                  name={item.inputName}
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem
                      className={`flex-1 ${isFileInput && 'flex items-end'}`}
                    >
                      {!isFileInput && <FormLabel>{item.labelText}</FormLabel>}
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
                        ) : isFileInput ? (
                          <Button
                            variant="blue"
                            size="default"
                            onClick={() => setIsAlertDialogOpen(true)}
                          >
                            Attach file
                          </Button>
                        ) : (
                          <Input
                            {...fieldProps}
                            type={item.inputType}
                            placeholder={item.inputName}
                            id={item.inputName}
                            readOnly={item.readonly}
                            value={value as string}
                            onChange={(event) => onChange(event.target.value)}
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
