import { Content } from '@/components/Content/Content';
import { Button } from '@/components/ui/button';
import { useApproverModal } from '@/hooks/useApproverModal';
import { RequestStatusEnum } from '@/types/requests/enums';

export const ApproverButtons = () => {
  const { setModalActionType, showModal } = useApproverModal();

  const handleShowModal = (contractStatus: RequestStatusEnum) => {
    showModal(true);
    setModalActionType(contractStatus);
  };

  return (
    <Content>
      <div className="flex justify-between gap-4">
        <Button
          onClick={() =>
            handleShowModal(RequestStatusEnum.WAITING_FOR_INFORMATION)
          }
          type="button"
          className={`flex-1 border-[1px] border-[#5B6770] text-[#5B6770] px-5 py-2 rounded font-normal bg-white hover:bg-slate-200 `}
        >
          More information needed
        </Button>
        <Button
          onClick={() => handleShowModal(RequestStatusEnum.DISAPPROVED)}
          type="button"
          className="flex-1 border-[1px] border-[#EB1400] text-[#EB1400] px-5 py-2 rounded font-normal bg-white hover:bg-slate-200"
        >
          Disapprove
        </Button>
        <Button
          onClick={() =>
            handleShowModal(RequestStatusEnum.WAITING_FOR_APPROVAL)
          }
          type="button"
          className="flex-1 border-[1px] border-be_first_color text-be_first_color  px-5 py-2 rounded font-normal bg-white hover:bg-slate-200"
        >
          Approve and forward
        </Button>
        <Button
          onClick={() => handleShowModal(RequestStatusEnum.APPROVED)}
          type="button"
          className="flex-1 border-[1px] border-be_first_color text-white px-5 py-2 rounded font-normal bg-be_first_color hover:bg-blue-500"
        >
          Approve
        </Button>
      </div>
    </Content>
  );
};
