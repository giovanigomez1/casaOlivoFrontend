
export default function Logo({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20C9 15 14 10 20 4" />
      <path d="M9 15c-2.5-.5-4-2-4.5-4.5 2.5.5 4 2 4.5 4.5z" />
      <path d="M13 11c.5-2.5 2-4 4.5-4.5-.5 2.5-2 4-4.5 4.5z" />
      <path d="M12.5 12c-2.5-.5-4-2-4.5-4.5 2.5.5 4 2 4.5 4.5z" />
      <circle cx="17" cy="13" r="1.8" />
    </svg>
  )
}