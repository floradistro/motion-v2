import { cn } from "@/lib/design-system";

interface BadgeProps {
  children?: React.ReactNode;
  accent?: string;
  variant?: "verified" | "product" | "default";
  className?: string;
}

export default function Badge({
  children,
  accent = "#22d3ee",
  variant = "default",
  className,
}: BadgeProps) {
  if (variant === "verified") {
    return (
      <span className={cn("flex items-center gap-1 text-[10px] text-muted/25 tracking-wider uppercase", className)}>
        <svg
          className="w-3 h-3"
          style={{ color: accent }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
        Verified
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border",
        className,
      )}
      style={{
        borderColor: `${accent}18`,
        color: `${accent}70`,
        backgroundColor: `${accent}06`,
      }}
    >
      {children}
    </span>
  );
}
