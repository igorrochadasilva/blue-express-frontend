'use server'

import { ContainerContent } from '.'

interface IContainer {
  children?: React.ReactNode
  bgColor?: string
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

const Container = async ({
  children,
  bgColor = 'bg-[#e5e5e5]',
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
    <ContainerContent.Root bgColor={bgColor}>
      <div className={`flex flex-col w-full ${!isLoginPage && 'ml-[228px]'} `}>
        <ContainerContent.Breadcrumb />
        <div className="flex flex-row items-center justify-between mx-10 ">
          <ContainerContent.Title title={title} />
          {showBtnNavigate && (
            <ContainerContent.NavigateButton
              btnNavigateLink={btnNavigateLink}
              btnBgColor={btnBgColor}
              btnBgHover={btnBgHover}
              btnBorderColor={btnBorderColor}
              btnNavigateText={btnNavigateText}
              btnTextColor={btnTextColor}
            />
          )}
        </div>
        {children}
      </div>
    </ContainerContent.Root>
  )
}

export default Container
