import { useApproverModal } from '@/hooks/useApproverModal';

export const Justify = () => {
  const { setJustify } = useApproverModal();

  return (
    <div className="mb-3">
      <textarea
        onChange={(e) => setJustify(e.target.value)}
        placeholder="provide a justification"
        className="border-[1px] rounded w-full h-[100px] p-2"
        name="justify"
        id=""
      ></textarea>
    </div>
  );
};
