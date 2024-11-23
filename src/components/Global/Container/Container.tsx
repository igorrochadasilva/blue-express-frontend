'use server';

import { ContainerContent } from '.';

interface IContainer {
  children?: React.ReactNode;
  bgColor?: string;
  title?: string;
  showBtnNavigate?: boolean;
  btnNavigateText?: string;
  btnNavigateLink?: string;
  btnBgColor?: string;
  btnTextColor?: string;
  btnBorderColor?: string;
  btnBgHover?: string;
}

const Container = async ({
  children,
  title,
  showBtnNavigate = false,
  btnNavigateText = 'btn text',
  btnNavigateLink = '/',
  btnTextColor = 'text-white',
  btnBgColor = 'bg-be_first_color',
  btnBorderColor = 'border-white',
  btnBgHover = 'bg-blue-500',
}: IContainer) => {
  return (
    <ContainerContent.Root>
      <ContainerContent.Breadcrumb />
      <div className="flex flex-row items-center justify-between">
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
    </ContainerContent.Root>
  );
};

export default Container;
