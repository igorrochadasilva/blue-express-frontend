'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useRef } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useUploadFile } from '@/hooks/useUploadFile';
import {
  ArrowUpOnSquareStackIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { formatFileSize } from '@/utils/format/formatFileSize';

interface FileData {
  url: string;
  size: number;
  file: File;
}

export const UploadFile = () => {
  const {
    isUploadFileOpen,
    selectedFileUploadFile,
    setIsUploadFileOpen,
    setSelectedFileUploadFile,
  } = useUploadFile();
  const { setValue } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const createFileData = (file: File): Promise<FileData> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve({
          url: reader.result as string,
          size: file.size,
          file,
        });
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const fileDataPromises = Array.from(files).map(createFileData);
    const newFileData = await Promise.all(fileDataPromises);

    const updatedFiles = [...selectedFileUploadFile, ...newFileData];
    setSelectedFileUploadFile(updatedFiles);
    setValue(
      'files',
      updatedFiles.map((f) => f.file)
    );
  };

  const handleRemoveSingleFile = (indexToRemove: number) => {
    const newFiles = selectedFileUploadFile.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFileUploadFile(newFiles);
    // Update form state with remaining files
    setValue(
      'files',
      newFiles.map((f) => f.file)
    );
  };

  const handleIconClick = () => fileInputRef?.current?.click();
  const handleCloseAlert = () => setIsUploadFileOpen(false);

  return (
    <AlertDialog
      open={isUploadFileOpen}
      defaultOpen={isUploadFileOpen}
      onOpenChange={handleCloseAlert}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-4 pb-2 border-b-2">
            <PhotoIcon
              className="w-8 h-8 p-1 border border-blue-500 text-blue-500 rounded-full cursor-pointer"
              onClick={handleIconClick}
            />
            <ArrowUpOnSquareStackIcon
              className="w-8 h-8 p-1 border border-green-500 text-green-500 rounded-full cursor-pointer"
              onClick={handleCloseAlert}
            />
            <XMarkIcon
              onClick={handleCloseAlert}
              className="w-8 h-8 p-1 border border-gray-500 text-gray-500 rounded-full cursor-pointer"
            />
          </AlertDialogTitle>
          <Input
            multiple
            id="picture"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </AlertDialogHeader>
        <AlertDialogDescription className="mt-2 space-y-2">
          {selectedFileUploadFile.length > 0 ? (
            selectedFileUploadFile.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border p-2 rounded-md shadow-sm"
              >
                <Image
                  src={file.url}
                  width={200}
                  height={200}
                  alt={`Selected file ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <span className="text-gray-700 text-sm">
                  {formatFileSize(file.size)}
                </span>
                <button
                  onClick={() => handleRemoveSingleFile(index)}
                  className="ml-auto bg-red-500 text-white p-1 px-2 rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No images selected</span>
          )}
        </AlertDialogDescription>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
