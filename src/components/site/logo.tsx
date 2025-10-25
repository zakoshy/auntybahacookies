import Link from 'next/link';

const WaveIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-primary"
    >
      <path d="M2 12c.9.9 1.8 1.6 2.8 2.1s2.1.9 3.2.9 2.2-.4 3.2-.9 1.8-1.2 2.8-2.1" />
      <path d="M12 12c.9.9 1.8 1.6 2.8 2.1s2.1.9 3.2.9 2.2-.4 3.2-.9 1.8-1.2 2.8-2.1" />
      <path d="M2 6c.9.9 1.8 1.6 2.8 2.1s2.1.9 3.2.9 2.2-.4 3.2-.9 1.8-1.2 2.8-2.1" />
       <path d="M12 6c.9.9 1.8 1.6 2.8 2.1s2.1.9 3.2.9 2.2-.4 3.2-.9 1.8-1.2 2.8-2.1" />
    </svg>
  );

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <WaveIcon />
      <span className="text-xl font-bold font-headline tracking-tight">
        OceanBite
      </span>
    </Link>
  );
}
