const PeriodStatus = () => {
  const handleSelectPeriod = (event: any) => {}

  return (
    <div className="flex flex-col w-[200px] gap-2 text-be_second_color">
      <label htmlFor="Status" className="font-semibold">
        Period
      </label>
      <input className="border-[1px] border-[#e3e3e3] px-1 py-2 rounded-lg" type="text" onClick={handleSelectPeriod} />
    </div>
  )
}

export default PeriodStatus
