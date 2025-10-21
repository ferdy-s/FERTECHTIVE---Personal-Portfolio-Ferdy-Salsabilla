export default function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "success" | "warn" | "default";
}) {
  const map = {
    success: "bg-emerald-500/20 text-emerald-300 border-emerald-400/20",
    warn: "bg-amber-500/20 text-amber-300 border-amber-400/20",
    default: "bg-white/10 text-white/80 border-white/10",
  } as const;
  return (
    <span className={`px-2 py-1 rounded-lg text-xs border ${map[tone]}`}>
      {children}
    </span>
  );
}
