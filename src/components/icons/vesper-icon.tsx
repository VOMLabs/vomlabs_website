import Image from 'next/image';

export function IconVesper({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/svg/logo.svg"
      alt="VOMLabs Logo"
      width={32}
      height={32}
      className={className}
    />
  );
}
