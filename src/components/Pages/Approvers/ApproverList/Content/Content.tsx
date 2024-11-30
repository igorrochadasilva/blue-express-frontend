import { Approver } from '@/types/approvers/approvers';
import { TrashIcon } from '@heroicons/react/24/solid';

interface ContentProps {
  approversData: Approver[];
  handleTrashClick: (id: number) => void;
}

const Content = ({ approversData, handleTrashClick }: ContentProps) => {
  return (
    <tbody>
      {approversData.map((approver: Approver) => (
        <tr
          key={approver.id}
          className="text-center border text-sm whitespace-nowrap"
        >
          <td className="w-1/6 py-3 pl-3">{approver.title}</td>
          <td className="w-1/6 py-3">{approver.competence}</td>
          <td className="w-1/6 py-3">{approver.approverName}</td>
          <td className="w-1/6 py-3">{approver.level}</td>
          <td className="w-1/6 py-3">{approver.company}</td>
          <td className="w-1/6 py-3">
            <TrashIcon
              onClick={() => handleTrashClick(approver.id)}
              className="text-center w-4 cursor-pointer text-red-500 m-auto"
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Content;
