import { useState } from 'react';

const CloseExpiration = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => setIsChecked(event.target.checked);

  return (
    <div className="flex flex-col w-[260px] gap-2 text-be_second_color">
      <label htmlFor="Status" className="font-semibold">
        Close to expiration
      </label>
      <input
        className="border-2 border-[#e3e3e3] px-4 py-2 rounded-lg w-[20px] h-[35px]"
        type="checkbox"
        id="myCheckbox"
        name="myCheckbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default CloseExpiration;
