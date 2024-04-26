interface IMessageProps {
  text: string
}

const Message = ({ text }: IMessageProps) => {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <p>{text}</p>
    </div>
  )
}

export default Message
