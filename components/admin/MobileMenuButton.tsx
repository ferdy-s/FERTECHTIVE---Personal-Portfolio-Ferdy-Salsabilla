"use client";

export default function MobileMenuButton() {
  return (
    <button
      className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
      onClick={() =>
        document.dispatchEvent(new CustomEvent("open-admin-sidebar"))
      }
      aria-label="Open menu"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-80">
        <path fill="currentColor" d="M3 7h18v2H3zm0 4h18v2H3zm0 4h18v2H3z" />
      </svg>
    </button>
  );
}
