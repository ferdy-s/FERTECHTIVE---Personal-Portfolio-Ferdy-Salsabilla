import { prisma } from "@/lib/prisma";
import { createCvRequest } from "@/app/admin/cv/actions";
import { toggleVerify, approve, remove } from "./actions";

export default async function AdminCvPage() {
  const rows = await prisma.cvRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const fmt = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="min-w-full text-sm">
        <thead className="bg-white/5">
          <tr>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Nama</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-white/5">
              <td className="px-4 py-3">{r.email}</td>
              <td className="px-4 py-3">{r.fullName}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    r.verified
                      ? "inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-200"
                      : "inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/15 px-2 py-0.5 text-xs text-amber-200"
                  }
                >
                  {r.verified ? "Verified" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3">{fmt.format(new Date(r.createdAt))}</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  {/* gunakan bind agar tidak bikin fungsi inline saat render */}
                  <form
                    action={toggleVerify.bind(null, r.id, !r.verified)}
                    className="inline"
                  >
                    <button
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                      title={r.verified ? "Set Pending" : "Set Verified"}
                    >
                      {r.verified ? "Unverify" : "Verify"}
                    </button>
                  </form>

                  <form action={approve.bind(null, r.id)} className="inline">
                    <button className="rounded-lg border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 hover:bg-emerald-500/30">
                      Approve
                    </button>
                  </form>

                  <form action={remove.bind(null, r.id)} className="inline">
                    <button className="rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-1.5 hover:bg-red-500/30">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-zinc-400">
                Tidak ada request.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
