type TInputGroup = {
  children: React.ReactNode
}

const InputGroup = ({ children }: TInputGroup) => {
  return <div className="flex flex-row justify-between gap-4 text-sm">{children}</div>
}

export default InputGroup
