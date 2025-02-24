'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useAlertUploadFile } from '@/hooks/useAlertUploadFile';
import {
  ArrowUpOnSquareStackIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export const AlertUploadFile = () => {
  const { isAlertDialogOpen, setIsAlertDialogOpen } = useAlertUploadFile();
  const [selectedFile, setSelectedFile] = useState<
    { url: string; size: number }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileReaders: Promise<{ url: string; size: number }>[] = Array.from(
        files
      ).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () =>
            resolve({ url: reader.result as string, size: file.size });
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then((fileData) => {
        setSelectedFile((prev) => [...prev, ...fileData]);
      });
    }
  };

  const handleRemoveSingleFile = (indexToRemove: number) => {
    setSelectedFile((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleIconClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const formatFileSize = (size: number) => {
    return size < 1024
      ? `${size} B`
      : size < 1024 * 1024
        ? `${(size / 1024).toFixed(2)} KB`
        : `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleCloseAlert = () => setIsAlertDialogOpen(false);

  return (
    <AlertDialog
      open={isAlertDialogOpen}
      defaultOpen={isAlertDialogOpen}
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
          {selectedFile.length > 0 ? (
            selectedFile.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border p-2 rounded-md shadow-sm"
              >
                <Image
                  src={file?.url}
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
