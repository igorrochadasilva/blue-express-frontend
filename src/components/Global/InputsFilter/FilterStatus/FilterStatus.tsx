import { contractTypesOptions } from '../../../../libs/options';

interface IFilterStatusProps {
  handleSelectRequestStatusChange: (e: string) => void;
}

const FilterStatus = ({
  handleSelectRequestStatusChange,
}: IFilterStatusProps) => {
  const handleSelectChange = (event: any) => {};

  return (
    <div className="flex flex-col w-[200px] gap-2 text-be_second_color">
      <label htmlFor="Status" className="font-semibold">
        Status
      </label>
      <select
        className="border-[1px] border-[#e3e3e3] px-1 py-2 rounded-lg"
        id="contractType"
        name="contractType"
        onChange={(e) => handleSelectRequestStatusChange(e.currentTarget.value)}
      >
        {contractTypesOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterStatus;
