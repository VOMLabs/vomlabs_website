export function IconSerde({ className }: { className?: string }) {
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
      <path d="M21 8H3" />
      <path d="M21 16H3" />
      <path d="M12 4v16" />
      <path d="M8 6l4-2 4 2" />
    </svg>
  );
}
