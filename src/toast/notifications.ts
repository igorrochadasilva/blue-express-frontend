import { toast } from 'react-toastify';

interface INotifyMessage {
  message?: string;
  statusCode?: number;
}
export const notifyMessage = ({
  message = 'An error occurred. Please try again later.',
  statusCode = 500,
}: INotifyMessage): void => {
  const isSuccess = [200, 201].includes(statusCode);
  const toastType = isSuccess ? toast.success : toast.error;

  toastType(message, { position: 'top-right' });
};
