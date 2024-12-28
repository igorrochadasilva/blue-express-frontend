import { useEffect, useState, useCallback } from 'react';

import { Approver, ApproverRow } from '@/types/approvers/approvers';
import { deleteApprover } from '@/actions/approver/deleteApprover';

import { TrashIcon } from '@heroicons/react/24/solid';
import { Modal } from '@/components/Modal/Modal';
import { formatToUSD } from '@/utils/format/formatToUSD';

interface ListProps {
  approvers: Approver[];
}

export const List = ({ approvers }: ListProps) => {
  const [listApprovers, setListApprovers] = useState<ApproverRow[]>([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedApproverId, setSelectedApproverId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const mappedApprovers = approvers.map((approver) => ({
      type: approver.title,
      competence: formatToUSD(Number(approver.competence)),
      approverName: approver.approverName,
      level: approver.level,
      companyType: approver.company,
      id: approver.id,
    }));
    setListApprovers(mappedApprovers);
  }, [approvers]);

  const handleTrashClick = useCallback((id: number) => {
    setShowTrashModal(true);
    setSelectedApproverId(id);
  }, []);

  const closeTrashModal = useCallback(() => {
    setShowTrashModal(false);
    setSelectedApproverId(null);
  }, []);

  const handleDeleteApprover = useCallback(() => {
    if (selectedApproverId === null) return;

    const updatedApprovers = listApprovers.filter(
      (approver) => approver.id !== selectedApproverId
    );
    setListApprovers(updatedApprovers);
    deleteApprover({ id: selectedApproverId });
    closeTrashModal();
  }, [selectedApproverId, listApprovers, closeTrashModal]);

  return (
    <>
      <div className="flex flex-col justify-normal">
        {listApprovers.length > 0 ? (
          <table>
            <thead>
              <tr className="h-14">
                <th>Request Type</th>
                <th>Competence</th>
                <th>Approver</th>
                <th>Level</th>
                <th>Company Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listApprovers.map((approver) => (
                <tr key={approver.id} className="text-center border text-sm">
                  <td className="w-1/6 py-3 pl-3">{approver.type}</td>
                  <td className="w-1/6 py-3">{approver.competence}</td>
                  <td className="w-1/6 py-3">{approver.approverName}</td>
                  <td className="w-1/6 py-3">{approver.level}</td>
                  <td className="w-1/6 py-3">{approver.companyType}</td>
                  <td className="w-1/6 py-3">
                    <TrashIcon
                      onClick={() => handleTrashClick(approver.id)}
                      className="text-center w-4 cursor-pointer text-red-500 m-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center w-full h-[400px]">
            <p>There are no approved approvers...</p>
          </div>
        )}
      </div>
      <Modal
        text="Are you sure you want to delete this approver?"
        showModal={showTrashModal}
        setCloseModal={closeTrashModal}
        action={handleDeleteApprover}
      />
    </>
  );
};
