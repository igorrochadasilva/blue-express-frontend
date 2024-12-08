interface NextLevelProps {
  text: string;
}

export const NextLevel = ({ text }: NextLevelProps) => {
  return (
    <div className="mb-4 flex gap-2 flex-col items-start">
      <span className="">{text}</span>
      <input className="h-4 w-4" type="checkbox" />
    </div>
  );
};
