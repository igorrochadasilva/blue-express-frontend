import Image from 'next/image';

export function LogoImg() {
  return (
    <div className="flex justify-center mb-14">
      <Image
        src="/eaton_logo.svg"
        width={150}
        height={150}
        alt="Logo"
        priority={true}
      />
    </div>
  );
}
