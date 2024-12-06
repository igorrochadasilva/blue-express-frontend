type InputGroupProps = {
  children: React.ReactNode;
};

const InputGroup = ({ children }: InputGroupProps) => {
  return (
    <div className="flex flex-row justify-between gap-4 text-sm">
      {children}
    </div>
  );
};

export default InputGroup;
