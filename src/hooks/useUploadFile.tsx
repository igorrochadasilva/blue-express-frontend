import { create } from 'zustand';

interface FileData {
  url: string;
  size: number;
  file: File;
}

interface UploadFileProps {
  isUploadFileOpen: boolean;
  setIsUploadFileOpen: (isUploadFileOpen: boolean) => void;
  selectedFileUploadFile: FileData[];
  setSelectedFileUploadFile: (selectedFileUploadFile: FileData[]) => void;
}

export const useUploadFile = create<UploadFileProps>((set) => ({
  selectedFileUploadFile: [],
  setSelectedFileUploadFile: (selectedFileUploadFile: FileData[]) =>
    set({ selectedFileUploadFile }),
  isUploadFileOpen: false,
  setIsUploadFileOpen: (isUploadFileOpen: boolean) => set({ isUploadFileOpen }),
}));
