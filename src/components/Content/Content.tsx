interface ContentProps {
  children: React.ReactNode;
  showStyleContent?: boolean;
}

export const Content = ({
  children,
  showStyleContent = true,
}: ContentProps) => {
  return (
    <div className={`${showStyleContent && 'p-4'} bg-white rounded mb-5`}>
      {children}
    </div>
  );
};
