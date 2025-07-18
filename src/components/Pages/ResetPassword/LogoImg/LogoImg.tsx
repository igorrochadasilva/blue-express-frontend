import Image from 'next/image';

export function LogoImg() {
  return (
    <div className="flex justify-center">
      <Image
        src="/eaton_logo.svg"
        width={100}
        height={100}
        alt="Logo"
        className="rounded-full"
        priority={true}
      />
    </div>
  );
}
