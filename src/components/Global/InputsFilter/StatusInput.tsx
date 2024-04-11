const StatusInput = () => {
  const contractTypes = [
    { value: 'maintenance', label: 'Maintenance Contract' },
    { value: 'distributor_representatives', label: 'Distributor Representatives Contract' },
    { value: 'software_service', label: 'Software Service Contract' },
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
