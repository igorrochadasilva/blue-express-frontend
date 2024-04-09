import { ToastContainer } from 'react-toastify'
import SideMenu from '../Menu/Menu'

interface IContent {
  children: React.ReactNode
  showStyleContent?: boolean
}

const Content = ({ children, showStyleContent = true }: IContent) => {
  return (
    <div
      className={`mx-10 ${showStyleContent && ' my-4 p-4'} bg-white rounded`}
    >
      {children}
    </div>
  )
}

export default Content
