'use client';
import { v4 as uuid4 } from 'uuid';
import { useState, useCallback } from 'react';

import { Approver } from '@/types/approvers/approvers';
import { UserSession } from '@/types/auth/sign';

import { deleteApprover } from '@/actions/approver/deleteApprover';
import { notifyMessage } from '@/utils/notifyMessage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TrashIcon } from '@heroicons/react/24/solid';

interface ApproversProps {
  approversData: Approver[];
  user: UserSession;
}

export const Approvers = ({ approversData }: ApproversProps) => {
  const [approvers, setApprovers] = useState(approversData);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedApproverId, setSelectedApproverId] = useState<number | null>(
    null
  );

  const handleTrashClick = useCallback((id: number) => {
    setIsAlertDialogOpen(true);
    setSelectedApproverId(id);
  }, []);

  const closeTrashModal = useCallback(() => {
    setIsAlertDialogOpen(false);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request Type</TableHead>
            <TableHead>competence</TableHead>
            <TableHead>Approver</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Company Type</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvers &&
            approvers.map((approver: Approver) => {
              return (
                <TableRow key={uuid4()}>
                  <TableCell>{approver.title}</TableCell>
                  <TableCell>{approver.competence}</TableCell>
                  <TableCell>{approver.approverName}</TableCell>
                  <TableCell>{approver.level}</TableCell>
                  <TableCell>{approver.company}</TableCell>
                  <TableCell>
                    <TrashIcon
                      onClick={() => handleTrashClick(approver.id)}
                      className="text-center w-4 cursor-pointer text-red-500 m-auto"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <AlertDialog
        open={isAlertDialogOpen}
        defaultOpen={isAlertDialogOpen}
        onOpenChange={() => setIsAlertDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this approver?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500/70"
              onClick={handleDeleteApprover}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
