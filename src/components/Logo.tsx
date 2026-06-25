type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/**
 * Northwise mark — an upward double-stroke motif (north / rising direction).
 */
export function Logo({ className = "h-8 w-8", withWordmark = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        aria-hidden="true"
        role="img"
      >
        <path
          d="M4 34 L16 14 L24 26 L32 8 L44 30"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-500"
        />
      </svg>
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          northwise
        </span>
      )}
    </span>
  );
}
