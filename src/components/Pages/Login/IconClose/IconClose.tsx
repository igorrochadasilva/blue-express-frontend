import { XMarkIcon } from '@heroicons/react/24/solid';
import { MouseEventHandler } from 'react';

interface ICloseProps {
  showForgetPassword: boolean;
  handleShowForgetPassword: MouseEventHandler<SVGSVGElement>;
}

export function IconClose({
  showForgetPassword,
  handleShowForgetPassword,
}: ICloseProps) {
  return (
    <div className="flex justify-end">
      <XMarkIcon
        onClick={handleShowForgetPassword}
        className={`h-6 w-6 text-slate-800 text-end cursor-pointer ${showForgetPassword ? 'block' : 'hidden'}`}
      />
    </div>
  );
}
