import { Content } from '@/components/Content/Content';
import { useRequestUpdate } from '@/hooks/useRequestsUpdate';
import { RequestStatusEnum } from '@/types/requests/enums';
import { useFormContext } from 'react-hook-form';

interface GroupButtonsProps {
  isFormUpdate?: boolean;
}

const GroupButtons = ({ isFormUpdate }: GroupButtonsProps) => {
  const { setValue } = useFormContext();
  const { isLoading } = useRequestUpdate();

  return (
    <Content>
      <div className="flex justify-end gap-4">
        <button
          disabled={isLoading}
          className={`border-[1px] border-be_first_color text-be_first_color px-5 py-2 rounded font-normal ${
            isLoading ? 'bg-slate-200' : 'bg-white'
          } hover:bg-slate-200 `}
          type="submit"
          onClick={() => setValue('status', RequestStatusEnum.SKETCH)}
        >
          Save draft
        </button>
        <button
          disabled={isLoading}
          onClick={() =>
            setValue('status', RequestStatusEnum.WAITING_FOR_APPROVAL)
          }
          className={` text-white px-5 py-2 rounded font-normal hover:bg-blue-500 ${
            isLoading ? 'bg-blue-500' : 'bg-be_first_color'
          }`}
          type="submit"
        >
          {isFormUpdate ? `Save Request` : `Create Request`}
        </button>
      </div>
    </Content>
  );
};

export default GroupButtons;
