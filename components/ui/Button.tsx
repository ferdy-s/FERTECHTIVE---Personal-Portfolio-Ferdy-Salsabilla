import { ButtonHTMLAttributes } from "react";

export default function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 
                  border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15
                  text-sm transition ${className}`}
    />
  );
}
