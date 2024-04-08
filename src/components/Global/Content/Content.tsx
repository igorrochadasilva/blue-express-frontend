import { ToastContainer } from 'react-toastify'
import SideMenu from '../Menu/Menu'

interface IContent {
  children: React.ReactNode
}

const Content = ({ children }: IContent) => {
  return <div className="mx-10 my-4 p-4 bg-white rounded">{children}</div>
}

export default Content
