import { useApproverModal } from '@/hooks/useApproverModal';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

interface CloseProps {
  text: ReactNode;
}

export const Close = ({ text }: CloseProps) => {
  const { showModal } = useApproverModal();
  return (
    <div className="flex justify-between mb-4">
      <span className="text-be_first_color text-md font-semibold">{text}</span>
      <XMarkIcon
        onClick={() => showModal(false)}
        className="h-6 w-6 text-slate-800 text-end cursor-pointer"
      />
    </div>
  );
};
