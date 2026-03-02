interface AvatarProps {
  name: string;
  accent?: string;
  size?: "sm" | "md";
}

export default function Avatar({ name, accent = "#22d3ee", size = "md" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const sizeClass = size === "sm" ? "w-8 h-8 text-[11px]" : "w-10 h-10 text-[13px]";

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-semibold tracking-wide flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
        color: accent,
        border: `1px solid ${accent}25`,
      }}
    >
      {initials}
    </div>
  );
}
