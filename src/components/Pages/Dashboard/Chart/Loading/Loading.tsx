interface ILoadingProps {
  text: string
}

const Loading = ({ text }: ILoadingProps) => {
  return <span className="flex items-center text-lg font-medium">{text}</span>
}

export default Loading
