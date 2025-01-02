'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const ActionButtons = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-4">
      <Button
        variant={'outline'}
        size={'lg'}
        className="border-[1px] border-be_first_color  text-be_first_color font-semibold rounded hover:bg-slate-200 hover:text-be_first_color"
        onClick={() => router.push('/approvers')}
        type="button"
      >
        Cancel
      </Button>
      <Button
        size={'lg'}
        className="bg-be_first_color text-white font-semibold rounded hover:bg-blue-500"
        type="submit"
      >
        Save
      </Button>
    </div>
  );
};
