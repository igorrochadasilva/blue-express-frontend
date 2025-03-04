import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Image
        src="/eaton_logo.svg"
        width={141}
        height={40}
        alt="Logo"
        priority
      />
      <span className="text-be_first_colors text-be_first_color">
        Blue Express
      </span>
    </div>
  );
};
