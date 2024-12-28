'use client';

import { useState, useCallback } from 'react';
import List from './List';

import { Approver } from '@/types/approvers/approvers';
import { UserSession } from '@/types/auth/sign';

import { deleteApprover } from '@/actions/approver/deleteApprover';
import { Modal } from '@/components/Modal/Modal';
import { notifyMessage } from '@/utils/notifyMessage';

interface ApproversProps {
  approversData: Approver[];
  user: UserSession;
}

export const Approvers = ({ approversData }: ApproversProps) => {
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
      <List.Root>
        <table>
          <List.Head />
          <List.Content
            approversData={approvers}
            handleTrashClick={handleTrashClick}
          />
        </table>
      </List.Root>
      <Modal
        text="Are you sure you want to delete this approver?"
        showModal={showTrashModal}
        setCloseModal={closeTrashModal}
        action={handleDeleteApprover}
      />
    </>
  );
};
