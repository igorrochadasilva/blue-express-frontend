import { periodOptions } from '../../../../libs/options'

interface IPeriodFilterProps {
  handleSelectPeriodChange: (e: string) => void
}

const PeriodFilter = ({ handleSelectPeriodChange }: IPeriodFilterProps) => {
  return (
    <div className="flex flex-col w-28">
      <label htmlFor="period" className="text-sm font-semibold">
        Period
      </label>
      <select
        onChange={(e) => handleSelectPeriodChange(e.currentTarget.value)}
        name="period"
        className="rounded border-[1px] py-1 px-2 mt-2"
      >
        {periodOptions?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
export default PeriodFilter
