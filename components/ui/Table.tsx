export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm leading-5">{children}</table>
    </div>
  );
}
export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="sticky top-0 z-10 backdrop-blur bg-black/30 text-white/70">
      {children}
    </thead>
  );
}
export function TR({
  children,
  hover = true,
}: {
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <tr
      className={`${hover ? "hover:bg-white/5" : ""} border-t border-white/10`}
    >
      {children}
    </tr>
  );
}
export const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left font-semibold px-3 py-2">{children}</th>
);
export const TD = ({
  children,
  mono = false,
}: {
  children: React.ReactNode;
  mono?: boolean;
}) => (
  <td className={`px-3 py-2 ${mono ? "font-mono text-xs" : ""}`}>{children}</td>
);
