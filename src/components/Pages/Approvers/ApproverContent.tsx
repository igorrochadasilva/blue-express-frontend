'use client';

import { useState, useCallback } from 'react';
import ApproversList from './ApproverList';
import Modal from '../../Global/Modal/Modal';
import { deleteApprover } from '../../../actions/approver/deleteApprover';
import { Approver } from '@/types/approvers/approvers';
import { UserSession } from '@/types/auth/sign';
import { notifyMessage } from '@/toast/notifications';

interface ApproverContentProps {
  approversData: Approver[];
  user: UserSession;
}

const ApproverContent = ({ approversData }: ApproverContentProps) => {
  const [approvers, setApprovers] = useState(approversData);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedApproverId, setSelectedApproverId] = useState<number | null>(
    null
  );

  const handleTrashClick = useCallback((id: number) => {
    setShowTrashModal(true);
    setSelectedApproverId(id);
  }, []);

  const closeTrashModal = useCallback(() => {
    setShowTrashModal(false);
    setSelectedApproverId(null);
  }, []);

  const handleDeleteApprover = useCallback(async () => {
    if (selectedApproverId === null) return;

    const updatedApprovers = approvers.filter(
      (approver) => approver.id !== selectedApproverId
    );

    setApprovers(updatedApprovers);

    const response = await deleteApprover({ id: selectedApproverId });

    notifyMessage({
      message: response?.data?.message ?? response?.message,
      statusCode: response.statusCode,
    });

    closeTrashModal();
  }, [approvers, selectedApproverId, closeTrashModal]);

  return (
    <>
      <ApproversList.Root>
        <table>
          <ApproversList.Head />
          <ApproversList.Content
            approversData={approvers}
            handleTrashClick={handleTrashClick}
          />
        </table>
      </ApproversList.Root>
      <Modal
        text="Are you sure you want to delete this approver?"
        showModal={showTrashModal}
        setCloseModal={closeTrashModal}
        action={handleDeleteApprover}
      />
    </>
  );
};

export default ApproverContent;
