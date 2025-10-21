import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] 
                  backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,.04)] 
                  transition-colors ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg,rgba(124,77,255,.12),rgba(0,246,255,.06))",
      }}
    >
      {children}
    </div>
  );
}
