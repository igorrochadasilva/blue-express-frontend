const StatusInput = () => {
  const contractTypes = [
    { value: 'waiting for approval', label: 'waiting for approval' },
    { value: 'waiting for information', label: 'waiting for information' },
    { value: 'approved', label: 'approved' },
    { value: 'disapproved', label: 'disapproved' },
    { value: 'sketch', label: 'sketch' },
  ]

  const handleSelectChange = (event: any) => {}

  return (
    <div className="flex flex-col w-[200px] gap-2 text-be_second_color">
      <label htmlFor="Status" className="font-semibold">
        Status
      </label>
      <select
        className="border-[1px] border-[#e3e3e3] px-1 py-2 rounded-lg"
        id="contractType"
        name="contractType"
        onChange={handleSelectChange}
      >
        {contractTypes.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StatusInput
