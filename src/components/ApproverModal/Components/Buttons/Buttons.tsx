import { useApproverModal } from '@/hooks/useApproverModal';
import { IModalOptions } from '../../ApproverModal';
import { postApproval } from '@/actions/approval/postApproval';
import { RequestStatusEnum, RequestsTitleEnum } from '@/types/requests/enums';
import { notifyMessage } from '@/utils/notifyMessage';
import { useRouter } from 'next/navigation';

interface ButtonsProps {
  modalOptions: IModalOptions;
}

export const Buttons = ({ modalOptions }: ButtonsProps) => {
  const router = useRouter();
  const { showModal, justify, modal, approvalDTO, modalActionType } =
    useApproverModal();

  const handlePostApproval = async () => {
    const response = await postApproval({
      author: approvalDTO?.author ?? '',
      justify: justify,
      level: approvalDTO?.level ?? 0,
      status: modalActionType ?? RequestStatusEnum.WAITING_FOR_APPROVAL,
      title: approvalDTO?.title ?? RequestsTitleEnum.MAINTENANCE_CONTRACT,
      typeRequest: approvalDTO?.title ?? RequestsTitleEnum.MAINTENANCE_CONTRACT,
      userID: approvalDTO?.userID ?? 0,
      maintenanceContractID: approvalDTO?.contractID,
    });
    console.log('🚀 ~ handlePostApproval ~ response:', response);

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response?.statusCode,
    });

    if (response.statusCode === 201) return router.push('/contract-requests');
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => showModal(!modal)}
        className="flex-1 rounded h-10 border-[1px] border-be_second_color font-medium"
      >
        Cancel
      </button>
      <button
        disabled={justify === ''}
        onClick={handlePostApproval}
        style={{ background: modalOptions.color }}
        className={`flex-1 rounded h-10 text-white font-medium`}
      >
        {modalOptions.text}
      </button>
    </div>
  );
};
