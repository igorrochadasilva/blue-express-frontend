import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Content } from '../Content/Content';

interface ErrorProps {
  message: string;
}
export const ErrorComponent = ({ message }: ErrorProps) => {
  return (
    <Content>
      <div className="flex items-center gap-2">
        <ExclamationCircleIcon className="w-8 text-red-600" />
        <h2>{message}</h2>
      </div>
    </Content>
  );
};
