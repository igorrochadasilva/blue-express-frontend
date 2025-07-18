'use server';

import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface INavigateButton {
  btnNavigateLink: string;
  btnNavigateText?: string;
  btnTextColor?: string;
  btnBgColor?: string;
  btnBorderColor?: string;
  btnBgHover?: string;
}

const NavigateButton = async ({
  btnNavigateLink,
  btnNavigateText,
  btnTextColor,
  btnBgColor,
  btnBorderColor,
  btnBgHover,
}: INavigateButton) => {
  return (
    <Link
      className={`flex justify-center items-center h-5 ${btnBgColor} ${btnTextColor} py-4 px-5 rounded font-semibold ${btnBorderColor} border-[1px] text-sm hover:${btnBgHover}`}
      href={btnNavigateLink}
    >
      {btnNavigateText}
      <PlusIcon className={`ml-2 w-5 ${btnTextColor}  `} />
    </Link>
  );
};

export default NavigateButton;
