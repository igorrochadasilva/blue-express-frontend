import { Content } from '@/components/Content/Content';
import { Button } from '@/components/ui/button';
import { useRequestCreate } from '@/hooks/useRequestsCreate';
import { useRequestUpdate } from '@/hooks/useRequestsUpdate';
import { RequestStatusEnum } from '@/types/requests/enums';
import { useFormContext } from 'react-hook-form';

interface GroupButtonsProps {
  isFormUpdate?: boolean;
}

export const GroupButtons = ({ isFormUpdate }: GroupButtonsProps) => {
  const { setValue } = useFormContext();
  const { isLoading: isLoadingUpdating } = useRequestUpdate();
  const { isLoading: isLoadingCreating } = useRequestCreate();
  const loadingStatus = isLoadingUpdating || isLoadingCreating;

  return (
    <Content>
      <div className="flex justify-end gap-4">
        <Button
          className={`border-[1px] border-be_first_color text-be_first_color px-5 py-2 rounded font-normal ${
            loadingStatus ? 'bg-slate-200' : 'bg-white'
          } hover:bg-slate-200 `}
          size={'lg'}
          onClick={() => setValue('status', RequestStatusEnum.SKETCH)}
          disabled={loadingStatus}
          type="submit"
        >
          Save draft
        </Button>
        <Button
          className={` text-white px-5 py-2 rounded font-normal hover:bg-blue-500 ${
            loadingStatus ? 'bg-blue-500' : 'bg-be_first_color'
          }`}
          size={'lg'}
          onClick={() =>
            setValue('status', RequestStatusEnum.WAITING_FOR_APPROVAL)
          }
          disabled={loadingStatus}
          type="submit"
        >
          {isFormUpdate ? `Save Request` : `Create Request`}
        </Button>
      </div>
    </Content>
  );
};
