import { ToastContainer } from 'react-toastify'
import SideMenu from '../Menu/Menu'
import Title from '../Title/Title'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IContainer {
  children: React.ReactNode
  bgColor?: string
  showSideMenu?: boolean
  title?: string
  showBtnNavigate?: boolean
  btnNavigateText?: string
  btnNavigateLink?: string
  isLoginPage?: boolean
}

const Container = ({
  children,
  bgColor = 'bg-[#e5e5e5]',
  showSideMenu = true,
  title,
  showBtnNavigate = false,
  btnNavigateText = 'btn text',
  btnNavigateLink,
  isLoginPage = false,
}: IContainer) => {
  const [route, setRoute] = useState('/approvers/new-approver')

  return (
    <main className={`flex w-full min-h-screen  ${bgColor}`}>
      <ToastContainer />
      {showSideMenu && <SideMenu />}
      <div className={`flex flex-col w-full ${!isLoginPage && 'ml-[228px]'} `}>
        <div className="flex flex-row items-center justify-between mx-10 ">
          <Title title={title} />
          {showBtnNavigate && (
            <Link
              className="flex justify-center items-center h-5 bg-be_first_color py-4 px-5 rounded text-white font-semibold hover:bg-blue-500"
              href={route}
            >
              {btnNavigateText}
              <PlusIcon className="ml-2 w-5 text-white" />
            </Link>
          )}
        </div>

        {children}
      </div>
    </main>
  )
}

export default Container
