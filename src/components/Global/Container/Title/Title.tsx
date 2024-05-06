'use server'

interface ITitle {
  title?: string
}

const Title = async ({ title }: ITitle) => {
  return (
    <div className="my-4">
      <h1 className="text-be_first_color text-2xl font-semibold">{title}</h1>
    </div>
  )
}
export default Title
