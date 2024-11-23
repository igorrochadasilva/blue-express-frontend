import { toast } from 'react-toastify';

export const notifyError = (message: string | null) => {
  toast.error(message, {
    position: 'top-right',
  });
};

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
  });
};

export const notifyDefaultError = () => {
  toast.error('An error occurred. Please try again later.', {
    position: 'top-right',
  });
};
