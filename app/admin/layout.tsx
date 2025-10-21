import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ThemeToggle from "@/components/admin/ThemeToggle";
import KPICards from "@/components/admin/KPICards";
import MobileMenuButton from "@/components/admin/MobileMenuButton";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Admin • Fertechtive" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/login?callbackUrl=/admin`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0e] to-[#0f0f12] text-zinc-200 antialiased">
      <div className="flex">
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* MAIN AREA */}
        <div className="flex-1 lg:ml-72 flex flex-col">
          {/* HEADER */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="mx-auto max-w-screen-2xl px-5 py-4 flex items-center gap-4">
              <MobileMenuButton />

              <div className="flex-1">
                <h1 className="text-[1.15rem] font-medium tracking-wide text-zinc-100">
                  Admin Dashboard
                </h1>
                <p className="text-[0.75rem] text-zinc-500 mt-0.5">
                  Hi-tech environment • secure • realtime ready
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.08]"
                >
                  <ArrowLeft size={15} /> Kembali ke site
                </Link>
                <Link
                  href="/admin/posts/new"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-sm text-violet-300 transition hover:bg-violet-500/20"
                >
                  <Plus size={16} /> New
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 mx-auto max-w-screen-2xl w-full px-5 py-8 space-y-8">
            <section>
              <KPICards />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5 sm:p-6 shadow-[0_0_25px_-10px_rgba(255,255,255,0.15)]">
              {children}
            </section>

            <footer className="py-8 text-center text-[0.75rem] text-zinc-500 border-t border-white/5">
              © {new Date().getFullYear()}{" "}
              <span className="text-zinc-400">Fertechtive Admin</span> — built
              for clarity & performance
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
