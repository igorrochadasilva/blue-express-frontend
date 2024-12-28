import { periodOptions } from '@/libs/options';
import { SelectOptions } from '@/types/approvers/newApprover';

interface PeriodFilterProps {
  handleSelectPeriodChange: (e: string) => void;
}

const PeriodFilter = ({ handleSelectPeriodChange }: PeriodFilterProps) => {
  return (
    <div className="flex flex-col w-28 mb-5">
      <label htmlFor="period" className="text-sm font-semibold">
        Period
      </label>
      <select
        onChange={(e) => handleSelectPeriodChange(e.currentTarget.value)}
        name="period"
        className="rounded border-[1px] py-1 px-2 mt-2"
      >
        {periodOptions?.map((option: SelectOptions) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PeriodFilter;
