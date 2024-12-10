import { Content } from '@/components/Content/Content';

interface IApproverButtons {
  handleApproverModal: (() => void) | undefined;
  handleModalStatus: ((status: string) => void) | undefined;
}

const ApproverButtons = ({
  handleApproverModal,
  handleModalStatus,
}: IApproverButtons) => {
  const handleModalAction = (status: string) => {
    handleApproverModal && handleApproverModal();
    handleModalStatus && handleModalStatus(status);
  };

  return (
    <Content>
      <div className="flex justify-between gap-4">
        <button
          onClick={() => handleModalAction('information')}
          type="button"
          className={`flex-1 border-[1px] border-[#5B6770] text-[#5B6770] px-5 py-2 rounded font-normal bg-white hover:bg-slate-200 `}
        >
          More information needed
        </button>
        <button
          onClick={() => handleModalAction('disapprove')}
          type="button"
          className="flex-1 border-[1px] border-[#EB1400] text-[#EB1400] px-5 py-2 rounded font-normal bg-white hover:bg-slate-200"
        >
          Disapprove
        </button>
        <button
          onClick={() => handleModalAction('forward')}
          type="button"
          className="flex-1 border-[1px] border-be_first_color text-be_first_color  px-5 py-2 rounded font-normal bg-white hover:bg-slate-200"
        >
          Approve and forward
        </button>
        <button
          onClick={() => handleModalAction('approve')}
          type="button"
          className="flex-1 border-[1px] border-be_first_color text-white px-5 py-2 rounded font-normal bg-be_first_color hover:bg-blue-500"
        >
          Approve
        </button>
      </div>
    </Content>
  );
};

export default ApproverButtons;
