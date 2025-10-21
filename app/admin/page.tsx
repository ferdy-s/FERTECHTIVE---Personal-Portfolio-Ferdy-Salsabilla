import { prisma } from "@/lib/prisma";

export default async function AdminHome() {
  const [projects, posts, cvs] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.cvRequest.count(),
  ]);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Stat label="Projects" value={projects} />
      <Stat label="Posts" value={posts} />
      <Stat label="CV Requests" value={cvs} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
      <div className="text-sm opacity-80">{label}</div>
      <div className="text-3xl font-extrabold">{value}</div>
    </div>
  );
}
