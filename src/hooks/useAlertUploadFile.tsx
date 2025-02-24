import { create } from 'zustand';

interface AlertUploadFileProps {
  isAlertDialogOpen: boolean;
  setIsAlertDialogOpen: (isAlertDialogOpen: boolean) => void;
}

export const useAlertUploadFile = create<AlertUploadFileProps>((set) => ({
  isAlertDialogOpen: false,
  setIsAlertDialogOpen: (isAlertDialogOpen: boolean) =>
    set({ isAlertDialogOpen }),
}));
