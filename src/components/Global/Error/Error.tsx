import Container from '../Container/Container'
import Content from '../Content/Content'

interface IError {
  message: string
}
const ErrorComponent = ({ message }: IError) => {
  return (
    <Container title="Error">
      <Content>
        <div className="flex flex-col text-red-700 font-semibold">
          <h1>Message:</h1>
          <p>{message}</p>
        </div>
      </Content>
    </Container>
  )
}
export default ErrorComponent
