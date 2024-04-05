import { ToastContainer } from 'react-toastify'

interface IContainer {
  children: React.ReactNode
  bgColor?: string
}

const Container = ({ children, bgColor = 'bg-white' }: IContainer) => {
  return (
    <main className={`flex w-full min-h-screen  ${bgColor}`}>
      <ToastContainer />
      {children}
    </main>
  )
}

export default Container
