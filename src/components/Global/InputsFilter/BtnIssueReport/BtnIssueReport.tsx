interface IBtnIssueReport {
  text?: string;
}

const BtnIssueReport = ({ text = 'Issue Report' }: IBtnIssueReport) => {
  const handleSelectChange = (event: any) => {};

  return (
    <div className="flex justify-end flex-1">
      <button className="bg-be_first_color w-36 h-10 text-white rounded">
        {text}
      </button>
    </div>
  );
};

export default BtnIssueReport;
