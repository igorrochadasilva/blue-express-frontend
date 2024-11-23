interface IListHeadProps {}

const ListHead = () => {
  return (
    <thead className="h-16">
      <tr>
        <th className="w-1/6">Request Type</th>
        <th className="w-1/6">Approver</th>
        <th className="w-1/6">Level</th>
        <th className="w-1/6">Competence</th>
        <th className="w-1/6">Company</th>
        <th className="w-1/6">Office</th>
      </tr>
    </thead>
  );
};

export default ListHead;
