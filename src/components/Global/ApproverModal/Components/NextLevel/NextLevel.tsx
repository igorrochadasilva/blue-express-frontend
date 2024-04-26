interface INextLevelProps {
  text: string
}

const NextLevel = ({ text }: INextLevelProps) => {
  return (
    <div className="mb-4 flex gap-2 flex-col items-start">
      <span className="">{text}</span>
      <input className="h-4 w-4" type="checkbox" />
    </div>
  )
}

export default NextLevel
