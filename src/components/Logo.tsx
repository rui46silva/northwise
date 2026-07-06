import Image from "next/image";

type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/**
 * Northwise mark — the brand "M" symbol, optionally with the wordmark.
 */
export function Logo({ className = "h-8 w-auto", withWordmark = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt="Northwise"
        width={99}
        height={80}
        priority
        className={`w-auto object-contain ${className}`}
      />
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          northwise
        </span>
      )}
    </span>
  );
}
