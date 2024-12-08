import { toast } from 'react-toastify';

interface NotifyMessageProps {
  message?: string | string[];
  statusCode?: number;
}

export const notifyMessage = ({
  message = 'An error occurred. Please try again later.',
  statusCode = 500,
}: NotifyMessageProps): void => {
  const isSuccess = [200, 201].includes(statusCode);
  const toastType = isSuccess ? toast.success : toast.error;

  if (Array.isArray(message)) {
    message.forEach((msg) => {
      toastType(msg, { position: 'top-right' });
    });
  } else {
    toastType(message, { position: 'top-right' });
  }
};
