import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Loading = () => {
  return (
    <div className="absolute flex justify-center text-center items-center w-full h-full bg-white gap-4">
      <ArrowPathIcon className="h-10 w-10 animate-spin text-be_first_color" />
      <h1 className="text-3xl text-be_first_color">Processing...</h1>
    </div>
  );
};

export default Loading;
