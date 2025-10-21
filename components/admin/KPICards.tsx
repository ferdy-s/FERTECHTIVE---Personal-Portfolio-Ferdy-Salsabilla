import { prisma } from "@/lib/prisma";

async function getViews7d(): Promise<number> {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const count = await (prisma as any).viewEvent?.count?.({
      where: { createdAt: { gte: since } },
    });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function KPICards() {
  const [projects, posts, cv, views7d] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.cvRequest.count(),
    getViews7d(),
  ]);

  const cards = [
    {
      label: "Projects",
      value: projects,
      hint: "total items",
      accent: "from-cyan-500/30 to-cyan-400/20",
    },
    {
      label: "Posts",
      value: posts,
      hint: "total articles",
      accent: "from-emerald-500/30 to-emerald-400/20",
    },
    {
      label: "CV Requests",
      value: cv,
      hint: "inbox items",
      accent: "from-amber-500/30 to-amber-400/20",
    },
    {
      label: "Views (7d)",
      value: views7d,
      hint: "portfolio & blog",
      accent: "from-violet-500/30 to-violet-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-2xl border border-white/10 bg-gradient-to-br ${c.accent} p-4 sm:p-5`}
        >
          <div className="text-sm text-zinc-400">{c.label}</div>
          <div className="mt-2 text-3xl font-bold tracking-tight">
            {c.value}
          </div>
          <div className="mt-1 text-xs text-zinc-400">{c.hint}</div>
        </div>
      ))}
    </div>
  );
}
