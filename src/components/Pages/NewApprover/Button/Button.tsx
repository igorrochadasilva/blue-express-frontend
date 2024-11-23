'use client';

import { useRouter } from 'next/navigation';

interface IButtonProps {}

const Button = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-4">
      <button
        className="w-[184px] h-[40px] border-[1px] border-be_first_color  text-be_first_color font-semibold rounded hover:bg-slate-200"
        onClick={() => router.push('/approvers')}
        type="button"
      >
        Cancel
      </button>
      <button
        className="w-[184px] h-[40px] bg-be_first_color text-white font-semibold rounded hover:bg-blue-500"
        type="submit"
      >
        Save
      </button>
    </div>
  );
};

export default Button;
