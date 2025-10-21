"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/admin", label: "Overview", icon: "🏠" },
  { href: "/admin/projects", label: "Projects", icon: "📦" },
  { href: "/admin/posts", label: "Posts", icon: "📰" },
  { href: "/admin/cv", label: "CV Requests", icon: "📩" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    document.addEventListener("open-admin-sidebar", openHandler as any);
    return () =>
      document.removeEventListener("open-admin-sidebar", openHandler as any);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-72 bg-gradient-to-b from-zinc-950 to-black border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
          <div className="text-base font-semibold tracking-tight">
            <span className="text-violet-400">Fertechtive</span> Admin
          </div>
          <button
            className="lg:hidden rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.3L2.88 18.3l6.3-6.29-6.3-6.3L4.3 4.29l6.3 6.3 6.3-6.3z"
              />
            </svg>
          </button>
        </div>

        <div className="px-3 py-4 space-y-2">
          {NAV.map((i) => {
            const active =
              pathname === i.href || pathname.startsWith(i.href + "/");
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm border ${active ? "border-violet-500/40 bg-violet-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
              >
                <span>{i.icon}</span>
                <span>{i.label}</span>
                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px] shadow-violet-500/60" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-white/10 text-xs text-zinc-400">
          Data encrypted • Role-based access
        </div>
      </aside>
    </>
  );
}
