import { Content } from '@/components/Content/Content';

interface GroupButtonsProps {
  isLoading: boolean;
  handleSaveDraft?: () => void;
  handleSaveWaitingApproval?: () => void;
  isFormUpdate?: boolean;
}

const GroupButtons = ({
  isLoading,
  handleSaveDraft,
  handleSaveWaitingApproval,
  isFormUpdate,
}: GroupButtonsProps) => {
  return (
    <Content>
      <div className="flex justify-end gap-4">
        <button
          disabled={isLoading}
          className={`border-[1px] border-be_first_color text-be_first_color px-5 py-2 rounded font-normal ${
            isLoading ? 'bg-slate-200' : 'bg-white'
          } hover:bg-slate-200 `}
          type="submit"
          onClick={handleSaveDraft}
        >
          Save draft
        </button>
        <button
          disabled={isLoading}
          onClick={handleSaveWaitingApproval}
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
