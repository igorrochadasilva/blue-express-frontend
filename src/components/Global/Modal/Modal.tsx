import { XMarkIcon } from '@heroicons/react/24/solid';
import { MouseEventHandler } from 'react';

interface IModal {
  showModal?: boolean;
  text: string;
  setCloseModal: MouseEventHandler<SVGSVGElement | HTMLButtonElement>;
  action?: () => void | any;
}

const Modal = ({ text, showModal = false, setCloseModal, action }: IModal) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className="text-center absolute top-0 w-full h-full left-0 flex justify-center items-center">
      <div className="w-full h-full left-0 top-0 bg-black fixed opacity-80 z-10"></div>
      <div className="w-96 h-40 bg-white fixed z-20 rounded">
        <div className="w-full flex justify-end">
          <XMarkIcon
            onClick={setCloseModal}
            className="h-6 w-6 text-slate-800 text-end cursor-pointer"
          />
        </div>
        <div className="mt-4">
          <p className="text-base">{text}</p>
          <div className="flex justify-evenly w-full mt-5 text-white font-semibold">
            <button
              onClick={setCloseModal}
              className="bg-slate-500 w-32 py-2 rounded hover:bg-slate-400"
            >
              Close
            </button>
            <button
              onClick={action}
              className="bg-be_first_color w-32 py-2 rounded hover:bg-blue-400"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
