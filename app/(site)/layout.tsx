// app/(site)/layout.tsx
import ExtremeNav from "@/components/nav/ExtremeNav";
import SiteFooter from "@/components/SiteFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ExtremeNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
