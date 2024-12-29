import { periodOptions } from '@/libs/options';
import { SelectOptions } from '@/types/approvers/newApprover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface PeriodFilterProps {
  handleSelectPeriodChange: (e: string) => void;
}

const PeriodFilter = ({ handleSelectPeriodChange }: PeriodFilterProps) => {
  return (
    <div className="flex flex-col w-28 mb-5">
      <Label htmlFor="period" className="text-sm font-semibold">
        Period
      </Label>
      <Select onValueChange={(value) => handleSelectPeriodChange(value)}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select a period" />
        </SelectTrigger>
        <SelectContent>
          {periodOptions?.map((option: SelectOptions) => (
            <SelectItem key={option.value} value={option.value}>
              {option?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default PeriodFilter;
