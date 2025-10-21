// app/layout.tsx
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
