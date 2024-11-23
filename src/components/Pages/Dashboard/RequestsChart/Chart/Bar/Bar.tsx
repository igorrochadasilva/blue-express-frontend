interface IBarProps {
  quantity: number;
  barSize: number;
  barColor: string;
  barText: string;
}

const Bar = ({ quantity, barSize, barColor, barText }: IBarProps) => {
  return (
    <div className="flex flex-col items-center w-[148px] self-end">
      <span className="text-sm h-6">{quantity}</span>
      <div
        className="rounded w-[132px]"
        style={{ height: barSize, background: barColor }}
      ></div>
      <span className="text-sm h-6 mt-1">{barText}</span>
    </div>
  );
};

export default Bar;
