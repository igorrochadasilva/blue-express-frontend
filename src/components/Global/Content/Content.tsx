interface IContent {
  children: React.ReactNode;
  showStyleContent?: boolean;
}

const Content = ({ children, showStyleContent = true }: IContent) => {
  return (
    <div className={`${showStyleContent && 'p-4'} bg-white rounded mb-5`}>
      {children}
    </div>
  );
};

export default Content;
