'use server';

interface TitleProps {
  title?: string;
}

export const Title = ({ title }: TitleProps) => {
  return (
    <div className="my-4">
      <h1 className="text-be_first_color text-2xl font-semibold">{title}</h1>
    </div>
  );
};
