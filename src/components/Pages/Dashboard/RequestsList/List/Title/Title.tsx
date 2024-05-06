interface ITitleProps {
  text: string
}

const Title = ({ text }: ITitleProps) => {
  return (
    <div className="mb-8">
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}

export default Title
