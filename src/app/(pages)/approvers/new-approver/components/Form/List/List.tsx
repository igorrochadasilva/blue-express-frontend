interface IListProps {
  children: React.ReactNode;
}

const List = ({ children }: IListProps) => {
  return <table className="w-full text-center text-sm">{children}</table>;
};

export default List;
