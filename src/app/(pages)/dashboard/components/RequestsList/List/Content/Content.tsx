import Link from 'next/link';

interface IContentProps {
  order: number;
  type: string;
  statusColor: string;
  status: string;
  requestDate: string;
  requester: string;
  approver: string;
  sla: number;
  requestId: number;
  link: string;
}

const Content = ({
  order,
  type,
  statusColor,
  status,
  requestDate,
  requester,
  approver,
  sla,
  requestId,
  link,
}: IContentProps) => {
  return (
    <tr key={order} className="text-center">
      <td className="w-1/7 py-3 w-48">{type}</td>
      <td style={{ color: statusColor }} className="w-1/7 py-3">
        {status}
      </td>
      <td className="w-1/7 py-3">{requestDate}</td>
      <td className="w-1/7 py-3">{requester}</td>
      <td className="w-1/7 py-3">{approver}</td>
      <td className="w-1/7 py-3">{sla}</td>
      <td className="w-1/7 py-3">{requestId}</td>
      <td className="w-1/7 py-3">
        <Link
          href={link}
          className="rounded border-[1px] py-1 px-2 border-[#F3AF25] text-[#F3AF25]"
        >
          Evaluate
        </Link>
      </td>
    </tr>
  );
};

export default Content;
