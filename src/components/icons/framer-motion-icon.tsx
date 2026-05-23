export function IconFramerMotion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M18 6l-6 6 6 6" />
      <path d="M6 6l6 6-6 6" />
    </svg>
  );
}
