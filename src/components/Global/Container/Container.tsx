import { ToastContainer } from 'react-toastify'
import SideMenu from '../Menu/Menu'
import Title from '../Title/Title'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/solid'
import Breadcrumb from '../Breadcrumb/Breadcrumb'

interface IContainer {
  children?: React.ReactNode
  bgColor?: string
  showSideMenu?: boolean
  title?: string
  showBtnNavigate?: boolean
  btnNavigateText?: string
  btnNavigateLink?: string
  btnBgColor?: string
  btnTextColor?: string
  btnBorderColor?: string
  btnBgHover?: string
  isLoginPage?: boolean
}

const Container = ({
  children,
  bgColor = 'bg-[#e5e5e5]',
  showSideMenu = true,
  title,
  showBtnNavigate = false,
  btnNavigateText = 'btn text',
  btnNavigateLink = '/',
  btnTextColor = 'text-white',
  btnBgColor = 'bg-be_first_color',
  btnBorderColor = 'border-white',
  btnBgHover = 'bg-blue-500',
  isLoginPage = false,
}: IContainer) => {
  return (
    <main className={`flex w-full min-h-screen ${bgColor}`}>
      <ToastContainer />
      {showSideMenu && <SideMenu />}
      <div className={`flex flex-col w-full ${!isLoginPage && 'ml-[228px]'} `}>
        <Breadcrumb />
        <div className="flex flex-row items-center justify-between mx-10 ">
          <Title title={title} />
          {showBtnNavigate && (
            <Link
              className={`flex justify-center items-center h-5 ${btnBgColor} ${btnTextColor} py-4 px-5 rounded font-semibold ${btnBorderColor} border-[1px] text-sm hover:${btnBgHover}`}
              href={btnNavigateLink}
            >
              {btnNavigateText}
              <PlusIcon className={`ml-2 w-5 ${btnTextColor}  `} />
            </Link>
          )}
        </div>

        {children}
      </div>
    </main>
  )
}

export default Container
